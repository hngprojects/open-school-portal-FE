import { NextResponse } from "next/server"
import { cookies as getCookies } from "next/headers"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

/** Ensure backend URL exists */
const ensureApiBaseUrl = (): string => {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.")
  }
  return API_BASE_URL
}

/** Build backend URL */
const buildBackendUrl = (pathname: string): string => {
  const base = ensureApiBaseUrl().replace(/\/+$/, "")
  const cleanPath = pathname.replace(/^\/+/, "")
  return `${base}/${cleanPath}`
}

/** Collect request + cookie headers */
const collectForwardHeaders = async (req: Request): Promise<Headers> => {
  const headers = new Headers()

  const contentType = req.headers.get("content-type")
  if (contentType) headers.set("content-type", contentType)

  const cookie = req.headers.get("cookie")
  if (cookie) headers.set("cookie", cookie)

  // Add Bearer Authorization from cookies
  const cookies = await getCookies()
  const accessToken = cookies.get("access_token")?.value
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`)
  }

  return headers
}

/** Copy incoming set-cookie headers to NextResponse */
const appendSetCookies = (source: Response, target: NextResponse): void => {
  const getSetCookie = (source.headers as unknown as { getSetCookie?: () => string[] })
    .getSetCookie

  const cookies = getSetCookie?.call(source.headers)

  if (cookies?.length) {
    cookies.forEach((cookie) => target.headers.append("set-cookie", cookie))
    return
  }

  const singleCookie = source.headers.get("set-cookie")
  if (singleCookie) target.headers.append("set-cookie", singleCookie)
}

/** Calls backend */
const forwardRequestToBackend = async (
  req: Request,
  backendUrl: string,
  headers: Headers
) => {
  const bodyText = await req.text()

  return fetch(backendUrl, {
    method: req.method,
    headers,
    body: bodyText.length > 0 ? bodyText : undefined,
    cache: "no-store",
    redirect: "manual",
  })
}

/** Attempts refresh token */
const tryRefresh = async (req: Request): Promise<Response | null> => {
  const refreshUrl = buildBackendUrl("/auth/refresh")

  const cookies = await getCookies()
  const refreshToken = cookies.get("refresh_token")?.value

  if (!refreshToken) return null

  const headers = new Headers()
  headers.set("cookie", `refresh_token=${refreshToken}`)

  const refreshRes = await fetch(refreshUrl, {
    method: "POST",
    headers,
    cache: "no-store",
  })

  if (!refreshRes.ok) return null

  return refreshRes
}

/** MASTER PROXY with auto-refresh + retry */
export const proxyAuthRequest = async (
  req: Request,
  pathname: string
): Promise<NextResponse> => {
  try {
    const backendUrl = buildBackendUrl(pathname)
    const headers = await collectForwardHeaders(req)

    /** 1. FIRST CALL */
    let backendResponse = await forwardRequestToBackend(req, backendUrl, headers)

    /** 2. If unauthorized → try refresh */
    if (backendResponse.status === 401) {
      const refreshResponse = await tryRefresh(req)

      if (refreshResponse) {
        // Apply refreshed cookies
        const nextRefreshCookies = new NextResponse(null)
        appendSetCookies(refreshResponse, nextRefreshCookies)

        // Extract new access token and retry original request
        const newCookies = await getCookies()
        const newAccessToken = newCookies.get("access_token")?.value

        if (newAccessToken) {
          headers.set("Authorization", `Bearer ${newAccessToken}`)
        }

        // retry request
        backendResponse = await forwardRequestToBackend(req, backendUrl, headers)
      }
    }

    /** 3. Prepare final response */
    const responseBody = await backendResponse.text()
    const nextResponse = new NextResponse(responseBody.length > 0 ? responseBody : null, {
      status: backendResponse.status,
      headers: {
        "content-type":
          backendResponse.headers.get("content-type") ??
          "application/json; charset=utf-8",
      },
    })

    // Apply cookies (from login or refresh)
    appendSetCookies(backendResponse, nextResponse)

    return nextResponse
  } catch (error) {
    console.error("Auth proxy error:", error)
    return NextResponse.json(
      {
        message: "Unable to reach authentication service. Please try again later.",
      },
      { status: 502 }
    )
  }
}

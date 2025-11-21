import { NextResponse } from "next/server"
import { cookies as getCookies } from "next/headers"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const ensureApiBaseUrl = (): string => {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.")
  }

  return API_BASE_URL
}

const buildBackendUrl = (pathname: string): string => {
  const base = ensureApiBaseUrl().replace(/\/+$/, "")
  const cleanPath = pathname.replace(/^\/+/, "")
  return `${base}/${cleanPath}`
}

const collectForwardHeaders = async (req: Request): Promise<Headers> => {
  const headers = new Headers()

  const contentType = req.headers.get("content-type")
  if (contentType) headers.set("content-type", contentType)

  const cookie = req.headers.get("cookie")
  if (cookie) headers.set("cookie", cookie)

  // Add Bearer Authorization
  const cookies = await getCookies()
  const accessToken = cookies.get("access_token")?.value
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`)
  }

  return headers
}

const appendSetCookies = (source: Response, target: NextResponse): void => {
  const getSetCookie = (
    source.headers as unknown as {
      getSetCookie?: () => string[]
    }
  ).getSetCookie

  const cookies = getSetCookie?.call(source.headers)

  if (cookies?.length) {
    cookies.forEach((cookie) => target.headers.append("set-cookie", cookie))
    return
  }

  const singleCookie = source.headers.get("set-cookie")
  if (singleCookie) {
    target.headers.append("set-cookie", singleCookie)
  }
}

export const proxyAuthRequest = async (
  req: Request,
  pathname: string
): Promise<NextResponse> => {
  try {
    const backendUrl = buildBackendUrl(pathname)
    const bodyText = await req.text()
    const headers = await collectForwardHeaders(req)

    const backendResponse = await fetch(backendUrl, {
      method: req.method,
      headers,
      body: bodyText.length > 0 ? bodyText : undefined,
      cache: "no-store",
      redirect: "manual",
    })

    const responseBody = await backendResponse.text()
    const nextResponse = new NextResponse(responseBody.length > 0 ? responseBody : null, {
      status: backendResponse.status,
      headers: {
        "content-type":
          backendResponse.headers.get("content-type") ??
          "application/json; charset=utf-8",
      },
    })

    appendSetCookies(backendResponse, nextResponse)

    return nextResponse
  } catch (error) {
    console.error("Auth proxy error:", error)
    return NextResponse.json(
      {
        message: "Unable to reach authentication service. Please try again later.",
      },
      {
        status: 502,
      }
    )
  }
}

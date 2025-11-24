import { NextResponse } from "next/server"
import { cookies as getCookies } from "next/headers"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

/* Helpers */
const ensureApiBaseUrl = () => {
  if (!API_BASE_URL) throw new Error("API base url missing")
  return API_BASE_URL.replace(/\/+$/, "")
}

const buildBackendUrl = (path: string) =>
  `${ensureApiBaseUrl()}/${path.replace(/^\/+/, "")}`

const extractAccessTokenFromSetCookie = (
  setCookieHeader: string | null
): string | null => {
  if (!setCookieHeader) return null

  const match = setCookieHeader.match(/access_token=([^;]+)/)
  return match ? match[1] : null
}

const forwardRequest = async (
  backendUrl: string,
  method: string,
  body: string | undefined,
  headers: Headers
): Promise<Response> => {
  return fetch(backendUrl, {
    method,
    headers,
    body,
    cache: "no-store",
    redirect: "manual",
  })
}

/* REFRESH ATTEMPT */
const attemptRefresh = async (): Promise<{
  ok: boolean
  newAccessToken: string | null
  refreshResponse: Response | null
}> => {
  const refreshUrl = buildBackendUrl("auth/refresh")
  const cookieStore = await getCookies()
  const token = cookieStore.get("refresh_token")?.value

  if (!token) return { ok: false, newAccessToken: null, refreshResponse: null }

  const res = await fetch(refreshUrl, {
    method: "POST",
    headers: { cookie: `refresh_token=${token}` },
    cache: "no-store",
  })

  if (!res.ok) return { ok: false, newAccessToken: null, refreshResponse: res }

  const setCookie = res.headers.get("set-cookie")
  const newAccessToken = extractAccessTokenFromSetCookie(setCookie)

  return {
    ok: true,
    newAccessToken,
    refreshResponse: res,
  }
}

/* MAIN PROXY */
export const proxyAuthRequest = async (req: Request, pathname: string) => {
  try {
    const backendUrl = buildBackendUrl(pathname)

    // Read body ONCE
    const rawBody = await req.text()

    // Prepare headers
    const headers = new Headers()
    const cookie = req.headers.get("cookie")
    if (cookie) headers.set("cookie", cookie)
    const contentType = req.headers.get("content-type")
    if (contentType) headers.set("content-type", contentType)

    const cookieStore = await getCookies()
    const access = cookieStore.get("access_token")?.value
    if (access) headers.set("Authorization", `Bearer ${access}`)

    /* FIRST CALL */
    let backendRes = await forwardRequest(
      backendUrl,
      req.method,
      rawBody.length ? rawBody : undefined,
      headers
    )

    /* If unauthorized — try refresh */
    if (backendRes.status === 401) {
      const refresh = await attemptRefresh()

      if (refresh.ok && refresh.newAccessToken) {
        headers.set("Authorization", `Bearer ${refresh.newAccessToken}`)

        // retry call
        backendRes = await forwardRequest(
          backendUrl,
          req.method,
          rawBody.length ? rawBody : undefined,
          headers
        )
      }
    }

    /* Return response back to browser */
    const responseText = await backendRes.text()
    const nextRes = new NextResponse(responseText || null, {
      status: backendRes.status,
      headers: {
        "content-type":
          backendRes.headers.get("content-type") ?? "application/json; charset=utf-8",
      },
    })

    // propagate cookies from backend to client
    const setCookie = backendRes.headers.get("set-cookie")
    if (setCookie) nextRes.headers.append("set-cookie", setCookie)

    return nextRes
  } catch (err) {
    console.error("proxy error:", err)
    return NextResponse.json(
      { message: "Proxy error. Please try again later." },
      { status: 502 }
    )
  }
}

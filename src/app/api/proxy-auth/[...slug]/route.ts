import { NextResponse } from "next/server"
import { proxyAuthRequest } from "../../auth/_proxy"

async function methodHandler(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const resolvedParams = await params
  const slugPath = "/" + resolvedParams.slug.join("/")
  const reqUrl = new URL(req.url)
  const pathWithQuery = slugPath + reqUrl.search

  const backendRes = await proxyAuthRequest(req, pathWithQuery)

  const body = await backendRes.text() // read once safely

  const response = new NextResponse(body, {
    status: backendRes.status,
    headers: backendRes.headers, // preserves content-type, etc.
  })

  return response
}

export { methodHandler as GET }
export { methodHandler as POST }
export { methodHandler as PUT }
export { methodHandler as DELETE }
export { methodHandler as PATCH }

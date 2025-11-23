import { proxyAuthRequest } from "../../auth/_proxy"

// this file is [...slug]/route.ts and not just [slug]/route.ts to capture all sub-paths
// note that ths should also handle forwards different enpoint optiosn

export async function POST(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const path = `/${slug.join("/")}`

  // Extract query parameters from the request URL
  const url = new URL(req.url)
  const queryString = url.search

  // Append query string to path if it exists
  const pathWithQuery = queryString ? `${path}${queryString}` : path

  return proxyAuthRequest(req, pathWithQuery)
}

export async function GET(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const path = `/${slug.join("/")}`

  // Extract query parameters from the request URL
  const url = new URL(req.url)
  const queryString = url.search

  // Append query string to path if it exists
  const pathWithQuery = queryString ? `${path}${queryString}` : path

  return proxyAuthRequest(req, pathWithQuery)
}

export async function PUT(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const path = `/${slug.join("/")}`

  // Extract query parameters from the request URL
  const url = new URL(req.url)
  const queryString = url.search

  // Append query string to path if it exists
  const pathWithQuery = queryString ? `${path}${queryString}` : path

  return proxyAuthRequest(req, pathWithQuery)
}

export async function DELETE(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const path = `/${slug.join("/")}`

  // Extract query parameters from the request URL
  const url = new URL(req.url)
  const queryString = url.search

  // Append query string to path if it exists
  const pathWithQuery = queryString ? `${path}${queryString}` : path

  return proxyAuthRequest(req, pathWithQuery)
}

export async function PATCH(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const path = `/${slug.join("/")}`

  // Extract query parameters from the request URL
  const url = new URL(req.url)
  const queryString = url.search

  // Append query string to path if it exists
  const pathWithQuery = queryString ? `${path}${queryString}` : path

  return proxyAuthRequest(req, pathWithQuery)
}

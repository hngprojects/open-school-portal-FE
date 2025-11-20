import { proxyAuthRequest } from "../../auth/_proxy"

// this file is [...slug]/route.ts and not just [slug]/route.ts to capture all sub-paths
// note that ths should also handle forwards different enpoint optiosn

export async function POST(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const path = `/${slug.join("/")}`
  return proxyAuthRequest(req, path)
}

export async function GET(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const path = `/${slug.join("/")}`
  return proxyAuthRequest(req, path)
}

export async function PUT(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const path = `/${slug.join("/")}`
  return proxyAuthRequest(req, path)
}

export async function DELETE(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const path = `/${slug.join("/")}`
  return proxyAuthRequest(req, path)
}

export async function PATCH(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const path = `/${slug.join("/")}`
  return proxyAuthRequest(req, path)
}

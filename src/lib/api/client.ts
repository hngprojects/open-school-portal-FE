import { ApiError } from "./error"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const normalizeBackendPath = (path: string): string => {
  const trimmedBase = API_BASE_URL?.replace(/\/+$/, "") ?? ""
  const trimmedPath = path.replace(/^\/+/, "")

  return `${trimmedBase}/${trimmedPath}`
}

const isAbsoluteUrl = (path: string): boolean => /^https?:\/\//i.test(path)
const isInternalApiPath = (path: string): boolean => path.startsWith("/api/")

const resolveRequestUrl = (path: string): string => {
  if (isAbsoluteUrl(path) || isInternalApiPath(path)) {
    return path
  }

  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
  }

  return normalizeBackendPath(path)
}

const shouldAttachJsonHeader = (body: BodyInit | null | undefined): boolean => {
  if (!body) return false
  if (typeof body === "string") return true
  if (body instanceof Blob) return false
  if (body instanceof FormData) return false
  if (body instanceof URLSearchParams) return true
  return true
}

const parseJsonSafely = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get("content-type") ?? ""
  if (contentType.includes("application/json")) {
    return response.json()
  }

  const text = await response.text()
  if (!text) return null
  return { message: text }
}

export async function apiFetch<TResponse>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const headers = new Headers(init?.headers ?? undefined)

  if (!headers.has("Content-Type") && shouldAttachJsonHeader(init?.body ?? null)) {
    headers.set("Content-Type", "application/json")
  }

  try {
    const response = await fetch(resolveRequestUrl(path), {
      ...init,
      headers,
    })

    const data = await parseJsonSafely(response)

    if (!response.ok) {
      const message =
        (data &&
          typeof data === "object" &&
          "message" in data &&
          typeof data.message === "string" &&
          data.message) ||
        `Request failed with status ${response.status}`

      throw new ApiError(message, response.status, data)
    }

    return data as TResponse
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError(
      "Unable to reach the server. Please try again.",
      0,
      error instanceof Error ? { message: error.message } : error,
    )
  }
}


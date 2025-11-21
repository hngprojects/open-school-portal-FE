import axios, { AxiosError, AxiosRequestConfig } from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const isAbsoluteUrl = (path: string): boolean => /^https?:\/\//i.test(path)
const isInternalApiPath = (path: string): boolean => path.startsWith("/api/")
const normalizeBackendPath = (path: string): string => {
  const trimmedBase = API_BASE_URL?.replace(/\/+$/, "") ?? ""
  const trimmedPath = path.replace(/^\/+/, "")

  return `${trimmedBase}/${trimmedPath}`
}

const resolveRequestUrl = (path: string, proxy?: boolean): string => {
  if (isAbsoluteUrl(path) || isInternalApiPath(path)) {
    return path
  }

  if (proxy) {
    return `/api/proxy-auth${path.startsWith("/") ? path : "/" + path}`
  }

  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
  }

  return normalizeBackendPath(path)
}

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  validateStatus: () => true, // we manually check status codes
})

export async function apiFetch<TResponse>(
  path: string,
  config: AxiosRequestConfig = {},
  proxy?: boolean
): Promise<TResponse> {
  const headers = { ...(config.headers || {}) }

  // Only set JSON header for plain objects/strings
  const isJson =
    config.data && !(config.data instanceof FormData) && !(config.data instanceof Blob)

  if (!headers["Content-Type"] && isJson) {
    headers["Content-Type"] = "application/json"
  }

  const axiosInstance = proxy ? axios : api
  const url = resolveRequestUrl(path, proxy)

  try {
    const res = await axiosInstance.request({
      url,
      ...config,
      headers,
    })

    // Error handling for status codes
    if (res.status === 403) {
      throw new Error("Forbidden — you don't have permission.")
    }

    if (res.status === 404) {
      throw new Error("Resource not found.")
    }

    if (res.status >= 400) {
      const msg =
        (typeof res.data === "object" && res.data?.message) ||
        res.statusText ||
        "An unexpected error occurred."

      throw new Error(msg)
    }

    return res.data as TResponse
  } catch (err) {
    if (err instanceof AxiosError) {
      // Network or backend errors
      const message =
        err.response?.data?.message || err.message || "Unable to reach the server."

      throw new Error(message)
    }

    // Unknown / unexpected
    throw new Error(err instanceof Error ? err.message : "Unexpected error occurred.")
  }
}

import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { getErrorMessage } from "../errors"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

type APIResponse<T> = {
  data: T
  message?: string
}

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

  const navigateTo = (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path
    }
  }

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

    // Check for error status codes (4xx, 5xx)
    // Note: 204 No Content is a success status for DELETE requests
    if (res.status >= 400) {
      const errorMessage =
        (typeof res.data === "object" &&
          res.data !== null &&
          ("message" in res.data
            ? String(res.data.message)
            : "error" in res.data
              ? String(res.data.error)
              : undefined)) ||
        res.statusText ||
        `Request failed with status ${res.status}`

      // Handle 401 unauthorized
      if (res.status === 401) {
        navigateTo("/login")
      }

      const friendlyMessage = getErrorMessage(new Error(errorMessage))
      throw new Error(friendlyMessage)
    }

    // Handle 204 No Content (common for DELETE requests)
    if (res.status === 204) {
      return undefined as TResponse
    }

    return res.data as TResponse
  } catch (err) {
    // Network or backend errors

    if (err instanceof AxiosError) {
      // if unauthed
      if (err.response?.status === 401) {
        navigateTo("/login")
      }
    }
    const errorMessage = getErrorMessage(err)
    throw new Error(errorMessage)
  }
}

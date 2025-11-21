// lib/api.ts
// EDITED THIS FILE

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function api(endpoint: string, options: RequestInit = {}) {
  // Check if BASE_URL is defined
  if (!BASE_URL) {
    throw new ApiError(
      "API Base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL in .env.local"
    )
  }

  const url = `${BASE_URL}${endpoint}`

  // Get token from localStorage or your auth provider
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    // Add timeout
    signal: options.signal || AbortSignal.timeout(30000), // 30 second timeout
  }

  try {
    const res = await fetch(url, config)

    // Handle different status codes
    if (res.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token")
        window.location.href = "/login"
      }
      throw new ApiError("Unauthorized. Please log in again.", 401)
    }

    if (res.status === 403) {
      throw new ApiError(
        "Forbidden. You don't have permission to access this resource.",
        403
      )
    }

    if (res.status === 404) {
      throw new ApiError("Resource not found.", 404)
    }

    if (res.status === 500) {
      throw new ApiError("Server error. Please try again later.", 500)
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new ApiError(
        errorData.message || `API Error: ${res.status} ${res.statusText}`,
        res.status,
        errorData
      )
    }

    // Handle 204 No Content
    if (res.status === 204) {
      return null
    }

    return res.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    // Network errors
    if (error instanceof TypeError) {
      throw new ApiError(
        "Network error. Please check your internet connection or the API endpoint configuration.",
        0
      )
    }

    // Timeout errors
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request timed out. The server took too long to respond.", 0)
    }

    // Unknown errors
    throw new ApiError(
      error instanceof Error ? error.message : "An unexpected error occurred",
      0
    )
  }
}

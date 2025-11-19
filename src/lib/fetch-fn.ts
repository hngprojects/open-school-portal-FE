import axios, { AxiosRequestConfig } from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // optional flag to include cookies in requests
  timeout: 15000,
})

export async function fetchFn<T>(
  endpoint: string,
  options?: RequestInit // optional parameter you can pass to fetch for all the configuration options fetch accepts
): Promise<T> {
  try {
    const response = await api({
      url: endpoint,
      method: options?.method || "GET",
      data: options?.body,
      headers: options?.headers,
    } as AxiosRequestConfig)

    return response.data as T
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const message =
          error.response?.data?.message ||
          error.response.data?.error ||
          error.message ||
          "Unknown error"
        throw new Error(message)
      } else if (error.request) {
        throw new Error("Network error: Could not reach the server.")
      }
    }

    throw new Error("An Unexpected error occurred, please try again later.")
  }
}

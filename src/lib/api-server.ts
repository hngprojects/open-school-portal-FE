import axios from "axios"

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Server-side request interceptor
apiServer.interceptors.request.use(
  async (config) => {
    // For server-side, you might get token from cookies or session
    // Example: const token = await getTokenFromCookies();
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const apiRequestServer = async (
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: unknown,
  config?: Record<string, unknown>
) => {
  try {
    const response = await apiServer({
      method,
      url,
      data,
      ...config,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message || "Request failed")
    }
    throw error
  }
}

export default apiServer

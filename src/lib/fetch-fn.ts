"use server"

import axios, { AxiosRequestConfig } from "axios"
import { createApiError } from "./errors"

export async function fetchFn<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

    const api = axios.create({
      baseURL,
      withCredentials: true,
      timeout: 15000,
    })

    const response = await api({
      url: endpoint,
      method: options?.method || "GET",
      data: options?.body,
      headers: options?.headers,
    } as AxiosRequestConfig)

    return response.data as T
  } catch (error) {
    throw createApiError(error, `fetchFn(${endpoint})`)
  }
}

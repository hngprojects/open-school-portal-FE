import { apiFetch } from "./client"
import type { AuthApiResponse, LoginPayload } from "@/types/auth"

const LOGIN_PATH = "/api/auth/login"
const REFRESH_PATH = "/api/auth/refresh"

export type LoginResponse = AuthApiResponse<Record<string, unknown>>
export type RefreshResponse = AuthApiResponse<Record<string, unknown>>

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  return apiFetch<LoginResponse>(LOGIN_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export const refresh = async (): Promise<RefreshResponse> => {
  return apiFetch<RefreshResponse>(REFRESH_PATH, {
    method: "POST",
  })
}


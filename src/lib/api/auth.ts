import { apiFetch } from "./client"
import type { AuthApiResponse, LoginPayload, SignUpPayload } from "@/types/auth"

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

export const signUp = async (payload: SignUpPayload): Promise<AuthApiResponse<null>> => {
  return apiFetch<AuthApiResponse<null>>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export const refresh = async (): Promise<RefreshResponse> => {
  return apiFetch<RefreshResponse>(REFRESH_PATH, {
    method: "POST",
  })
}

interface EmailLoginPayload {
  email: string
  password: string
}

export const loginUsingEmail = async (
  payload: EmailLoginPayload
): Promise<LoginResponse> => {
  return apiFetch<LoginResponse>(LOGIN_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export const sendForgotPasswordEmail = async (
  email: string
): Promise<AuthApiResponse<null>> => {
  return apiFetch<AuthApiResponse<null>>("/api/proxy-auth/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  })
}

interface ResetPasswordPayload {
  token: string
  newPassword: string
}

export const sendResetPasswordRequest = async (
  payload: ResetPasswordPayload
): Promise<AuthApiResponse<null>> => {
  return apiFetch<AuthApiResponse<null>>("/api/proxy-auth/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

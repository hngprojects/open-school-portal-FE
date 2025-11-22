import { apiFetch } from "./client"
import type {
  AuthApiResponse,
  LoginPayload,
  SignUpPayload,
  UserProfileResponse,
} from "@/types/auth"

const LOGIN_PATH = "/api/auth/login"
const ME_PATH = "/auth/me"
const REFRESH_PATH = "/api/auth/refresh"

export type LoginResponse = AuthApiResponse<Record<string, unknown>>
export type RefreshResponse = AuthApiResponse<Record<string, unknown>>

// ------------------------------
// Auth
// ------------------------------

export const login = (payload: LoginPayload): Promise<LoginResponse> => {
  return apiFetch<LoginResponse>(
    LOGIN_PATH,
    {
      method: "POST",
      data: payload,
    },
    true // use proxy
  )
}

export const loginUsingEmail = (payload: {
  email: string
  password: string
}): Promise<LoginResponse> => {
  return apiFetch<LoginResponse>(
    LOGIN_PATH,
    {
      method: "POST",
      data: payload,
    },
    true // use proxy
  )
}

export const signUp = (payload: SignUpPayload): Promise<AuthApiResponse<null>> => {
  return apiFetch<AuthApiResponse<null>>(
    "/api/auth/signup",
    {
      method: "POST",
      data: payload,
    },
    true // use proxy
  )
}

// Get current user profile
export const getProfile = async (): Promise<UserProfileResponse> => {
  const res = await apiFetch<AuthApiResponse<UserProfileResponse>>(
    ME_PATH,
    { method: "GET" },
    true
  )
  if (!res.data) throw new Error("Failed to fetch profile")
  return res.data
}

export const refresh = (): Promise<RefreshResponse> => {
  return apiFetch<RefreshResponse>(
    REFRESH_PATH,
    {
      method: "POST",
    },
    true // use proxy
  )
}

// ------------------------------
// Forgot Password
// ------------------------------

export const sendForgotPasswordEmail = (
  email: string
): Promise<AuthApiResponse<null>> => {
  return apiFetch<AuthApiResponse<null>>(
    "/auth/forgot-password",
    {
      method: "POST",
      data: { email },
    },
    true // use proxy
  )
}

export const sendResetPasswordRequest = (payload: {
  token: string
  newPassword: string
}): Promise<AuthApiResponse<null>> => {
  return apiFetch<AuthApiResponse<null>>(
    "/auth/reset-password",
    {
      method: "POST",
      data: payload,
    },
    true
  )
}

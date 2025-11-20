export interface LoginPayload {
  registrationNumber: string
  password: string
}

export type AuthUser = Record<string, unknown>

export interface AuthApiResponse<Data = unknown> {
  status?: string | number | boolean
  message?: string
  data?: Data
  [key: string]: unknown
}

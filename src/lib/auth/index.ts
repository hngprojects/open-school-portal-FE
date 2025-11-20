"use client"

import { login as loginRequest, refresh as refreshRequest } from "@/lib/api/auth"
import type { AuthApiResponse, LoginPayload } from "@/types/auth"

export interface AuthActionResult {
  response: AuthApiResponse
}

export const loginWithPortal = async (
  payload: LoginPayload
): Promise<AuthActionResult> => {
  const response = await loginRequest({
    registrationNumber: payload.registrationNumber.trim(),
    password: payload.password,
  })

  return { response }
}

export const refreshPortalSession = async (): Promise<AuthActionResult> => {
  const response = await refreshRequest()
  return { response }
}

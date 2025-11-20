"use client"

import { login as loginRequest, refresh as refreshRequest } from "@/lib/api/auth"
import type { AuthApiResponse, LoginPayload } from "@/types/auth"
import z from "zod"

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

// lib/schemas/auth.ts
export const activationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type ActivationFormValues = z.infer<typeof activationSchema>

// lib/api/auth.ts
export async function activateSchoolPortal(data: ActivationFormValues) {
  const response = await fetch("/api/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Activation failed")
  return response.json()
}

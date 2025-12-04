import { UserProfile, UpdateProfileRequest } from "@/types/profile"
import { apiRequestClient } from "@/lib/api-client"
import { apiRequestServer } from "@/lib/api-server"

// Client-side function
export const getProfileClient = async (): Promise<UserProfile> => {
  const data = await apiRequestClient("GET", "/auth/me")
  return data
}

export const updateProfileClient = async (
  data: UpdateProfileRequest
): Promise<UserProfile> => {
  const response = await apiRequestClient("PATCH", "/users", data)
  return response
}

// Server-side function
export const getProfileServer = async (): Promise<UserProfile> => {
  const data = await apiRequestServer("GET", "/auth/me")
  return data
}

// Default export - use server function by default
export const getProfile = getProfileServer

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UserProfile, UpdateProfileRequest } from "@/types/profile"
import { apiRequestClient } from "@/lib/api-client"
import { toast } from "sonner"

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<UserProfile> => {
      const data = await apiRequestClient("GET", "/auth/me")
      return data
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest): Promise<UserProfile> => {
      const response = await apiRequestClient("PATCH", "/users", data)
      return response
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data)
      toast.success("Profile updated successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile")
    },
  })
}

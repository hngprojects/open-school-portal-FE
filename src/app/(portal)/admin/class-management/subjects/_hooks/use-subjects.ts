import { apiFetch } from "@/lib/api/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type ResponsePack<T> = {
  data: T
  message: string
}

export interface GetSubjectsParams {
  is_active?: boolean
  page?: number
  search?: string
  limit?: number
  total?: number
}

export type Subject = {
    name: string
}

export interface SubjectsListResponse {
  data: {
    name: string
  }[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export const SubjectsAPI = {
  getAll: (params?: GetSubjectsParams) =>
    apiFetch<ResponsePack<Subject[]>>(
      "/subjects",
      {
        params,
      },
      true
    ),

  create: (data: Subject): Promise<Subject> =>
    apiFetch<ResponsePack<Subject>>(
      "/subjects",
      {
        method: "POST",
        data,
      },
      true
    )
      .then((response) => response.data)
      .catch((error) => {
        const errorMessage = error?.message?.toLowerCase() || "";

        if (error?.message?.includes("409") || errorMessage.includes("already exists")) {
          throw new Error("Subject with this name already exists.")
        }
        throw error
      }),

}



export const useGetSubjects = () => {
    return useQuery({
        queryKey: ["subjects"],
        queryFn: () => SubjectsAPI.getAll().then((res) => res.data),
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

export const useCreateSubject = (subjectData: Subject) => {
    //  use a mutation hook here to create a subject
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["create-subject", subjectData],
        mutationFn: () => SubjectsAPI.create(subjectData),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["subjects"] });
        }

    })
}
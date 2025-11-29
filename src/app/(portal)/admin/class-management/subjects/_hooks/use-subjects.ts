import { apiFetch } from "@/lib/api/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type ResponsePack<T> = {
  data: T
  message: string
}

type Pagination = {
  has_next: boolean
  has_previous: boolean
  limit: number
  page: number
  total: number
  total_pages: number
}

export interface GetSubjectsParams {
  is_active?: boolean
  page?: number
  search?: string
  limit?: number
  total?: number
}

export type Subject = {
  id: string
  name: string
}

export interface SubjectsListResponse {
  data: Subject[]
  pagination: Pagination
}

export const SubjectsAPI = {
  getAll: (params?: GetSubjectsParams) =>
    apiFetch<ResponsePack<SubjectsListResponse>>(
      "/subjects",
      {
        params,
      },
      true
    ),

    getOne: (id: string) =>
    apiFetch<ResponsePack<Subject>>(
      `/subjects/${id}`,
      { method: "GET" },
      true
    ),

  create: (data: {name: string}): Promise<Subject> =>
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
        const errorMessage = error?.message?.toLowerCase() || ""

        if (error?.message?.includes("409") || errorMessage.includes("already exists")) {
          throw new Error("Subject with this name already exists.")
        }
        throw error
      }),

  update: (id: string, data: {name?: string}) =>
    apiFetch<ResponsePack<Subject>>(
      `/subjects/${id}`,
      {
        method: "PATCH",
        data,
      },
      true
    ),
      
    deleteOne: (id: string) =>
      apiFetch(
        `/subjects/${id}`,
        { method: "DELETE" },
        true
      ),
}

export const useGetSubjects = (filters?: GetSubjectsParams) => {
  return useQuery({
    queryKey: ["subjects", filters],
    queryFn: () => SubjectsAPI.getAll(filters).then((res) => res.data),
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateSubject = () => {
  //  use a mutation hook here to create a subject
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {name: string}) => SubjectsAPI.create(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["subjects"] })
    },
  })
}


export const useUpdateSubject = (subjectID: string) => {
  //  use a mutation hook here to create a subject
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (subjectData: Subject) => SubjectsAPI.update(subjectID, {name: subjectData.name}),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["subjects"] })
      queryClient.invalidateQueries({ queryKey: ["subject", subjectID] })
    },
  })
}

export const useDeleteSubject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (subjectID: string) => SubjectsAPI.deleteOne(subjectID),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["subjects"] })
    },
  })
}

export const useGetSubject = (subjectId: string) => {
  return useQuery({
    queryKey: ["subject", subjectId],
    queryFn: () => SubjectsAPI.getOne(subjectId).then((res) => res.data),
    enabled: !!subjectId,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 20 * 60 * 1000, // 20 mins
  })
}
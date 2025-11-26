"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ClassroomsAPI } from "@/lib/classrooms"
import type {
  Classroom,
  CreateClassroomData,
  UpdateClassroomData,
  GetClassroomsParams,
} from "@/types/classroom"
import { toast } from "sonner"

type ResponsePack<T> = {
  data: T
  message: string
}

type ClassroomsResponse = ResponsePack<ResponsePack<Classroom[]>>

const CLASSROOMS_KEY = ["classrooms"]

export function useGetClassrooms(filters?: GetClassroomsParams) {
  return useQuery({
    queryKey: [...CLASSROOMS_KEY, filters],
    queryFn: () => ClassroomsAPI.getAll(filters),
    select: (data) => data.data?.data as Classroom[],
    staleTime: 1000 * 60 * 20,
  })
}

export function useGetClassroom(id?: string) {
  return useQuery({
    queryKey: [...CLASSROOMS_KEY, id],
    queryFn: () => ClassroomsAPI.getOne(id || ""),
    enabled: !!id,
    select: (data) => data.data as Classroom,
    staleTime: 1000 * 60 * 20,
  })
}

export function useCreateClassroom() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateClassroomData) => ClassroomsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASSROOMS_KEY })
      toast.success("Classroom created successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to create classroom")
    },
  })
}

export function useUpdateClassroom(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateClassroomData) => ClassroomsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASSROOMS_KEY })
      queryClient.invalidateQueries({ queryKey: [...CLASSROOMS_KEY, id] })
      toast.success("Classroom updated successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update classroom")
    },
  })
}

export function useDeleteClassroom() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => ClassroomsAPI.delete(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: CLASSROOMS_KEY })
      const previousRaw = queryClient.getQueryData(CLASSROOMS_KEY)

      queryClient.setQueryData(CLASSROOMS_KEY, (old: ClassroomsResponse | undefined) => {
        if (!old) return old
        if (old.data?.data && Array.isArray(old.data.data)) {
          return {
            ...old,
            data: {
              ...old.data,
              data: old.data.data.filter((c) => c.id !== id),
            },
          }
        }
        return old
      })
      return { previous: previousRaw }
    },
    onError: (error, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(CLASSROOMS_KEY, ctx.previous)
      }
      toast.error(error instanceof Error ? error.message : "Failed to delete classroom")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASSROOMS_KEY })
      toast.success("Classroom deleted successfully")
    },
  })
}

export function useToggleClassroomAvailability() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, is_available }: { id: string; is_available: boolean }) =>
      ClassroomsAPI.update(id, { is_available }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASSROOMS_KEY })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update classroom availability"
      )
    },
  })
}

"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { TeachersAPI, CreateTeacherData, UpdateTeacherData } from "@/lib/teachers"
import type { SnakeUser as User } from "@/types/user"

// The main list query key
const TEACHERS_KEY = ["teachers"]

// ----------------------------
// 🔍 GET ALL TEACHERS
// ----------------------------
export function useGetTeachers(onlyActive = true) {
  return useQuery({
    queryKey: TEACHERS_KEY,
    queryFn: () => TeachersAPI.getAll(onlyActive),
    select: (data) => data.data?.data as User[],
    staleTime: 1000 * 60 * 20,
  })
}

// ----------------------------
// 🔍 GET TEACHER BY ID
// ----------------------------
export function useGetTeacher(id?: string) {
  return useQuery({
    queryKey: [...TEACHERS_KEY, id],
    queryFn: () => TeachersAPI.getOne(id || ""),
    enabled: !!id,
    select: (data) => data.data as User,
    staleTime: 1000 * 60 * 20,
  })
}

// ----------------------------
// ➕ CREATE TEACHER
// ----------------------------
export function useCreateTeacher() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTeacherData) => TeachersAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEACHERS_KEY })
    },
  })
}

// ----------------------------
// ✏ UPDATE TEACHER
// ----------------------------
export function useUpdateTeacher(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateTeacherData) => TeachersAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEACHERS_KEY })
      queryClient.invalidateQueries({ queryKey: [...TEACHERS_KEY, id] })
    },
  })
}

// ----------------------------
// ❌ DELETE TEACHER (Optimistic Update)
// ----------------------------
export function useDeleteTeacher() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => TeachersAPI.delete(id),

    // Optimistic update for snappy UI
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: TEACHERS_KEY })

      const previous = queryClient.getQueryData<User[]>(TEACHERS_KEY)

      if (previous) {
        queryClient.setQueryData<User[]>(
          TEACHERS_KEY,
          previous.filter((t) => t.id !== id)
        )
      }

      return { previous }
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(TEACHERS_KEY, ctx.previous)
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEACHERS_KEY })
    },
  })
}

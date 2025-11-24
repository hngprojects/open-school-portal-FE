"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  ParentsAPI,
  CreateParentData,
  UpdateParentData,
  GetParentsParams,
} from "@/lib/parents"
import type { SnakeUser as User } from "@/types/user"
import { toast } from "sonner"

type ResponsePack<T> = {
  data: T
  message: string
}

type ParentsResponse = ResponsePack<ResponsePack<User[]>>

// Main list query key
const PARENTS_KEY = ["parents"]

// ----------------------------
// 🔍 GET ALL PARENTS
// ----------------------------
export function useGetParents(filters?: GetParentsParams) {
  return useQuery({
    queryKey: [...PARENTS_KEY, filters],
    queryFn: () => ParentsAPI.getAll(filters),
    select: (data) => data.data?.data as User[],
    staleTime: 1000 * 60 * 20,
    enabled: !!filters,
  })
}

// ----------------------------
// 🔍 GET PARENT BY ID
// ----------------------------
export function useGetParent(id?: string) {
  return useQuery({
    queryKey: [...PARENTS_KEY, id],
    queryFn: () => ParentsAPI.getOne(id || ""),
    enabled: !!id,
    select: (data) => data.data as User,
    staleTime: 1000 * 60 * 20,
  })
}

// ----------------------------
// ➕ CREATE PARENT
// ----------------------------
export function useCreateParent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateParentData) => ParentsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARENTS_KEY })
      toast.success("Parent created successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to create parent")
    },
  })
}

// ----------------------------
// ✏ UPDATE PARENT
// ----------------------------
export function useUpdateParent(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateParentData) => ParentsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARENTS_KEY })
      queryClient.invalidateQueries({ queryKey: [...PARENTS_KEY, id] })
      toast.success("Parent updated successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update parent")
    },
  })
}

// ----------------------------
// ❌ DELETE PARENT (Optimistic Update)
// ----------------------------
export function useDeleteParent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ParentsAPI.delete(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: PARENTS_KEY })

      const previousRaw = queryClient.getQueryData(PARENTS_KEY)

      queryClient.setQueryData(PARENTS_KEY, (old: ParentsResponse | undefined) => {
        if (!old) return old

        if (old.data?.data && Array.isArray(old.data.data)) {
          return {
            ...old,
            data: {
              ...old.data,
              data: old.data.data.filter((p) => p.id !== id),
            },
          }
        }

        return old
      })

      return { previous: previousRaw }
    },

    onError: (error, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(PARENTS_KEY, ctx.previous)
      }
      toast.error(error instanceof Error ? error.message : "Failed to delete parent")
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARENTS_KEY })
      toast.success("Parent deleted successfully")
    },
  })
}

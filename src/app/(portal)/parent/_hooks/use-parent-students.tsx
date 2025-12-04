"use client"
import { ParentStudents } from "@/lib/parents/client"
import { useQuery } from "@tanstack/react-query"

export const PARENT_STUDENTS_KEY = ["parent-students"]

export function useGetParentStudents() {
  return useQuery({
    queryKey: PARENT_STUDENTS_KEY,
    queryFn: () => ParentStudents.getAll(),
    staleTime: 1000 * 60 * 60,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

"use client"

import { useQuery } from "@tanstack/react-query"
import { ResultsAPI } from "@/lib/results"

const PARENT_RESULTS_KEY = ["parent", "results"]

export function useGetClasses() {
  return useQuery({
    queryKey: [...PARENT_RESULTS_KEY, "classes"],
    queryFn: () => ResultsAPI.getClasses(),
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetTerms() {
  return useQuery({
    queryKey: [...PARENT_RESULTS_KEY, "terms"],
    queryFn: () => ResultsAPI.getTerms(),
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetStudentResults(studentId?: string, termId?: string) {
  return useQuery({
    queryKey: [...PARENT_RESULTS_KEY, "student-results", studentId, termId],
    queryFn: () => {
      if (!studentId || !termId) return Promise.resolve([])
      // In a real app, you'd get the student ID from auth context
      const mockStudentId = "1" // This should come from user context
      return ResultsAPI.getStudentResults(mockStudentId, termId)
    },
    enabled: !!studentId && !!termId,
    staleTime: 1000 * 60 * 5,
  })
}

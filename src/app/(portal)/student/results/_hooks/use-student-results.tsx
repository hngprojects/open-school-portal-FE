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

export function useGetStudentResults(classId?: string, termId?: string) {
  return useQuery({
    queryKey: [...PARENT_RESULTS_KEY, "student-results", classId, termId],
    queryFn: () => {
      if (!classId || !termId) return Promise.resolve([])
      // This would need to be implemented based on your API
      // For now, return empty array
      return Promise.resolve([])
    },
    enabled: !!classId && !!termId,
    staleTime: 1000 * 60 * 5,
  })
}

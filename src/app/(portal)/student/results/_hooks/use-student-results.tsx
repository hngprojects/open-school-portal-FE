// File: app/(portal)/student/results/_hooks/use-student-results.ts
"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ResultsAPI } from "@/lib/results"
import type { GenerateResultRequest } from "@/types/result"
import { toast } from "sonner"

const STUDENT_RESULTS_KEY = ["student", "results"]

// Get student classes (enrolled classes)
export function useGetStudentClasses(studentId?: string) {
  return useQuery({
    queryKey: [...STUDENT_RESULTS_KEY, "classes", studentId],
    queryFn: () => {
      // In a real app, you would fetch classes the student is enrolled in
      // For now, we'll reuse the teacher classes endpoint
      return ResultsAPI.getClasses()
    },
    enabled: !!studentId,
    staleTime: 1000 * 60 * 5,
  })
}

// Get terms
export function useGetTerms() {
  return useQuery({
    queryKey: [...STUDENT_RESULTS_KEY, "terms"],
    queryFn: () => ResultsAPI.getTerms(),
    staleTime: 1000 * 60 * 5,
  })
}

// Get student results with pagination and filters
export function useGetStudentResults(
  studentId?: string,
  params?: { term_id?: string; page?: number; limit?: number }
) {
  return useQuery({
    queryKey: [...STUDENT_RESULTS_KEY, "student-results", studentId, params],
    queryFn: () => {
      if (!studentId) throw new Error("Student ID is required")
      return ResultsAPI.getStudentResults(studentId, params)
    },
    enabled: !!studentId,
    staleTime: 1000 * 60 * 5,
  })
}

// Get specific result by ID
export function useGetResultById(resultId?: string) {
  return useQuery({
    queryKey: [...STUDENT_RESULTS_KEY, "result", resultId],
    queryFn: () => {
      if (!resultId) throw new Error("Result ID is required")
      return ResultsAPI.getResultById(resultId)
    },
    enabled: !!resultId,
    staleTime: 1000 * 60 * 5,
  })
}

// Generate result for student
export function useGenerateResult() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: GenerateResultRequest) => ResultsAPI.generateResult(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [...STUDENT_RESULTS_KEY] })
      toast.success(`Successfully generated ${data.generated_count} result(s)`)
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to generate results")
    },
  })
}

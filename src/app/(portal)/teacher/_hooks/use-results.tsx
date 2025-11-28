"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ResultsAPI } from "@/lib/results"
import type { Grade } from "@/types/result"
import { toast } from "sonner"

const RESULTS_KEY = ["results"]

export function useGetClasses() {
  return useQuery({
    queryKey: [...RESULTS_KEY, "classes"],
    queryFn: () => ResultsAPI.getClasses(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useGetSubjects() {
  return useQuery({
    queryKey: [...RESULTS_KEY, "subjects"],
    queryFn: () => ResultsAPI.getSubjects(),
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetTerms() {
  return useQuery({
    queryKey: [...RESULTS_KEY, "terms"],
    queryFn: () => ResultsAPI.getTerms(),
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetStudents(classId?: string) {
  return useQuery({
    queryKey: [...RESULTS_KEY, "students", classId],
    queryFn: () =>
      classId ? ResultsAPI.getStudentsForGradeEntry(classId) : Promise.resolve([]),
    enabled: !!classId,
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetGradingScale() {
  return useQuery({
    queryKey: [...RESULTS_KEY, "grading-scale"],
    queryFn: () => ResultsAPI.getGradingScale(),
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

export function useGetStudentGrades(
  studentId?: string,
  classId?: string,
  subjectId?: string,
  termId?: string
) {
  return useQuery({
    queryKey: [...RESULTS_KEY, "grades", studentId, classId, subjectId, termId],
    queryFn: () => {
      // Mock data for now - replace with actual API call
      if (!studentId || !classId || !subjectId || !termId) {
        return Promise.resolve(null)
      }

      // Return mock grade data
      const mockGrade: Grade = {
        id: "mock-grade-id",
        student_id: studentId,
        subject_id: subjectId,
        class_id: classId,
        term_id: termId,
        ca_score: null,
        exam_score: null,
        total_score: null,
        grade: null,
        comment: null,
        status: "draft",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      return Promise.resolve(mockGrade)
    },
    enabled: !!studentId && !!classId && !!subjectId && !!termId,
  })
}

export function useSaveGrade() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<Grade, "id" | "created_at" | "updated_at">) => {
      // If grade ID exists, update; otherwise create new
      // This would need to be adjusted based on your API
      return ResultsAPI.updateGrade("temp-id", data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...RESULTS_KEY, "grades"] })
      toast.success("Grade saved successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to save grade")
    },
  })
}

// "use client"

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import { ResultsAPI } from "@/lib/results"
// import type { Grade } from "@/types/result"
// import { toast } from "sonner"

// const RESULTS_KEY = ["results"]

// export function useGetClasses() {
//   return useQuery({
//     queryKey: [...RESULTS_KEY, "classes"],
//     queryFn: () => ResultsAPI.getClasses(),
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   })
// }

// export function useGetSubjects() {
//   return useQuery({
//     queryKey: [...RESULTS_KEY, "subjects"],
//     queryFn: () => ResultsAPI.getSubjects(),
//     staleTime: 1000 * 60 * 5,
//   })
// }

// export function useGetTerms() {
//   return useQuery({
//     queryKey: [...RESULTS_KEY, "terms"],
//     queryFn: () => ResultsAPI.getTerms(),
//     staleTime: 1000 * 60 * 5,
//   })
// }

// export function useGetStudents(classId?: string) {
//   return useQuery({
//     queryKey: [...RESULTS_KEY, "students", classId],
//     queryFn: () => classId ? ResultsAPI.getStudentsForGradeEntry(classId) : Promise.resolve([]),
//     enabled: !!classId,
//     staleTime: 1000 * 60 * 5,
//   })
// }

// export function useGetGradingScale() {
//   return useQuery({
//     queryKey: [...RESULTS_KEY, "grading-scale"],
//     queryFn: () => ResultsAPI.getGradingScale(),
//     staleTime: 1000 * 60 * 60, // 1 hour
//   })
// }

// export function useGetStudentGrades(
//   studentId?: string,
//   classId?: string,
//   subjectId?: string,
//   termId?: string
// ) {
//   return useQuery({
//     queryKey: [...RESULTS_KEY, "grades", studentId, classId, subjectId, termId],
//     queryFn: () => {
//       // This would need to be implemented based on your API
//       // For now, return empty data
//       return Promise.resolve(null)
//     },
//     enabled: !!studentId && !!classId && !!subjectId && !!termId,
//   })
// }

// export function useSaveGrade() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: Omit<Grade, 'id' | 'created_at' | 'updated_at'>) => {
//       // If grade ID exists, update; otherwise create new
//       // This would need to be adjusted based on your API
//       return ResultsAPI.updateGrade("temp-id", data)
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [...RESULTS_KEY, "grades"] })
//       toast.success("Grade saved successfully")
//     },
//     onError: (error) => {
//       toast.error(error instanceof Error ? error.message : "Failed to save grade")
//     },
//   })
// }

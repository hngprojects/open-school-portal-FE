"use client"

import { useQuery } from "@tanstack/react-query"
import { ResultsAPI } from "@/lib/results"
import type { GetGradesParams } from "@/types/result"

const ADMIN_RESULTS_KEY = ["admin", "results"]

export function useGetSubmissions(params?: GetGradesParams) {
  return useQuery({
    queryKey: [...ADMIN_RESULTS_KEY, "submissions", params],
    queryFn: () => ResultsAPI.getSubmissions(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useGetSubmissionStats() {
  return useQuery({
    queryKey: [...ADMIN_RESULTS_KEY, "stats"],
    queryFn: async () => {
      const submissions = await ResultsAPI.getSubmissions()

      return {
        total: submissions.length,
        pending: submissions.filter((s) => s.status === "submitted").length,
        approved: submissions.filter((s) => s.status === "approved").length,
        rejected: submissions.filter((s) => s.status === "rejected").length,
      }
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetSubmission(id: string) {
  return useQuery({
    queryKey: [...ADMIN_RESULTS_KEY, "submission", id],
    queryFn: () => ResultsAPI.getSubmission(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

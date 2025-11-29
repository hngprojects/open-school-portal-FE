"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ResultsAPI } from "@/lib/results"
import type { GetGradesParams } from "@/types/result"
import { toast } from "sonner"

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

export function useApproveSubmission() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (submissionId: string) => ResultsAPI.approveSubmission(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...ADMIN_RESULTS_KEY, "submissions"] })
      queryClient.invalidateQueries({ queryKey: [...ADMIN_RESULTS_KEY, "stats"] })
      toast.success("Submission approved successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to approve submission")
    },
  })
}

export function useRejectSubmission() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      ResultsAPI.rejectSubmission(id, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...ADMIN_RESULTS_KEY, "submissions"] })
      queryClient.invalidateQueries({ queryKey: [...ADMIN_RESULTS_KEY, "stats"] })
      toast.success("Submission rejected successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reject submission")
    },
  })
}

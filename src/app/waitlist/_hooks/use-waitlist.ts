"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { joinWaitlist, getWaitlist } from "@/services/waitlist-api"

// Mutation: Join Waitlist
export function useJoinWaitlist() {
  return useMutation({
    mutationKey: ["join-waitlist"],
    mutationFn: joinWaitlist,
  })
}

// get al people in waitlist
export function useGetWaitlist(enabled = true) {
  return useQuery({
    queryKey: ["waitlist"],
    queryFn: () => getWaitlist(),
    enabled,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minute
  })
}

// Query: Check Waitlist
export function useCheckWaitlist(email: string) {
  // check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const queryEnabled = !!email && emailRegex.test(email)

  const { data, isLoading, error } = useGetWaitlist(queryEnabled)

  return {
    data: data ? { exists: data.some((entry) => entry.email === email) } : undefined,
    isLoading,
    error,
  }
}

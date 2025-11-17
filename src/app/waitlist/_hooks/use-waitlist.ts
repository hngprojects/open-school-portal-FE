"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { joinWaitlist, checkWaitlist } from "@/services/waitlist-api"

// Mutation: Join Waitlist
export function useJoinWaitlist() {
  return useMutation({
    mutationKey: ["join-waitlist"],
    mutationFn: joinWaitlist,
  })
}

// Query: Check Waitlist
export function useCheckWaitlist(email: string) {
  return useQuery({
    queryKey: ["check-waitlist", email],
    queryFn: () => checkWaitlist(email),
    enabled: email.length > 3, // only run if email is valid length
    staleTime: 1000 * 60, // 1 minute
  })
}

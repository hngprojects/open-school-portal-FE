import { fetchFn } from "@/lib/fetch-fn"

// Types
export interface JoinWaitlistPayload {
  email: string
  fullName: string
}

export interface JoinWaitlistResponse {
  message: string
  status: string
}

export interface CheckWaitlistResponse {
  exists: boolean
}

// POST: Join Waitlist
export async function joinWaitlist(payload: JoinWaitlistPayload) {
  return fetchFn<JoinWaitlistResponse>("/waitlist/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

// GET: Check if a user already exists in waitlist
export async function checkWaitlist(email: string) {
  return fetchFn<CheckWaitlistResponse>(`/waitlist/check?email=${email}`)
}

import { fetchFn } from "@/lib/fetch-fn"

// Types
export interface JoinWaitlistPayload {
  email: string
  first_name: string
  last_name: string
}

export interface JoinWaitlistResponse {
  message: string
  status: string
}

// POST: Join Waitlist
export async function joinWaitlist(payload: JoinWaitlistPayload) {
  return fetchFn<JoinWaitlistResponse>("/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

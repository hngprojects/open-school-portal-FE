import { fetchFn } from "@/lib/fetch-fn"

// Types
export interface JoinWaitlistPayload {
  email: string
  firstName: string
  lastName: string
}

export interface JoinWaitlistResponse {
  message: string
  status: string
}

export interface GetUnitWaitlistResponse {
  email: string
  firstName: string
  lastName: string
}

// POST: Join Waitlist
export async function joinWaitlist(payload: JoinWaitlistPayload) {
  return fetchFn<JoinWaitlistResponse>("/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

// GET: Check if a user already exists in waitlist
export async function getWaitlist() {
  return fetchFn<GetUnitWaitlistResponse[]>("/waitlist")
}

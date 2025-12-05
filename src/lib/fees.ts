import { apiFetch } from "./api/client"

export interface FeeComponent {
  id: string
  name: string
  amount: number
  session: string
  term: string
  frequency: string
  session_id?: string // Assuming these might be available
  term_id?: string
}

export interface Student {
  id: string
  name: string
  class: string
  session: string
  registration_number: string
  photo_url: string | null
}

export interface ActiveFeesResponse {
  data: FeeComponent[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface FeeStudentsResponse {
  data: Student[]
}

type ResponsePack<T> = {
  status_code: number
  message: string | null
  data: T
}

export const FeesAPI = {
  getActiveFees: () =>
    apiFetch<ResponsePack<ActiveFeesResponse>>("/fees/active", { method: "GET" }, true),

  getFeeStudents: (feeId: string) =>
    apiFetch<ResponsePack<FeeStudentsResponse>>(
      `/fees/${feeId}/students`,
      { method: "GET" },
      true
    ),

  createPayment: (data: FormData) =>
    apiFetch<ResponsePack<null>>(
      "/fee-payments",
      {
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      true
    ),
}

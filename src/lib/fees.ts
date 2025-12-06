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

export interface FeesAnalyticsResponse {
  data: {
    totals: {
      total_expected_fees: number
      total_paid: number
      outstanding_balance: number
      transaction_this_month: number
    }
    monthly_payments: {
      month: string
      total_payment: number
    }[]
  }
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

  getAnalytics: (params?: { year?: number; session_id?: string; term_id?: string }) =>
    apiFetch<ResponsePack<FeesAnalyticsResponse>>(
      "/fee-payments/dashboard/analytics",
      {
        method: "GET",
        params,
      },
      true
    ),
}

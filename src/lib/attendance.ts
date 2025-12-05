import { apiFetch } from "@/lib/api/client"

export interface AttendanceRecord {
  student_id: string
  status: "PRESENT" | "ABSENT"
  notes?: string
}

export interface SubmitAttendancePayload {
  class_id: string
  date: string
  attendance_records: AttendanceRecord[]
}

export interface SubmitAttendanceResponse {
  message: string
  status_code: number
  data: {
    marked: number
    updated: number
    total: number
  }
}

export const AttendanceAPI = {
  markDailyAttendance: (payload: SubmitAttendancePayload) =>
    apiFetch<SubmitAttendanceResponse>(
      "/attendance/daily/student",
      {
        method: "POST",
        data: payload,
      },
      true
    ),
}

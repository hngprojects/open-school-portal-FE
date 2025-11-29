export interface Student {
  id: string
  first_name: string
  last_name: string
  registration_number?: string
  class?: string
}

export interface Class {
  id: string
  name: string
  level?: string
}

export interface Subject {
  id: string
  name: string
  code?: string
}

export interface Term {
  id: string
  name: string
  academic_year?: string
  is_active?: boolean
}

export interface Grade {
  id?: string
  student_id: string
  subject_id: string
  class_id: string
  term_id: string
  ca_score: number | null
  exam_score: number | null
  total_score: number | null
  grade: string | null
  comment?: string | null
  status?: "draft" | "submitted" | "approved" | "rejected"
  created_at?: string
  updated_at?: string
}

export interface GradeSubmission {
  id: string
  teacher_id: string
  class_id: string
  subject_id: string
  term_id: string
  grades: Grade[]
  status: "draft" | "submitted" | "approved" | "rejected"
  submitted_at?: string
  reviewed_at?: string
  reviewed_by?: string
  rejection_reason?: string
  created_at: string
  updated_at: string
}

export interface GradingScale {
  grade: string
  min_score: number
  max_score: number
  remark: string
}

export interface GetGradesParams {
  class_id?: string
  subject_id?: string
  term_id?: string
  student_id?: string
  status?: string
  page?: number
  search?: string
  limit?: number
}
export interface GradeEntry {
  student_id: string
  ca_score: number | null
  exam_score: number | null
  total_score?: number | null
  grade?: string | null
  comment?: string | null
}

export interface CreateSubmissionRequest {
  class_id: string
  subject_id: string
  term_id: string
  academic_session_id?: string
  grades: GradeEntry[]
}

export interface SubmissionStats {
  total: number
  pending: number
  approved: number
  rejected: number
}

export interface ReviewActionRequest {
  reason?: string
  comment?: string
}

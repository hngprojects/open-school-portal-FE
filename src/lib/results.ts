import { apiFetch } from "./api/client"
import type {
  Student,
  Class,
  Subject,
  Term,
  Grade,
  GradeSubmission,
  GradingScale,
  GetGradesParams,
} from "@/types/result"

type ResponsePack<T> = {
  data: T
  message: string
}
const DEFAULT_GRADING_SCALE: GradingScale[] = [
  { grade: "A", min_score: 80, max_score: 100, remark: "Excellent" },
  { grade: "B", min_score: 70, max_score: 79, remark: "Very Good" },
  { grade: "C", min_score: 60, max_score: 69, remark: "Good" },
  { grade: "D", min_score: 50, max_score: 59, remark: "Credit" },
  { grade: "E", min_score: 40, max_score: 49, remark: "Pass" },
  { grade: "F", min_score: 0, max_score: 39, remark: "Fail" },
]

export const ResultsAPI = {
  // Classes
  getClasses: (): Promise<Class[]> =>
    apiFetch<ResponsePack<Class[]>>("/classes", {}, true).then(
      (response) => response.data
    ),

  // Subjects
  getSubjects: (): Promise<Subject[]> =>
    apiFetch<ResponsePack<Subject[]>>("/subjects", {}, true).then(
      (response) => response.data
    ),

  // Terms
  getTerms: (): Promise<Term[]> =>
    apiFetch<ResponsePack<Term[]>>("/term", {}, true).then((response) => response.data),

  // Students for grade entry
  getStudentsForGradeEntry: (classId: string): Promise<Student[]> =>
    apiFetch<ResponsePack<Student[]>>(`/grades/class/${classId}/students`, {}, true).then(
      (response) => response.data
    ),

  // Grading scale
  getGradingScale: (): Promise<GradingScale[]> => Promise.resolve(DEFAULT_GRADING_SCALE),

  // Grade submissions
  createSubmission: (data: {
    class_id: string
    subject_id: string
    term_id: string
    grades: Omit<Grade, "id" | "created_at" | "updated_at">[]
  }): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      "/grades/submissions",
      {
        method: "POST",
        data,
      },
      true
    ).then((response) => response.data),

  getSubmissions: (params?: GetGradesParams): Promise<GradeSubmission[]> =>
    apiFetch<ResponsePack<GradeSubmission[]>>(
      "/grades/submissions",
      { params },
      true
    ).then((response) => response.data),

  getSubmission: (id: string): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(`/grades/submissions/${id}`, {}, true).then(
      (response) => response.data
    ),

  submitSubmission: (id: string): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      `/grades/submissions/${id}/submit`,
      { method: "POST" },
      true
    ).then((response) => response.data),

  // Individual grades
  updateGrade: (gradeId: string, data: Partial<Grade>): Promise<Grade> =>
    apiFetch<ResponsePack<Grade>>(
      `/grades/${gradeId}`,
      {
        method: "PATCH",
        data,
      },
      true
    ).then((response) => response.data),

  // Admin endpoints
  approveSubmission: (id: string): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      `/grades/submissions/${id}/approve`,
      { method: "POST" },
      true
    ).then((response) => response.data),

  rejectSubmission: (id: string, reason: string): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      `/grades/submissions/${id}/reject`,
      {
        method: "POST",
        data: { reason },
      },
      true
    ).then((response) => response.data),
}

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
  CreateSubmissionRequest,
  ReviewActionRequest,
} from "@/types/result"

import {
  DUMMY_CLASSES,
  DUMMY_SUBJECTS,
  DUMMY_TERMS,
  DUMMY_STUDENTS,
  DUMMY_SUBMISSIONS,
  DUMMY_STUDENT_RESULTS,
  TEACHER_NAMES,
} from "./dummy-data"

type ResponsePack<T> = {
  status_code: number
  message: string
  data: T
}

const DEFAULT_GRADING_SCALE: GradingScale[] = [
  { grade: "A", min_score: 80, max_score: 100, remark: "Excellent" },
  { grade: "B", min_score: 70, max_score: 79, remark: "Very Good" },
  { grade: "C", min_score: 60, max_score: 69, remark: "Good" },
  { grade: "D", min_score: 50, max_score: 59, remark: "Credit" },
  { grade: "E", min_score: 40, max_score: 49, remark: "Pass" },
  { grade: "F", min_score: 0, max_score: 39, remark: "Fail" },
]

// Helper function to ensure arrays are returned
const ensureArray = <T>(data: unknown): T[] => {
  if (Array.isArray(data)) return data as T[]
  return []
}

// Helper to extract data from backend response
const extractData = <T>(response: ResponsePack<T>): T => {
  return response.data
}

export const ResultsAPI = {
  // Classes - updated endpoint
  getClasses: (): Promise<Class[]> =>
    apiFetch<ResponsePack<Class[]>>("/classes?page=1&limit=50", {}, true)
      .then((response) => ensureArray<Class>(extractData(response)))
      .catch(() => {
        console.log("Using dummy classes data")
        return DUMMY_CLASSES
      }),

  // Subjects - updated endpoint
  getSubjects: (): Promise<Subject[]> =>
    apiFetch<ResponsePack<Subject[]>>("/subjects?page=1&limit=50", {}, true)
      .then((response) => ensureArray<Subject>(extractData(response)))
      .catch(() => {
        console.log("Using dummy subjects data")
        return DUMMY_SUBJECTS
      }),

  // Terms - updated endpoint to use academic-term
  getTerms: (): Promise<Term[]> =>
    apiFetch<ResponsePack<Term[]>>("/academic-term/session/current", {}, true)
      .then((response) => ensureArray<Term>(extractData(response)))
      .catch(() => {
        console.log("Using dummy terms data")
        return DUMMY_TERMS
      }),

  // Students for grade entry - updated endpoint
  getStudentsForGradeEntry: (classId: string, subjectId?: string): Promise<Student[]> =>
    apiFetch<ResponsePack<Student[]>>(
      `/grades/class/${classId}/students${subjectId ? `?subject_id=${subjectId}` : ""}`,
      {},
      true
    )
      .then((response) => ensureArray<Student>(extractData(response)))
      .catch(() => {
        console.log("Using dummy students data for class:", classId)
        return DUMMY_STUDENTS.filter(
          (student) => student.class === DUMMY_CLASSES.find((c) => c.id === classId)?.name
        )
      }),

  // Grading scale
  getGradingScale: (): Promise<GradingScale[]> => Promise.resolve(DEFAULT_GRADING_SCALE),

  // Grade submissions - create new submission
  createSubmission: (data: CreateSubmissionRequest): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      "/grades/submissions",
      {
        method: "POST",
        data,
      },
      true
    ).then((response) => extractData(response)),

  // Submit submission for approval
  submitSubmission: (id: string): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      `/grades/submissions/${id}/submit`,
      { method: "POST" },
      true
    ).then((response) => extractData(response)),

  // Update submission after rejection
  updateSubmission: (
    id: string,
    data: Partial<GradeSubmission>
  ): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      `/grades/submission/${id}/update`,
      {
        method: "PATCH",
        data,
      },
      true
    ).then((response) => extractData(response)),

  // Get teacher's submissions with filters
  getSubmissions: (params?: GetGradesParams): Promise<GradeSubmission[]> => {
    const queryParams = new URLSearchParams()

    if (params?.class_id) queryParams.append("class_id", params.class_id)
    if (params?.subject_id) queryParams.append("subject_id", params.subject_id)
    if (params?.term_id) queryParams.append("term_id", params.term_id)
    if (params?.status) queryParams.append("status", params.status)
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    return apiFetch<ResponsePack<GradeSubmission[]>>(
      `/grades/submissions?${queryParams.toString()}`,
      {},
      true
    )
      .then((response) => ensureArray<GradeSubmission>(extractData(response)))
      .catch(() => {
        console.log("Using dummy submissions data")
        let filteredSubmissions = [...DUMMY_SUBMISSIONS]

        // Apply search filter if provided
        if (params?.search) {
          const searchLower = params.search.toLowerCase()
          filteredSubmissions = filteredSubmissions.filter((submission) => {
            const teacherName = TEACHER_NAMES[submission.teacher_id] || ""
            return teacherName.toLowerCase().includes(searchLower)
          })
        }

        // Apply status filter if provided
        if (params?.status && params.status !== "all") {
          filteredSubmissions = filteredSubmissions.filter(
            (submission) => submission.status === params.status
          )
        }

        return filteredSubmissions
      })
  },

  // Get specific submission
  getSubmission: (id: string): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(`/grades/submissions/${id}`, {}, true)
      .then((response) => extractData(response))
      .catch(() => {
        console.log("Using dummy submission data for ID:", id)
        const submission = DUMMY_SUBMISSIONS.find((s) => s.id === id)
        if (!submission) {
          throw new Error("Submission not found")
        }
        return submission
      }),

  // Update individual grade
  updateGrade: (gradeId: string, data: Partial<Grade>): Promise<Grade> =>
    apiFetch<ResponsePack<Grade>>(
      `/grades/${gradeId}`,
      {
        method: "PATCH",
        data,
      },
      true
    )
      .then((response) => extractData(response))
      .catch(() => {
        console.log("Mock grade update for ID:", gradeId, data)
        // Return mock updated grade
        return {
          id: gradeId,
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Grade
      }),

  // Admin: Get all submissions (for admin dashboard)
  getAdminSubmissions: (params?: { status?: string }): Promise<GradeSubmission[]> => {
    const queryParams = new URLSearchParams()

    if (params?.status) queryParams.append("status", params.status)

    return apiFetch<ResponsePack<GradeSubmission[]>>(
      `/admin/submissions?${queryParams.toString()}`,
      {},
      true
    )
      .then((response) => ensureArray<GradeSubmission>(extractData(response)))
      .catch(() => {
        console.log("Using dummy submissions data for admin")
        let filteredSubmissions = [...DUMMY_SUBMISSIONS]

        if (params?.status) {
          filteredSubmissions = filteredSubmissions.filter(
            (submission) => submission.status === params.status
          )
        }

        return filteredSubmissions
      })
  },

  // Admin: Approve submission
  approveSubmission: (id: string, data?: ReviewActionRequest): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      `/admin/submissions/${id}/approve`,
      {
        method: "POST",
        data,
      },
      true
    ).then((response) => extractData(response)),

  // Admin: Reject submission
  rejectSubmission: (id: string, data: ReviewActionRequest): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      `/admin/submissions/${id}/reject`,
      {
        method: "POST",
        data,
      },
      true
    ).then((response) => extractData(response)),

  // Get student results for parent/student view
  getStudentResults: (studentId: string, termId?: string): Promise<Grade[]> =>
    apiFetch<ResponsePack<Grade[]>>(
      `/results/student/${studentId}${termId ? `?term_id=${termId}` : ""}`,
      {},
      true
    )
      .then((response) => ensureArray<Grade>(extractData(response)))
      .catch(() => {
        console.log("Using dummy student results data")
        // Convert DUMMY_STUDENT_RESULTS to Grade format
        const convertedResults: Grade[] = DUMMY_STUDENT_RESULTS.map((result, index) => ({
          id: `grade-${index}`,
          student_id: studentId,
          subject_id: result.subject_id,
          class_id: "1", // Default class ID
          term_id: termId || "1",
          ca_score: result.ca_score,
          exam_score: result.exam_score,
          total_score: result.total_score,
          grade: result.grade,
          comment: null,
          status: "approved",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }))
        return convertedResults
      }),
}

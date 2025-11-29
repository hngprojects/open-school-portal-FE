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

import {
  DUMMY_CLASSES,
  DUMMY_SUBJECTS,
  DUMMY_TERMS,
  DUMMY_STUDENTS,
  // DUMMY_GRADING_SCALE,
  DUMMY_SUBMISSIONS,
  DUMMY_STUDENT_RESULTS,
  TEACHER_NAMES,
} from "./dummy-data"

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
    apiFetch<ResponsePack<Class[]>>("/classes", {}, true)
      .then((response) => response.data)
      .catch(() => {
        console.log("Using dummy classes data")
        return DUMMY_CLASSES
      }),

  // Subjects
  getSubjects: (): Promise<Subject[]> =>
    apiFetch<ResponsePack<Subject[]>>("/subjects", {}, true)
      .then((response) => response.data)
      .catch(() => {
        console.log("Using dummy subjects data")
        return DUMMY_SUBJECTS
      }),

  // Terms
  getTerms: (): Promise<Term[]> =>
    apiFetch<ResponsePack<Term[]>>("/term", {}, true)
      .then((response) => response.data)
      .catch(() => {
        console.log("Using dummy terms data")
        return DUMMY_TERMS
      }),
  // Students for grade entry - with fallback to dummy data
  getStudentsForGradeEntry: (classId: string): Promise<Student[]> =>
    apiFetch<ResponsePack<Student[]>>(`/grades/class/${classId}/students`, {}, true)
      .then((response) => response.data)
      .catch(() => {
        console.log("Using dummy students data for class:", classId)
        // Filter students by class
        return DUMMY_STUDENTS.filter(
          (student) => student.class === DUMMY_CLASSES.find((c) => c.id === classId)?.name
        )
      }),
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

  // Grade submissions - with fallback to dummy data
  getSubmissions: (params?: GetGradesParams): Promise<GradeSubmission[]> =>
    apiFetch<ResponsePack<GradeSubmission[]>>("/grades/submissions", { params }, true)
      .then((response) => response.data)
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
      }),

  getSubmission: (id: string): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(`/grades/submissions/${id}`, {}, true)
      .then((response) => response.data)
      .catch(() => {
        console.log("Using dummy submission data for ID:", id)
        const submission = DUMMY_SUBMISSIONS.find((s) => s.id === id)
        if (!submission) {
          throw new Error("Submission not found")
        }
        return submission
      }),

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
    )
      .then((response) => response.data)
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

  // Student results for parent/student view
  getStudentResults: (
    studentId: string,
    classId?: string,
    termId?: string
  ): Promise<unknown[]> =>
    apiFetch<ResponsePack<unknown[]>>(
      `/students/${studentId}/results`,
      { params: { class_id: classId, term_id: termId } },
      true
    )
      .then((response) => response.data)
      .catch(() => {
        console.log("Using dummy student results data")
        return DUMMY_STUDENT_RESULTS
      }),
}

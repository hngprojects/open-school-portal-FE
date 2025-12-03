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

type ResponsePack<T> = {
  status_code: number
  message: string
  data: T
}

// Helper function to extract data from backend response
const extractData = <T>(response: ResponsePack<T>): T => {
  return response.data
}

// Helper to ensure arrays are returned
const ensureArray = <T>(data: unknown): T[] => {
  if (Array.isArray(data)) return data as T[]
  return []
}

interface ClassWithSession {
  id: string
  name: string
  arm: string
  academicSession: {
    id: string
    name: string
  }
}

// Interface for the actual subjects response
// Actual response shape from /classes/{id}/subjects
interface ClassSubjectsResponsePayload {
  payload: Array<{
    id: string
    createdAt: string
    updatedAt: string
    teacher_assignment_date: string | null
    subject: {
      id: string
      createdAt: string
      updatedAt: string
      name: string
    }
    teacher: unknown | null
  }>
  paginationMeta: {
    total: number
  }
}

// Actual response shape from /academic-term/active
interface ActiveTermResponse {
  id: string
  createdAt: string
  updatedAt: string
  sessionId: string
  name: string
  startDate: string
  endDate: string
  status: string
  isCurrent: boolean
  deletedAt: string | null
}

export const ResultsAPI = {
  // Get classes for teacher
  getClasses: (): Promise<Class[]> => {
    return apiFetch<ResponsePack<ClassWithSession[]>>(
      "/classes/teacher/assigned",
      {},
      true
    )
      .then((response) => {
        const classItems = extractData(response)

        // Transform the response to match your Class interface
        return classItems.map((classItem) => ({
          id: classItem.id,
          name: `${classItem.name} ${classItem.arm}`,
          level: classItem.name.includes("SS") ? "Senior Secondary" : "Junior Secondary",
          academic_session_id: classItem.academicSession.id, // Store this for later use
        }))
      })
      .catch((error) => {
        console.error("Error fetching classes:", error)
        return []
      })
  },

  // Get subjects for a class
  getSubjects: (classId?: string, teacherId?: string): Promise<Subject[]> => {
    const queryParams = new URLSearchParams()

    if (classId) queryParams.append("class_id", classId)
    if (teacherId) queryParams.append("teacher_id", teacherId)

    // Only add "?" if there are query params
    const queryString = queryParams.toString()
    const url = queryString ? `/class-subjects?${queryString}` : `/class-subjects`

    return apiFetch<ResponsePack<ClassSubjectsResponsePayload>>(url, {}, true)
      .then((response) => {
        const backendData = extractData(response)
        const items = backendData.payload ?? []

        return items.map(
          (item) =>
            ({
              id: item.subject.id,
              name: item.subject.name,
            }) satisfies Subject
        )
      })
      .catch((err) => {
        console.error("Failed to fetch subjects:", err)
        return []
      })
  },

  // Get active term - fully typed
  getTerms: (): Promise<Term[]> => {
    return apiFetch<ResponsePack<ActiveTermResponse>>("/academic-term/active", {}, true)
      .then((response) => {
        const termData = extractData(response)

        // The endpoint returns a single term object directly under "data"
        if (termData && termData.id) {
          return [
            {
              id: termData.id,
              name: termData.name,
              start_date: termData.startDate,
              end_date: termData.endDate,
              status: termData.status,
              is_active: termData.isCurrent,
              // map other fields as needed by your Term type
            } satisfies Term,
          ]
        }

        return []
      })
      .catch((error) => {
        console.error("Error fetching active term:", error)
        return []
      })
  },

  // Get students for grade entry
  getStudentsForGradeEntry: (classId: string): Promise<Student[]> => {
    if (!classId) {
      return Promise.resolve([])
    }

    return apiFetch<
      ResponsePack<
        Array<{
          enrollment_date: string
          is_active: boolean
          name: string
          registration_number: string
          student_id: string
        }>
      >
    >(`classes/${classId}/students`, {}, true)
      .then((response) => {
        const studentData = ensureArray<{
          enrollment_date: string
          is_active: boolean
          name: string
          registration_number: string
          student_id: string
        }>(extractData(response))

        // Transform the backend response to match our Student interface
        const students: Student[] = studentData.map((item) => {
          const nameParts = item.name.split(" ")
          const firstName = nameParts[0] || ""
          const lastName = nameParts.slice(1).join(" ") || ""

          return {
            id: item.student_id,
            first_name: firstName,
            last_name: lastName,
            registration_number: item.registration_number,
          }
        })

        console.log("Transformed students:", students)
        return students
      })
      .catch((error) => {
        console.error("Error fetching students:", error)
        return []
      })
  },

  // Create new submission (draft)
  createSubmission: (data: CreateSubmissionRequest): Promise<GradeSubmission> => {
    return apiFetch<ResponsePack<GradeSubmission>>(
      "/grades/submissions",
      {
        method: "POST",
        data,
      },
      true
    )
      .then((response) => {
        const submission = extractData(response)
        return submission
      })
      .catch((error) => {
        console.error("Error creating submission:", error)
        throw error
      })
  },

  // Submit submission for approval
  submitSubmission: (id: string): Promise<GradeSubmission> => {
    return apiFetch<ResponsePack<GradeSubmission>>(
      `/grades/submissions/${id}/submit`,
      { method: "POST" },
      true
    )
      .then((response) => {
        const submission = extractData(response)
        return submission
      })
      .catch((error) => {
        console.error("Error submitting submission:", error)
        throw error
      })
  },

  // Update submission after rejection
  updateSubmission: (
    id: string,
    data: Partial<GradeSubmission>
  ): Promise<GradeSubmission> => {
    return apiFetch<ResponsePack<GradeSubmission>>(
      `/grades/submission/${id}/update`,
      {
        method: "PATCH",
        data,
      },
      true
    )
      .then((response) => {
        const submission = extractData(response)
        return submission
      })
      .catch((error) => {
        console.error("Error updating submission:", error)
        throw error
      })
  },

  // Get teacher's submissions with filters
  getTeacherSubmissions: (params?: GetGradesParams): Promise<GradeSubmission[]> => {
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
      .then((response) => {
        const submissions = ensureArray<GradeSubmission>(extractData(response))
        return submissions
      })
      .catch((error) => {
        console.error("Error fetching teacher submissions:", error)
        return []
      })
  },

  // Get specific submission
  getSubmission: (id: string): Promise<GradeSubmission> => {
    return apiFetch<ResponsePack<GradeSubmission>>(`/grades/submissions/${id}`, {}, true)
      .then((response) => {
        const submission = extractData(response)
        return submission
      })
      .catch((error) => {
        console.error("Error fetching submission:", error)
        throw error
      })
  },

  // Update individual grade
  updateGrade: (gradeId: string, data: Partial<Grade>): Promise<Grade> => {
    return apiFetch<ResponsePack<Grade>>(
      `/grades/${gradeId}`,
      {
        method: "PATCH",
        data,
      },
      true
    )
      .then((response) => {
        const grade = extractData(response)
        return grade
      })
      .catch((error) => {
        console.error("Error updating grade:", error)
        throw error
      })
  },

  // Admin: Get all submissions - Use the correct endpoint
  getAdminSubmissions: (params?: { status?: string }): Promise<GradeSubmission[]> => {
    const queryParams = new URLSearchParams()

    if (params?.status) queryParams.append("status", params.status)

    return apiFetch<ResponsePack<GradeSubmission[]>>(
      `/grades/submissions?${queryParams.toString()}`,
      {},
      true
    )
      .then((response) => {
        const submissions = ensureArray<GradeSubmission>(extractData(response))
        return submissions
      })
      .catch((error) => {
        console.error("Error fetching admin submissions:", error)
        return []
      })
  },

  // Admin: Approve submission
  approveSubmission: (
    id: string,
    data?: ReviewActionRequest
  ): Promise<GradeSubmission> => {
    return apiFetch<ResponsePack<GradeSubmission>>(
      `/grades/submissions/${id}/approve`,
      {
        method: "POST",
        data,
      },
      true
    )
      .then((response) => {
        const submission = extractData(response)
        return submission
      })
      .catch((error) => {
        console.error("Error approving submission:", error)
        throw error
      })
  },

  // Admin: Reject submission
  rejectSubmission: (id: string, data: ReviewActionRequest): Promise<GradeSubmission> => {
    return apiFetch<ResponsePack<GradeSubmission>>(
      `/grades/submissions/${id}/reject`,
      {
        method: "POST",
        data,
      },
      true
    )
      .then((response) => {
        const submission = extractData(response)
        return submission
      })
      .catch((error) => {
        console.error("Error rejecting submission:", error)
        throw error
      })
  },

  // Get student results for parent/student view
  getStudentResults: (studentId: string, termId?: string): Promise<Grade[]> => {
    const queryString = termId ? `?term_id=${termId}` : ""

    return apiFetch<ResponsePack<Grade[]>>(
      `/results/student/${studentId}${queryString}`,
      {},
      true
    )
      .then((response) => {
        const results = ensureArray<Grade>(extractData(response))
        return results
      })
      .catch((error) => {
        console.error("Error fetching student results:", error)
        return []
      })
  },

  // Get grading scale
  getGradingScale: (): Promise<GradingScale[]> => {
    // This would need a real endpoint
    // For now, return default scale
    const DEFAULT_GRADING_SCALE: GradingScale[] = [
      { grade: "A", min_score: 80, max_score: 100, remark: "Excellent" },
      { grade: "B", min_score: 70, max_score: 79, remark: "Very Good" },
      { grade: "C", min_score: 60, max_score: 69, remark: "Good" },
      { grade: "D", min_score: 50, max_score: 59, remark: "Credit" },
      { grade: "E", min_score: 40, max_score: 49, remark: "Pass" },
      { grade: "F", min_score: 0, max_score: 39, remark: "Fail" },
    ]

    return Promise.resolve(DEFAULT_GRADING_SCALE)
  },
}

// Helper function to calculate grade
export function calculateGrade(totalScore: number): string {
  if (totalScore >= 80) return "A"
  if (totalScore >= 70) return "B"
  if (totalScore >= 60) return "C"
  if (totalScore >= 50) return "D"
  if (totalScore >= 40) return "E"
  return "F"
}

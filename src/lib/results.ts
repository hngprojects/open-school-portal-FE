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

// Interface for the actual classes response
interface ClassesResponse {
  items: Array<{
    name: string
    academicSession: {
      id: string
      name: string
    }
    classes: Array<{
      id: string
      arm: string
    }>
  }>
  pagination: {
    total: number
    limit: number
    page: number
    total_pages: number
    has_next: boolean
    has_previous: boolean
  }
}

// Interface for the actual subjects response
interface SubjectsResponse {
  data: Subject[]
  pagination: {
    total: number
    page: number
    limit: number
    total_pages: number
    has_next: boolean
    has_previous: boolean
  }
}

export const ResultsAPI = {
  // Get classes for teacher - Use the correct endpoint from your backend
  getClasses: (): Promise<Class[]> => {
    return apiFetch<ResponsePack<ClassesResponse>>("/classes", {}, true)
      .then((response) => {
        const data = extractData(response)

        // Transform the nested structure to flat Class array
        const classes: Class[] = []

        data.items.forEach((item) => {
          item.classes.forEach((classItem) => {
            classes.push({
              id: classItem.id,
              name: `${item.name} ${classItem.arm}`,
              level: item.name.includes("SS") ? "Senior Secondary" : "Junior Secondary",
            })
          })
        })

        return classes
      })
      .catch((error) => {
        console.error("Error fetching classes:", error)
        return []
      })
  },

  // Get subjects for a class - Use the correct endpoint
  getSubjects: (classId?: string): Promise<Subject[]> => {
    if (!classId) {
      return Promise.resolve([])
    }

    return apiFetch<ResponsePack<SubjectsResponse>>(
      `/classes/${classId}/subjects`,
      {},
      true
    )
      .then((response) => {
        const data = extractData(response)
        const subjects = ensureArray<Subject>(data.data)
        return subjects
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error)
        return []
      })
  },

  // Get all terms - Use the correct endpoint
  getTerms: (): Promise<Term[]> => {
    return apiFetch<ResponsePack<Term>>("/academic-term/active", {}, true)
      .then((response) => {
        const term = extractData(response)
        return term ? [term] : []
      })
      .catch((error) => {
        console.error("Error fetching active term:", error)
        return []
      })
  },

  // Get students for grade entry
  getStudentsForGradeEntry: (classId: string, subjectId?: string): Promise<Student[]> => {
    if (!classId) {
      return Promise.resolve([])
    }

    const queryString = subjectId ? `?subject_id=${subjectId}` : ""

    return apiFetch<ResponsePack<Student[]>>(
      `/grades/class/${classId}/students${queryString}`,
      {},
      true
    )
      .then((response) => {
        const students = ensureArray<Student>(extractData(response))
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

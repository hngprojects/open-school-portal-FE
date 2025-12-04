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

interface PaginatedSubmissionsResponse {
  items: Array<{
    id: string
    teacher: {
      id: string
      name: string
      title: string
    }
    class: {
      id: string
      name: string
      arm: string
    }
    subject: {
      id: string
      name: string
    }
    term: {
      id: string
      name: string
    }
    status: string
    student_count: number
    submitted_at: string | null
    reviewed_at: string | null
    rejection_reason: string | null
    grades: Array<{
      id: string
      student: {
        id: string
        name: string
        registration_number: string
      }
      ca_score: string
      exam_score: string
      total_score: string
      grade_letter: string
      comment: string | null
    }>
    created_at: string
    updated_at: string
  }>
  meta: {
    total: number
    limit: number
    page: number
    total_pages: number
    has_next: boolean
    has_previous: boolean
  }
}

// Result-related interfaces
interface StudentResult {
  id: string
  student_id: string
  class_id: string
  class_name?: string
  term_id: string
  term_name?: string
  academic_session_id: string
  academic_session_name?: string
  total_score: number
  average_score: number
  grade_letter: string
  position: number | null
  remark: string | null
  subject_count: number
  generated_at: string
  subjects: Array<{
    id: string
    result_id: string
    subject_id: string
    subject_name?: string
    ca_score: number | null
    exam_score: number | null
    total_score: number | null
    grade_letter: string
    remark?: string | null
  }>
}

interface ClassStatistics {
  highest_score: number
  lowest_score: number
  class_average: number
  total_students: number
}

interface PaginatedResults {
  data: StudentResult[]
  meta: {
    total: number
    page: number
    limit: number
    total_pages: number
    has_next: boolean
    has_previous: boolean
  }
  class_statistics?: ClassStatistics
}

interface GenerateResultRequest {
  term_id: string
  academic_session_id?: string
  student_id?: string
  class_id?: string
}

interface GenerateResultResponse {
  generated_count: number
  result_ids: string[]
}

interface ResultResponsePayload {
  id: string
  student_id: string
  class_id: string
  term_id: string
  academic_session_id: string
  total_score: number
  average_score: number
  grade_letter: string
  position: number | null
  remark: string | null
  subject_count: number
  generated_at: string
  subject_lines?: Array<{
    id: string
    result_id: string
    subject_id: string
    ca_score: string | null
    exam_score: string | null
    total_score: string | null
    grade_letter: string
    remark: string | null
  }>
}
// Transform backend submission to our GradeSubmission type
const transformBackendSubmission = (backendSubmission: {
  id: string
  teacher: {
    id: string
    name: string
    title: string
  }
  class: {
    id: string
    name: string
    arm: string
  }
  subject: {
    id: string
    name: string
  }
  term: {
    id: string
    name: string
  }
  status: string
  student_count: number
  submitted_at: string | null
  reviewed_at: string | null
  rejection_reason: string | null
  grades: Array<{
    id: string
    student: {
      id: string
      name: string
      registration_number: string
    }
    ca_score: string
    exam_score: string
    total_score: string
    grade_letter: string
    comment: string | null
  }>
  created_at: string
  updated_at: string
}): GradeSubmission => {
  // Parse student name to get first and last names
  const parseStudentName = (
    fullName: string
  ): { firstName: string; lastName: string } => {
    const nameParts = fullName.trim().split(/\s+/)
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""
    return { firstName, lastName }
  }

  // Convert status to lowercase
  const status = backendSubmission.status.toLowerCase() as
    | "draft"
    | "submitted"
    | "approved"
    | "rejected"

  return {
    id: backendSubmission.id,
    teacher_id: backendSubmission.teacher.id,
    teacher: {
      id: backendSubmission.teacher.id,
      name: backendSubmission.teacher.name,
      title: backendSubmission.teacher.title,
    },
    class_id: backendSubmission.class.id,
    class: {
      id: backendSubmission.class.id,
      name: backendSubmission.class.name,
      arm: backendSubmission.class.arm,
    },
    subject_id: backendSubmission.subject.id,
    subject: {
      id: backendSubmission.subject.id,
      name: backendSubmission.subject.name,
    },
    term_id: backendSubmission.term.id,
    term: {
      id: backendSubmission.term.id,
      name: backendSubmission.term.name,
    },
    academic_session_id: "",
    grades: backendSubmission.grades.map((grade) => {
      const { firstName, lastName } = parseStudentName(grade.student.name)
      return {
        id: grade.id,
        student_id: grade.student.id,
        subject_id: backendSubmission.subject.id,
        class_id: backendSubmission.class.id,
        term_id: backendSubmission.term.id,
        ca_score: grade.ca_score ? parseFloat(grade.ca_score) : null,
        exam_score: grade.exam_score ? parseFloat(grade.exam_score) : null,
        total_score: grade.total_score ? parseFloat(grade.total_score) : null,
        grade: grade.grade_letter,
        comment: grade.comment || null,
        status: status,
        created_at: backendSubmission.created_at,
        updated_at: backendSubmission.updated_at,
      } satisfies Grade
    }),
    status: status,
    submitted_at: backendSubmission.submitted_at || undefined,
    reviewed_at: backendSubmission.reviewed_at || undefined,
    rejection_reason: backendSubmission.rejection_reason || undefined,
    created_at: backendSubmission.created_at,
    updated_at: backendSubmission.updated_at,
  }
}

// Transform backend result to our StudentResult type
const transformBackendResult = (backendResult: ResultResponsePayload): StudentResult => {
  return {
    id: backendResult.id,
    student_id: backendResult.student_id,
    class_id: backendResult.class_id,
    term_id: backendResult.term_id,
    academic_session_id: backendResult.academic_session_id,
    total_score: backendResult.total_score,
    average_score: backendResult.average_score,
    grade_letter: backendResult.grade_letter,
    position: backendResult.position,
    remark: backendResult.remark,
    subject_count: backendResult.subject_count,
    generated_at: backendResult.generated_at,
    subjects: (backendResult.subject_lines || []).map((subject) => ({
      id: subject.id,
      result_id: subject.result_id,
      subject_id: subject.subject_id,
      ca_score: subject.ca_score ? parseFloat(subject.ca_score) : null,
      exam_score: subject.exam_score ? parseFloat(subject.exam_score) : null,
      total_score: subject.total_score ? parseFloat(subject.total_score) : null,
      grade_letter: subject.grade_letter,
      remark: subject.remark,
    })),
  }
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
  getSubjects: (): Promise<Subject[]> => {
    return apiFetch<ResponsePack<ClassSubjectsResponsePayload>>(
      "/class-subjects",
      {},
      true
    )
      .then((response) => {
        const backendData = extractData(response)
        const items = backendData.payload ?? []

        // Debug: log duplicates
        const subjectIds = items.map((item) => item.subject.id)
        const duplicateIds = subjectIds.filter(
          (id, index) => subjectIds.indexOf(id) !== index
        )

        if (duplicateIds.length > 0) {
          console.warn(`Found duplicate subject ids:`, duplicateIds)
          console.warn(
            `Total subjects: ${items.length}, Unique: ${new Set(subjectIds).size}`
          )
        }

        // Use a Map to deduplicate by subject id
        const subjectMap = new Map<string, Subject>()

        items.forEach((item) => {
          if (!subjectMap.has(item.subject.id)) {
            subjectMap.set(item.subject.id, {
              id: item.subject.id,
              name: item.subject.name,
            })
          }
        })

        // Convert Map values to array
        return Array.from(subjectMap.values())
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

  // Get teacher's submissions with filters - UPDATED!
  getTeacherSubmissions: (params?: GetGradesParams): Promise<GradeSubmission[]> => {
    const queryParams = new URLSearchParams()

    if (params?.class_id) queryParams.append("class_id", params.class_id)
    if (params?.subject_id) queryParams.append("subject_id", params.subject_id)
    if (params?.term_id) queryParams.append("term_id", params.term_id)
    if (params?.status) queryParams.append("status", params.status)
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    return apiFetch<ResponsePack<PaginatedSubmissionsResponse>>(
      `/grades/submissions?${queryParams.toString()}`,
      {},
      true
    )
      .then((response) => {
        const paginatedData = extractData(response)
        const backendSubmissions = paginatedData.items || []

        console.log("Backend submissions received:", backendSubmissions)

        // Transform each backend submission to our format
        const submissions = backendSubmissions.map(transformBackendSubmission)

        console.log("Transformed submissions:", submissions)
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
        console.log("DEBUG - Full submission data:", submission) // Add this for debugging
        return submission
      })
      .catch((error) => {
        console.error("Error fetching submission:", error)
        throw error
      })
  },

  // Add a method to get student info
  getStudentInfo: (
    studentId: string
  ): Promise<{ id: string; name: string; registration_number?: string }> => {
    return apiFetch<
      ResponsePack<{ id: string; name: string; registration_number?: string }>
    >(`/students/${studentId}`, {}, true)
      .then((response) => extractData(response))
      .catch((error) => {
        console.error("Error fetching student info:", error)
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

  // Admin: Get all submissions with filters
  getAdminSubmissions: (params?: { status?: string }): Promise<GradeSubmission[]> => {
    const queryParams = new URLSearchParams()

    if (params?.status) queryParams.append("status", params.status)

    return apiFetch<ResponsePack<PaginatedSubmissionsResponse>>(
      `/grades/submissions?${queryParams.toString()}`,
      {},
      true
    )
      .then((response) => {
        const paginatedData = extractData(response)
        const backendSubmissions = paginatedData.items || []

        // Transform each backend submission to our format
        const submissions = backendSubmissions.map(transformBackendSubmission)
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

  // Generate results for a student
  generateResult: (data: GenerateResultRequest): Promise<GenerateResultResponse> => {
    return apiFetch<ResponsePack<GenerateResultResponse>>(
      "/results/generate",
      {
        method: "POST",
        data,
      },
      true
    )
      .then((response) => {
        const result = extractData(response)
        return result
      })
      .catch((error) => {
        console.error("Error generating result:", error)
        throw error
      })
  },

  // Get student results with optional filters
  getStudentResults: (
    studentId: string,
    params?: { term_id?: string; page?: number; limit?: number }
  ): Promise<PaginatedResults> => {
    const queryParams = new URLSearchParams()

    if (params?.term_id) queryParams.append("term_id", params.term_id)
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""

    return apiFetch<ResponsePack<PaginatedResults>>(
      `/results/student/${studentId}${queryString}`,
      {},
      true
    )
      .then((response) => {
        const paginatedData = extractData(response)

        // Transform each backend result
        const transformedData = {
          ...paginatedData,
          data: paginatedData.data.map(transformBackendResult),
        }

        return transformedData
      })
      .catch((error) => {
        console.error("Error fetching student results:", error)
        throw error
      })
  },

  // Get specific result by ID
  getResultById: (resultId: string): Promise<StudentResult> => {
    return apiFetch<ResponsePack<ResultResponsePayload>>(`/results/${resultId}`, {}, true)
      .then((response) => {
        const result = extractData(response)
        return transformBackendResult(result)
      })
      .catch((error) => {
        console.error("Error fetching result by ID:", error)
        throw error
      })
  },

  // Get class results with statistics
  getClassResults: (
    classId: string,
    termId: string,
    academicSessionId?: string
  ): Promise<{ data: StudentResult[]; class_statistics: ClassStatistics }> => {
    const queryParams = new URLSearchParams()
    queryParams.append("term_id", termId)
    if (academicSessionId) queryParams.append("academic_session_id", academicSessionId)

    return apiFetch<
      ResponsePack<{
        data: ResultResponsePayload[]
        class_statistics: ClassStatistics
      }>
    >(`/results/class/${classId}?${queryParams.toString()}`, {}, true)
      .then((response) => {
        const resultData = extractData(response)

        return {
          data: resultData.data.map(transformBackendResult),
          class_statistics: resultData.class_statistics,
        }
      })
      .catch((error) => {
        console.error("Error fetching class results:", error)
        throw error
      })
  },

  // List all results with filters
  listResults: (params?: {
    term_id?: string
    academic_session_id?: string
    class_id?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResults> => {
    const queryParams = new URLSearchParams()

    if (params?.term_id) queryParams.append("term_id", params.term_id)
    if (params?.academic_session_id)
      queryParams.append("academic_session_id", params.academic_session_id)
    if (params?.class_id) queryParams.append("class_id", params.class_id)
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    return apiFetch<ResponsePack<PaginatedResults>>(
      `/results?${queryParams.toString()}`,
      {},
      true
    )
      .then((response) => {
        const paginatedData = extractData(response)

        const transformedData = {
          ...paginatedData,
          data: paginatedData.data.map(transformBackendResult),
        }

        return transformedData
      })
      .catch((error) => {
        console.error("Error listing results:", error)
        throw error
      })
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

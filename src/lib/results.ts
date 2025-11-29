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
  // Classes - handle the nested response structure
  getClasses: (): Promise<Class[]> =>
    apiFetch<ResponsePack<ClassesResponse>>("/classes", {}, true)
      .then((response) => {
        const data = extractData(response)
        console.log("Classes API Response:", data) // Debug log

        // Transform the nested structure to flat Class array
        const classes: Class[] = []

        data.items.forEach((item) => {
          item.classes.forEach((classItem) => {
            classes.push({
              id: classItem.id,
              name: `${item.name} ${classItem.arm}`, // Combine name and arm: "JSS1 A", "SS3 C", etc.
              level: item.name.includes("SS") ? "Senior Secondary" : "Junior Secondary",
            })
          })
        })

        console.log("Transformed Classes:", classes) // Debug log
        return classes
      })
      .catch((error) => {
        console.log("Using dummy classes data due to error:", error)
        return DUMMY_CLASSES
      }),

  // Subjects - handle the nested response structure
  getSubjects: (): Promise<Subject[]> =>
    apiFetch<ResponsePack<SubjectsResponse>>("/subjects", {}, true)
      .then((response) => {
        const data = extractData(response)
        console.log("Subjects API Response:", data) // Debug log

        // Return the data array directly
        const subjects = ensureArray<Subject>(data.data)
        console.log("Transformed Subjects:", subjects) // Debug log
        return subjects
      })
      .catch((error) => {
        console.log("Using dummy subjects data due to error:", error)
        return DUMMY_SUBJECTS
      }),

  // Terms - updated endpoint to use academic-term
  getTerms: (): Promise<Term[]> =>
    apiFetch<ResponsePack<Term[]>>("/academic-term", {}, true)
      .then((response) => {
        const terms = ensureArray<Term>(extractData(response))
        console.log("Terms API Response:", terms) // Debug log
        return terms
      })
      .catch((error) => {
        console.log("Using dummy terms data due to error:", error)
        return DUMMY_TERMS
      }),

  // Students for grade entry - updated endpoint
  // Students for grade entry - with better error handling and fallback
  getStudentsForGradeEntry: (classId: string, subjectId?: string): Promise<Student[]> => {
    // If we don't have a valid classId, return empty array
    if (!classId) {
      return Promise.resolve([])
    }

    return apiFetch<ResponsePack<Student[]>>(
      `/grades/class/${classId}/students${subjectId ? `?subject_id=${subjectId}` : ""}`,
      {},
      true
    )
      .then((response) => {
        const students = ensureArray<Student>(extractData(response))
        console.log("Students API Response for class", classId, ":", students)
        return students
      })
      .catch((error) => {
        console.log("Error fetching students for class:", classId, "Error:", error)

        // Check if it's a 403 Forbidden error
        if (error?.response?.status === 403 || error?.message?.includes("403")) {
          console.log(
            "Teacher doesn't have permission for this class. Using demo students data."
          )

          // Get the class name for filtering demo data
          return ResultsAPI.getClasses()
            .then((classes) => {
              const selectedClass = classes.find((c) => c.id === classId)
              const className = selectedClass?.name || "SSS1 B"

              // Filter demo students by class name
              const demoStudents = DUMMY_STUDENTS.filter(
                (student) =>
                  student.class === className ||
                  student.class?.includes(className.split(" ")[0])
              )

              console.log(
                "Using demo students for class:",
                className,
                "Count:",
                demoStudents.length
              )
              return demoStudents
            })
            .catch((classError) => {
              console.log(
                "Error getting classes for fallback, using all demo students:",
                classError
              )
              return DUMMY_STUDENTS
            })
        }

        // For other errors, use demo data filtered by class
        console.log("Using dummy students data for class:", classId)
        return DUMMY_STUDENTS.filter(
          (student) => student.class === DUMMY_CLASSES.find((c) => c.id === classId)?.name
        )
      })
  },

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
    )
      .then((response) => {
        const submission = extractData(response)
        console.log("Create Submission Response:", submission) // Debug log
        return submission
      })
      .catch((error) => {
        console.log("Mock create submission due to error:", error)
        // Return mock submission
        return {
          id: `sub-${Date.now()}`,
          teacher_id: "teacher1",
          class_id: data.class_id,
          subject_id: data.subject_id,
          term_id: data.term_id,
          grades: data.grades.map((grade) => ({
            ...grade,
            id: `grade-${Date.now()}-${grade.student_id}`,
            total_score: (grade.ca_score || 0) + (grade.exam_score || 0),
            grade: calculateGrade((grade.ca_score || 0) + (grade.exam_score || 0)),
            status: "draft",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })),
          status: "draft",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as GradeSubmission
      }),

  // Submit submission for approval
  submitSubmission: (id: string): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      `/grades/submissions/${id}/submit`,
      { method: "POST" },
      true
    )
      .then((response) => {
        const submission = extractData(response)
        console.log("Submit Submission Response:", submission) // Debug log
        return submission
      })
      .catch((error) => {
        console.log("Mock submit submission due to error:", error)
        // Return mock approved submission
        const mockSubmission = DUMMY_SUBMISSIONS[0]
        return {
          ...mockSubmission,
          id,
          status: "submitted",
          submitted_at: new Date().toISOString(),
        } as GradeSubmission
      }),

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
    )
      .then((response) => {
        const submission = extractData(response)
        console.log("Update Submission Response:", submission) // Debug log
        return submission
      })
      .catch((error) => {
        console.log("Mock update submission due to error:", error)
        // Return mock updated submission
        const mockSubmission = DUMMY_SUBMISSIONS[0]
        return {
          ...mockSubmission,
          id,
          ...data,
          updated_at: new Date().toISOString(),
        } as GradeSubmission
      }),

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
      .then((response) => {
        const submissions = ensureArray<GradeSubmission>(extractData(response))
        console.log("Submissions API Response:", submissions) // Debug log
        return submissions
      })
      .catch((error) => {
        console.log("Using dummy submissions data due to error:", error)
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
      .then((response) => {
        const submission = extractData(response)
        console.log("Get Submission Response:", submission) // Debug log
        return submission
      })
      .catch((error) => {
        console.log("Using dummy submission data for ID:", id, "due to error:", error)
        const submission = DUMMY_SUBMISSIONS.find((s) => s.id === id)
        if (!submission) {
          // Create a mock submission if not found
          return {
            id,
            teacher_id: "teacher1",
            class_id: "1",
            subject_id: "1",
            term_id: "1",
            grades: DUMMY_STUDENTS.map((student) => ({
              id: `grade-${student.id}`,
              student_id: student.id,
              subject_id: "1",
              class_id: "1",
              term_id: "1",
              ca_score: Math.floor(Math.random() * 30),
              exam_score: Math.floor(Math.random() * 70),
              total_score: 0,
              grade: "A",
              comment: null,
              status: "draft",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })),
            status: "submitted",
            submitted_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as GradeSubmission
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
      .then((response) => {
        const grade = extractData(response)
        console.log("Update Grade Response:", grade) // Debug log
        return grade
      })
      .catch((error) => {
        console.log("Mock grade update for ID:", gradeId, "due to error:", error)
        // Return mock updated grade
        return {
          id: gradeId,
          ...data,
          total_score: (data.ca_score || 0) + (data.exam_score || 0),
          grade: calculateGrade((data.ca_score || 0) + (data.exam_score || 0)),
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
      .then((response) => {
        const submissions = ensureArray<GradeSubmission>(extractData(response))
        console.log("Admin Submissions API Response:", submissions) // Debug log
        return submissions
      })
      .catch((error) => {
        console.log("Using dummy submissions data for admin due to error:", error)
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
    )
      .then((response) => {
        const submission = extractData(response)
        console.log("Approve Submission Response:", submission) // Debug log
        return submission
      })
      .catch((error) => {
        console.log("Mock approve submission due to error:", error)
        // Return mock approved submission
        const mockSubmission =
          DUMMY_SUBMISSIONS.find((s) => s.id === id) || DUMMY_SUBMISSIONS[0]
        return {
          ...mockSubmission,
          id,
          status: "approved",
          reviewed_at: new Date().toISOString(),
        } as GradeSubmission
      }),

  // Admin: Reject submission
  rejectSubmission: (id: string, data: ReviewActionRequest): Promise<GradeSubmission> =>
    apiFetch<ResponsePack<GradeSubmission>>(
      `/admin/submissions/${id}/reject`,
      {
        method: "POST",
        data,
      },
      true
    )
      .then((response) => {
        const submission = extractData(response)
        console.log("Reject Submission Response:", submission) // Debug log
        return submission
      })
      .catch((error) => {
        console.log("Mock reject submission due to error:", error)
        // Return mock rejected submission
        const mockSubmission =
          DUMMY_SUBMISSIONS.find((s) => s.id === id) || DUMMY_SUBMISSIONS[0]
        return {
          ...mockSubmission,
          id,
          status: "rejected",
          rejection_reason: data.reason,
          reviewed_at: new Date().toISOString(),
        } as GradeSubmission
      }),

  // Get student results for parent/student view
  getStudentResults: (studentId: string, termId?: string): Promise<Grade[]> =>
    apiFetch<ResponsePack<Grade[]>>(
      `/results/student/${studentId}${termId ? `?term_id=${termId}` : ""}`,
      {},
      true
    )
      .then((response) => {
        const results = ensureArray<Grade>(extractData(response))
        console.log("Student Results API Response:", results) // Debug log
        return results
      })
      .catch((error) => {
        console.log("Using dummy student results data due to error:", error)
        // Convert DUMMY_STUDENT_RESULTS to Grade format
        const convertedResults: Grade[] = DUMMY_STUDENT_RESULTS.map((result, index) => ({
          id: `grade-${index}`,
          student_id: studentId,
          subject_id: result.subject_id,
          class_id: "1",
          term_id: termId || "1",
          ca_score: result.ca_score,
          exam_score: result.exam_score,
          total_score: result.total_score,
          grade: result.grade,
          comment: `Comment for ${result.subject_name}`,
          status: "approved",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }))
        return convertedResults
      }),
}

// Helper function to calculate grade
function calculateGrade(totalScore: number): string {
  if (totalScore >= 80) return "A"
  if (totalScore >= 70) return "B"
  if (totalScore >= 60) return "C"
  if (totalScore >= 50) return "D"
  if (totalScore >= 40) return "E"
  return "F"
}

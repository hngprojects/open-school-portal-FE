"use client"

import { useState, useMemo, useCallback } from "react"
import {
  Class,
  Subject,
  Term,
  Student,
  GradingScale,
  GradeEntry,
  GradeSubmission,
} from "@/types/result"
import { FilterSection } from "./filter-section"
import { GradingScaleCard } from "./grading-scale-card"
import { StudentsTable } from "./students-table"
import { SubmissionActions } from "./submission-actions"
import { useGetSubmissionStatus } from "../_hooks/use-results"

interface TeacherResultsViewProps {
  classes: Class[]
  subjects: Subject[]
  terms: Term[]
  students: Student[]
  gradingScale: GradingScale[]
  selectedClass: string
  selectedSubject: string
  selectedTerm: string
  onClassChange: (classId: string) => void
  onSubjectChange: (subjectId: string) => void
  onTermChange: (termId: string) => void
  isLoadingStudents: boolean
  canShowResults: boolean
}

export function TeacherResultsView({
  classes = [],
  subjects = [],
  terms = [],
  students = [],
  gradingScale,
  selectedClass,
  selectedSubject,
  selectedTerm,
  onClassChange,
  onSubjectChange,
  onTermChange,
  isLoadingStudents,
  canShowResults,
}: TeacherResultsViewProps) {
  const [grades, setGrades] = useState<Record<string, GradeEntry>>({})

  const { data: submissionStatus } = useGetSubmissionStatus(
    selectedClass,
    selectedSubject,
    selectedTerm
  )

  const calculateGrade = useCallback((caScore: number, examScore: number): string => {
    const total = caScore + examScore
    if (total >= 80) return "A"
    if (total >= 70) return "B"
    if (total >= 60) return "C"
    if (total >= 50) return "D"
    if (total >= 40) return "E"
    return "F"
  }, [])

  const handleGradeUpdate = useCallback(
    (studentId: string, field: keyof GradeEntry, value: string) => {
      setGrades((prev) => {
        const currentGrade = prev[studentId] || {
          student_id: studentId,
          ca_score: null,
          exam_score: null,
          comment: null,
          total_score: null,
          grade: null,
        }

        const updatedGrade = { ...currentGrade }

        if (field === "ca_score" || field === "exam_score") {
          const numValue = value === "" ? null : parseInt(value)
          updatedGrade[field] = numValue as number | null

          // Auto-calculate total and grade
          const caScore = field === "ca_score" ? numValue : currentGrade.ca_score
          const examScore = field === "exam_score" ? numValue : currentGrade.exam_score

          if (caScore !== null && examScore !== null) {
            const total = caScore + examScore
            updatedGrade.total_score = total
            updatedGrade.grade = calculateGrade(caScore, examScore)
          } else {
            updatedGrade.total_score = null
            updatedGrade.grade = null
          }
        } else if (field === "comment") {
          // For comment field
          updatedGrade[field] = value === "" ? null : value
        }

        return {
          ...prev,
          [studentId]: updatedGrade as GradeEntry,
        }
      })
    },
    [calculateGrade]
  )

  const gradeEntries = useMemo(
    () =>
      Object.values(grades).filter(
        (grade) => grade.ca_score !== null || grade.exam_score !== null
      ),
    [grades]
  )

  const hasValidGrades = gradeEntries.length > 0

  // Safely access submission status properties
  const submissionStatusData = submissionStatus as GradeSubmission | null

  return (
    <div className="space-y-6">
      {/* Class Info */}
      {canShowResults && (
        <div className="rounded-lg border bg-white p-4">
          <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Class</span>
              <p className="text-lg font-semibold">
                {classes.find((c) => c.id === selectedClass)?.name || "-"}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Subject</span>
              <p className="text-lg font-semibold">
                {subjects.find((s) => s.id === selectedSubject)?.name || "-"}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Term</span>
              <p className="text-lg font-semibold">
                {terms.find((t) => t.id === selectedTerm)?.name || "-"}
              </p>
            </div>
          </div>

          {/* Submission Status */}
          {submissionStatusData && (
            <div className="mt-4">
              <span className="text-sm font-medium text-gray-500">Status: </span>
              <span
                className={`text-sm font-semibold ${
                  submissionStatusData.status === "approved"
                    ? "text-green-600"
                    : submissionStatusData.status === "rejected"
                      ? "text-red-600"
                      : submissionStatusData.status === "submitted"
                        ? "text-blue-600"
                        : "text-gray-600"
                }`}
              >
                {submissionStatusData.status?.toUpperCase() || "DRAFT"}
              </span>
              {submissionStatusData.rejection_reason && (
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-500">
                    Rejection Reason:{" "}
                  </span>
                  <span className="text-sm text-red-600">
                    {submissionStatusData.rejection_reason}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <FilterSection
        classes={classes}
        subjects={subjects}
        terms={terms}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        selectedTerm={selectedTerm}
        onClassChange={onClassChange}
        onSubjectChange={onSubjectChange}
        onTermChange={onTermChange}
      />

      {/* Grading Scale */}
      {canShowResults && <GradingScaleCard gradingScale={gradingScale} />}

      {/* Students Table */}
      {canShowResults && (
        <StudentsTable
          students={students}
          grades={grades}
          onGradeUpdate={handleGradeUpdate}
          isLoading={isLoadingStudents}
        />
      )}

      {/* Submission Actions */}
      {canShowResults && hasValidGrades && (
        <SubmissionActions
          classId={selectedClass}
          subjectId={selectedSubject}
          termId={selectedTerm}
          grades={gradeEntries}
          submissionStatus={submissionStatusData}
          onSubmissionUpdate={() => {
            // Refresh submission status
            // This would be handled by React Query invalidation
          }}
        />
      )}

      {/* Empty State */}
      {!canShowResults && (
        <div className="p-12 text-center">
          <div className="mx-auto max-w-md">
            <h3 className="text-lg font-semibold text-gray-900">
              Select filters to view students
            </h3>
            <p className="mt-2 text-gray-600">
              Please select a class, subject, and term to view and manage student results.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

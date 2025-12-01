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
  existingSubmission?: GradeSubmission
  showAllStudents: boolean
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
  existingSubmission,
  showAllStudents,
}: TeacherResultsViewProps) {
  const [grades, setGrades] = useState<Record<string, GradeEntry>>({})

  // Initialize grades from existing submission
  const initialGrades = useMemo(() => {
    const gradesMap: Record<string, GradeEntry> = {}
    if (existingSubmission?.grades) {
      existingSubmission.grades.forEach((grade) => {
        gradesMap[grade.student_id] = {
          student_id: grade.student_id,
          ca_score: grade.ca_score,
          exam_score: grade.exam_score,
          total_score: grade.total_score,
          grade: grade.grade,
          comment: grade.comment || null,
        }
      })
    }
    return gradesMap
  }, [existingSubmission])

  // Initialize grades state with initialGrades
  useState(() => {
    setGrades(initialGrades)
  })

  const handleGradeUpdate = useCallback((studentId: string, updatedGrade: GradeEntry) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: updatedGrade,
    }))
  }, [])

  const gradeEntries = useMemo(
    () =>
      Object.values(grades).filter(
        (grade) => grade.ca_score !== null || grade.exam_score !== null
      ),
    [grades]
  )

  const hasValidGrades = gradeEntries.length > 0

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
          {existingSubmission && (
            <div className="mt-4">
              <span className="text-sm font-medium text-gray-500">Status: </span>
              <span
                className={`text-sm font-semibold ${
                  existingSubmission.status === "approved"
                    ? "text-green-600"
                    : existingSubmission.status === "rejected"
                      ? "text-red-600"
                      : existingSubmission.status === "submitted"
                        ? "text-blue-600"
                        : "text-gray-600"
                }`}
              >
                {existingSubmission.status?.toUpperCase()}
              </span>
              {existingSubmission.rejection_reason && (
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-500">
                    Rejection Reason:{" "}
                  </span>
                  <span className="text-sm text-red-600">
                    {existingSubmission.rejection_reason}
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

      {/* Info Message */}
      {showAllStudents && !canShowResults && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            Please select a class, subject, and term to enter grades.
          </p>
        </div>
      )}

      {/* Grading Scale */}
      {canShowResults && <GradingScaleCard gradingScale={gradingScale} />}

      {/* Students Table */}
      {canShowResults && (
        <StudentsTable
          students={students}
          grades={grades}
          onGradeUpdate={handleGradeUpdate}
          isLoading={isLoadingStudents}
          classId={selectedClass}
          subjectId={selectedSubject}
          termId={selectedTerm}
        />
      )}

      {/* Submission Actions */}
      {canShowResults && hasValidGrades && (
        <SubmissionActions
          classId={selectedClass}
          subjectId={selectedSubject}
          termId={selectedTerm}
          grades={gradeEntries}
          existingSubmission={existingSubmission}
        />
      )}

      {/* Empty State */}
      {!canShowResults && !showAllStudents && (
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

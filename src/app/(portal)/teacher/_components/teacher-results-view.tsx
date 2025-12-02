"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
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
  academicSessionId: string // Add this to props
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
  academicSessionId, // Get from props
}: TeacherResultsViewProps) {
  const [grades, setGrades] = useState<Record<string, GradeEntry>>({})

  // Remove unused useEffect that sets state synchronously
  useEffect(() => {
    if (canShowResults) {
      const storageKey = `grades_${selectedClass}_${selectedSubject}_${selectedTerm}`
      const savedGrades = localStorage.getItem(storageKey)
      if (savedGrades) {
        // Use setTimeout to avoid synchronous setState in effect
        setTimeout(() => {
          setGrades(JSON.parse(savedGrades))
        }, 0)
      }
    }
  }, [selectedClass, selectedSubject, selectedTerm, canShowResults])

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

  // Merge initial grades with saved grades - use setTimeout to avoid synchronous setState
  useEffect(() => {
    if (Object.keys(initialGrades).length > 0) {
      setTimeout(() => {
        setGrades((prev) => ({ ...initialGrades, ...prev }))
      }, 0)
    }
  }, [initialGrades])

  const handleGradeUpdate = useCallback(
    (studentId: string, updatedGrade: GradeEntry) => {
      setGrades((prev) => {
        const newGrades = {
          ...prev,
          [studentId]: updatedGrade,
        }

        // Save to localStorage for persistence
        if (canShowResults) {
          const storageKey = `grades_${selectedClass}_${selectedSubject}_${selectedTerm}`
          localStorage.setItem(storageKey, JSON.stringify(newGrades))
        }

        return newGrades
      })
    },
    [selectedClass, selectedSubject, selectedTerm, canShowResults]
  )

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
      {/* Class Info - Show Academic Session */}
      {canShowResults && (
        <div className="rounded-lg border bg-white p-4">
          <div className="grid grid-cols-4 gap-4 md:grid-cols-4">
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
            <div>
              <span className="text-sm font-medium text-gray-500">Academic Session</span>
              <p className="text-lg font-semibold">{academicSessionId || "2025/2026"}</p>
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

      {/* Info Messages */}
      {!selectedClass && !selectedSubject && !selectedTerm && (
        <div className="rounded-lg border border-red-200 bg-amber-50 p-4">
          <p className="text-sm text-red-700">
            Please select a class to view students. Then select a subject and term to
            enter grades.
          </p>
        </div>
      )}

      {selectedClass && !selectedSubject && !selectedTerm && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            All students in {classes.find((c) => c.id === selectedClass)?.name} are
            displayed. Select a subject and term to enter grades.
          </p>
        </div>
      )}

      {selectedClass && (selectedSubject || selectedTerm) && !canShowResults && (
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
          <p className="text-sm text-purple-700">
            Please select both a subject and term to enter grades.
          </p>
        </div>
      )}

      {/* Show students table if class is selected */}
      {selectedClass && (
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

      {/* Only show grading scale and actions when all filters are selected */}
      {canShowResults && (
        <>
          <GradingScaleCard gradingScale={gradingScale} />

          {hasValidGrades && (
            <SubmissionActions
              classId={selectedClass}
              subjectId={selectedSubject}
              termId={selectedTerm}
              grades={gradeEntries}
              existingSubmission={existingSubmission}
              academicSessionId={academicSessionId}
            />
          )}
        </>
      )}
    </div>
  )
}

"use client"

import { Class, Subject, Term, Student, GradingScale } from "@/types/result"
import { FilterSection } from "./filter-section"
import { GradingScaleCard } from "./grading-scale-card"
import { StudentsTable } from "./students-table"

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
  classes,
  subjects,
  terms,
  students,
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
  return (
    <div className="space-y-6">
      {canShowResults && (
        <div className="rounded-lg border bg-white p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
          classId={selectedClass}
          subjectId={selectedSubject}
          termId={selectedTerm}
          isLoading={isLoadingStudents}
        />
      )}

      {/* Empty State */}
      {!canShowResults && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
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

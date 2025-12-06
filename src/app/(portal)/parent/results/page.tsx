// File: app/(portal)/parent/results/page.tsx
"use client"

import { useAuth } from "@/hooks/use-auth"
import { ParentResultsView } from "./_components/parent-results-view"
import {
  useGetLinkedStudents,
  useGetActiveTerm,
  useGetStudentResults,
} from "./_hooks/use-parent-results"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useState } from "react"

export default function ParentResultsPage() {
  const { user } = useAuth()
  const [selectedStudentId, setSelectedStudentId] = useState<string>()

  // Get linked students for the parent
  const {
    data: linkedStudents = [],
    isLoading: isLoadingStudents,
    error: studentsError,
  } = useGetLinkedStudents()

  // Get active term
  const {
    data: activeTerm,
    isLoading: isLoadingTerm,
    error: termError,
  } = useGetActiveTerm()

  // Get student results for selected student
  const {
    data: results = [],
    isLoading: isLoadingResults,
    error: resultsError,
  } = useGetStudentResults(selectedStudentId)

  const isLoading = isLoadingStudents || isLoadingTerm || isLoadingResults
  const error = studentsError || termError || resultsError

  // Transform term data
  const transformedTerm = activeTerm
    ? {
        id: activeTerm.id,
        name: activeTerm.name,
        start_date: activeTerm.startDate,
        end_date: activeTerm.endDate,
        status: activeTerm.status,
        is_active: activeTerm.isCurrent,
      }
    : undefined

  // Handle student selection
  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId)
  }

  // Auto-select first student if none selected
  if (!selectedStudentId && linkedStudents.length > 0) {
    handleStudentSelect(linkedStudents[0].id)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Children&apos;s Results</h1>
          <p className="text-gray-600">
            View and download your children&apos;s academic results
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error instanceof Error
                ? error.message
                : "An error occurred while loading results"}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && !error && (
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        )}

        {/* Student Selection */}
        {!isLoading && !error && linkedStudents.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold">Select Child</h2>
            <div className="flex flex-wrap gap-3">
              {linkedStudents.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleStudentSelect(student.id)}
                  className={`rounded-lg border px-4 py-3 transition-colors ${
                    selectedStudentId === student.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium">{student.full_name}</p>
                    <p className="text-sm text-gray-600">{student.registration_number}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results View */}
        {!isLoading && !error && selectedStudentId && linkedStudents.length > 0 && (
          <ParentResultsView
            selectedStudent={linkedStudents.find((s) => s.id === selectedStudentId)!}
            activeTerm={transformedTerm}
            results={results}
            isLoading={isLoading}
          />
        )}

        {/* No Linked Students */}
        {!isLoading && !error && linkedStudents.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="mx-auto max-w-md">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No Children Linked
              </h3>
              <p className="mt-2 text-gray-600">
                No students are linked to your parent account. Please contact your school
                administrator.
              </p>
            </div>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && !error && selectedStudentId && results.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="mx-auto max-w-md">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No Results Available
              </h3>
              <p className="mt-2 text-gray-600">
                No results are available for the selected student. Results will appear
                here once they are approved by teachers and admin.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

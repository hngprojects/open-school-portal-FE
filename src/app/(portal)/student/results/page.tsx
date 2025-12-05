// File: app/(portal)/student/results/page.tsx
"use client"

import { StudentResultsView } from "./_components/student-results-view"
import {
  useGetCurrentStudent,
  useGetActiveTerm,
  useGetStudentResults,
} from "./_hooks/use-student-results"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function StudentResultsPage() {
  // Get current student data
  const {
    data: currentStudent,
    isLoading: isLoadingStudent,
    error: studentError,
  } = useGetCurrentStudent()

  // Get active term
  const {
    data: activeTerm,
    isLoading: isLoadingTerm,
    error: termError,
  } = useGetActiveTerm()

  // Get student results for active term
  const {
    data: results = [],
    isLoading: isLoadingResults,
    error: resultsError,
  } = useGetStudentResults(currentStudent?.id)

  const isLoading = isLoadingStudent || isLoadingTerm || isLoadingResults
  const error = studentError || termError || resultsError

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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
          <p className="text-gray-600">View and download your academic results</p>
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

        {/* Results View */}
        {!isLoading && !error && currentStudent && (
          <StudentResultsView
            studentId={currentStudent.id}
            studentName={currentStudent.full_name}
            activeTerm={transformedTerm}
            results={results}
            isLoading={isLoading}
          />
        )}

        {/* No Results State */}
        {!isLoading && !error && results.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="mx-auto max-w-md">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No Results Available
              </h3>
              <p className="mt-2 text-gray-600">
                No results are available for the current term. Results will appear here
                once they are approved by your teacher and admin.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

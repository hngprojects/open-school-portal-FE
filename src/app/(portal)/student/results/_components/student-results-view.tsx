// File: app/(portal)/student/results/_components/student-results-view.tsx
"use client"

import { Class, Term, StudentResult, ClassStatistics } from "@/types/result"
import { FilterSection } from "./filter-section"
import { DownloadButton } from "./download-button"
import { ResultsTable } from "./results-table"
import { OverallSummary } from "./overall-summary"
import { EmptyState } from "./empty-state"

interface StudentResultsViewProps {
  studentId: string
  classes: Class[]
  terms: Term[]
  results: StudentResult[]
  selectedClass: string
  selectedTerm: string
  onClassChange: (classId: string) => void
  onTermChange: (termId: string) => void
  isLoading: boolean
  classStatistics?: ClassStatistics
}

export function StudentResultsView({
  studentId,
  classes,
  terms,
  results,
  selectedClass,
  selectedTerm,
  onClassChange,
  onTermChange,
  isLoading,
  classStatistics,
}: StudentResultsViewProps) {
  const selectedClassName = classes.find((c) => c.id === selectedClass)?.name || "-"
  const selectedTermName = terms.find((t) => t.id === selectedTerm)?.name || "-"

  // Get the current result for the selected class and term
  const currentResult = results.find(
    (result) => result.class_id === selectedClass && result.term_id === selectedTerm
  )

  return (
    <div className="space-y-6">
      {/* Filters */}
      <FilterSection
        classes={classes}
        terms={terms}
        selectedClass={selectedClass}
        selectedTerm={selectedTerm}
        onClassChange={onClassChange}
        onTermChange={onTermChange}
      />

      {/* Class Info */}
      {selectedClass && selectedTerm && (
        <div className="rounded-lg border bg-white p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Class</span>
              <p className="text-lg font-semibold">{selectedClassName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Term</span>
              <p className="text-lg font-semibold">{selectedTermName}</p>
            </div>
            {currentResult?.position && (
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Position in Class
                </span>
                <p className="text-lg font-semibold">{currentResult.position}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Download Button */}
      {selectedClass && selectedTerm && currentResult && (
        <div className="flex justify-end">
          <DownloadButton
            result={currentResult}
            studentId={studentId}
            className={selectedClassName}
            term={selectedTermName}
          />
        </div>
      )}

      {/* Overall Summary */}
      {selectedClass && selectedTerm && currentResult && (
        <OverallSummary result={currentResult} />
      )}

      {/* Results Table */}
      {selectedClass && selectedTerm && (
        <ResultsTable result={currentResult} isLoading={isLoading} />
      )}

      {/* Class Statistics */}
      {selectedClass && selectedTerm && classStatistics && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <span className="text-sm font-medium text-gray-500">Highest Score</span>
            <p className="text-2xl font-bold">{classStatistics.highest_score}</p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <span className="text-sm font-medium text-gray-500">Class Average</span>
            <p className="text-2xl font-bold">
              {classStatistics.class_average.toFixed(1)}
            </p>
          </div>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <span className="text-sm font-medium text-gray-500">Lowest Score</span>
            <p className="text-2xl font-bold">{classStatistics.lowest_score}</p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
            <span className="text-sm font-medium text-gray-500">Total Students</span>
            <p className="text-2xl font-bold">{classStatistics.total_students}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!selectedClass || !selectedTerm) && (
        <EmptyState
          title="Select Class and Term"
          description="Please select a class and term to view your results."
        />
      )}

      {selectedClass && selectedTerm && !currentResult && !isLoading && (
        <EmptyState
          title="No Results Found"
          description={`No results available for ${selectedClassName} in ${selectedTermName}.`}
        />
      )}
    </div>
  )
}

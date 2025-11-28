// src/app/(portal)/parent/results/_components/parent-results-view.tsx
"use client"

import { Class, Term, Grade } from "@/types/result"
import { FilterSection } from "./filter-section"
import { DownloadButton } from "./download-button"
import { ResultsTable } from "./results-table"
import { TeacherComment } from "./teacher-comment"

interface ParentResultsViewProps {
  classes: Class[]
  terms: Term[]
  results: Grade[]
  selectedClass: string
  selectedTerm: string
  onClassChange: (classId: string) => void
  onTermChange: (termId: string) => void
  isLoading: boolean
}

export function ParentResultsView({
  classes,
  terms,
  results,
  selectedClass,
  selectedTerm,
  onClassChange,
  onTermChange,
  isLoading,
}: ParentResultsViewProps) {
  const selectedClassName = classes.find((c) => c.id === selectedClass)?.name || "-"
  const selectedTermName = terms.find((t) => t.id === selectedTerm)?.name || "-"

  return (
    <div className="space-y-6">
      {/* Class Info */}
      {selectedClass && selectedTerm && (
        <div className="rounded-lg border bg-white p-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
            <div>
              <span className="text-sm font-medium text-gray-500">Class</span>
              <p className="text-lg font-semibold">{selectedClassName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Term</span>
              <p className="text-lg font-semibold">{selectedTermName}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <FilterSection
        classes={classes}
        terms={terms}
        selectedClass={selectedClass}
        selectedTerm={selectedTerm}
        onClassChange={onClassChange}
        onTermChange={onTermChange}
      />

      {/* Download Button */}
      {selectedClass && selectedTerm && (
        <div className="flex justify-end">
          <DownloadButton
            results={results}
            className={selectedClassName}
            term={selectedTermName}
          />
        </div>
      )}

      {/* Results Table */}
      {selectedClass && selectedTerm && (
        <ResultsTable results={results} isLoading={isLoading} />
      )}

      {/* Teacher Comment */}
      {selectedClass && selectedTerm && results.length > 0 && (
        <TeacherComment results={results} />
      )}

      {/* Empty State */}
      {!selectedClass || !selectedTerm ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="mx-auto max-w-md">
            <h3 className="text-lg font-semibold text-gray-900">Select class and term</h3>
            <p className="mt-2 text-gray-600">
              Please select a class and term to view results.
            </p>
          </div>
        </div>
      ) : (
        results.length === 0 &&
        !isLoading && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="mx-auto max-w-md">
              <h3 className="text-lg font-semibold text-gray-900">No results found</h3>
              <p className="mt-2 text-gray-600">
                No results available for the selected class and term.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  )
}

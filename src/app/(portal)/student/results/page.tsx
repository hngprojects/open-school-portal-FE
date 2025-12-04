// File: app/(portal)/student/results/page.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/hooks/use-auth"
import { StudentResultsView } from "./_components/student-results-view"
import {
  useGetStudentClasses,
  useGetTerms,
  useGetStudentResults,
} from "./_hooks/use-student-results"

export default function StudentResultsPage() {
  const { user } = useAuth() // Get authenticated user
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedTerm, setSelectedTerm] = useState<string>("")
  const initializedRef = useRef(false)

  // Get student ID from auth context
  const studentId = user?.id || ""
  const studentName = user?.name || "Student"

  const { data: classes = [], isLoading: isLoadingClasses } =
    useGetStudentClasses(studentId)
  const { data: terms = [], isLoading: isLoadingTerms } = useGetTerms()

  const { data: resultsData, isLoading: isLoadingResults } = useGetStudentResults(
    studentId,
    selectedTerm ? { term_id: selectedTerm } : undefined
  )

  // Use derived state
  const autoSelectedClass = classes.length > 0 ? classes[0].id : ""
  const autoSelectedTerm = terms.length > 0 ? terms[0].id : ""

  // Initialize selections on mount
  useEffect(() => {
    // Skip if already initialized
    if (initializedRef.current) return

    // Set initial selections when data is available
    if (classes.length > 0 && terms.length > 0) {
      // Use setTimeout to defer state updates to next tick
      const timer = setTimeout(() => {
        setSelectedClass(autoSelectedClass)
        setSelectedTerm(autoSelectedTerm)
        initializedRef.current = true
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [classes.length, terms.length, autoSelectedClass, autoSelectedTerm])

  // Filter results by selected class
  const filteredResults = (resultsData?.data || []).filter(
    (result) => !selectedClass || result.class_id === selectedClass
  )

  const isLoading = isLoadingClasses || isLoadingTerms || isLoadingResults

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
          <p className="text-gray-600">
            View and download your academic results, {studentName}
          </p>
        </div>

        <StudentResultsView
          studentId={studentId}
          classes={classes}
          terms={terms}
          results={filteredResults}
          selectedClass={selectedClass}
          selectedTerm={selectedTerm}
          onClassChange={setSelectedClass}
          onTermChange={setSelectedTerm}
          isLoading={isLoading}
          classStatistics={resultsData?.class_statistics}
        />
      </div>
    </div>
  )
}

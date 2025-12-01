"use client"

import { useState } from "react"
import { StudentResultsView } from "./_components/student-results-view"
import {
  useGetClasses,
  useGetTerms,
  useGetStudentResults,
} from "./_hooks/use-student-results"

export default function StudentResultsPage() {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("")

  // In a real app, you would get this from auth context
  const studentId = "1" // This should come from user context

  const { data: classes = [] } = useGetClasses()
  const { data: terms = [] } = useGetTerms()
  const { data: results = [], isLoading } = useGetStudentResults(studentId, selectedTerm)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
          <p className="text-gray-600">View and download your academic results</p>
        </div>

        <StudentResultsView
          classes={classes}
          terms={terms}
          results={results}
          selectedClass={selectedClass}
          selectedTerm={selectedTerm}
          onClassChange={setSelectedClass}
          onTermChange={setSelectedTerm}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

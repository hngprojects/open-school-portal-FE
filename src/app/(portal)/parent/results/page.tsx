"use client"

import { useState } from "react"
import { ParentResultsView } from "./_components/parent-results-view"
import {
  useGetClasses,
  useGetTerms,
  useGetStudentResults,
} from "./_hooks/use-parent-results"

export default function ParentResultsPage() {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("")

  const { data: classes = [] } = useGetClasses()
  const { data: terms = [] } = useGetTerms()
  const { data: results = [], isLoading } = useGetStudentResults(
    selectedClass,
    selectedTerm
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Student Results</h1>
          <p className="text-gray-600">View and download your childs academic results</p>
        </div>

        <ParentResultsView
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

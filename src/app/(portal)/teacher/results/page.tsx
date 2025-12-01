"use client"

import { useState, useEffect } from "react"
import { TeacherResultsView } from "../_components/teacher-results-view"
import {
  useGetClasses,
  useGetSubjects,
  useGetTerms,
  useGetStudents,
  useGetGradingScale,
} from "../_hooks/use-results"

export default function TeacherResultsPage() {
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedTerm, setSelectedTerm] = useState<string>("")

  const { data: classes = [] } = useGetClasses()
  const { data: subjects = [] } = useGetSubjects()
  const { data: terms = [] } = useGetTerms()
  const { data: students = [], isLoading: isLoadingStudents } =
    useGetStudents(selectedClass)
  const { data: gradingScale = [] } = useGetGradingScale()

  // Reset students when class changes
  useEffect(() => {
    if (selectedClass) {
      // Students will be automatically fetched by the hook
    }
  }, [selectedClass])

  // Convert to boolean explicitly
  const canShowResults = Boolean(selectedClass && selectedSubject && selectedTerm)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Result Management</h1>
          <p className="text-gray-600">Enter and manage student results</p>
        </div>

        <TeacherResultsView
          classes={classes}
          subjects={subjects}
          terms={terms}
          students={students}
          gradingScale={gradingScale}
          selectedClass={selectedClass}
          selectedSubject={selectedSubject}
          selectedTerm={selectedTerm}
          onClassChange={setSelectedClass}
          onSubjectChange={setSelectedSubject}
          onTermChange={setSelectedTerm}
          isLoadingStudents={isLoadingStudents}
          canShowResults={canShowResults}
        />
      </div>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { TeacherResultsView } from "../_components/teacher-results-view"
import {
  useGetClasses,
  useGetSubjects,
  useGetTerms,
  useGetStudents,
  useGetGradingScale,
  useGetTeacherSubmissions,
} from "../_hooks/use-results"

export default function TeacherResultsPage() {
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedTerm, setSelectedTerm] = useState<string>("")

  const { data: classes = [] } = useGetClasses()
  const { data: subjects = [] } = useGetSubjects(selectedClass)
  const { data: terms = [] } = useGetTerms()
  const { data: students = [], isLoading: isLoadingStudents } = useGetStudents(
    selectedClass || undefined,
    selectedSubject || undefined
  )
  const { data: gradingScale = [] } = useGetGradingScale()
  const { data: submissions = [] } = useGetTeacherSubmissions({
    class_id: selectedClass || undefined,
    subject_id: selectedSubject || undefined,
    term_id: selectedTerm || undefined,
  })

  // Use useMemo instead of useEffect for derived state
  const showAllStudents = useMemo(() => {
    return !selectedClass && !selectedSubject && !selectedTerm
  }, [selectedClass, selectedSubject, selectedTerm])

  // Find existing submission for the selected filters
  const existingSubmission = useMemo(() => {
    return submissions.find(
      (sub) =>
        sub.class_id === selectedClass &&
        sub.subject_id === selectedSubject &&
        sub.term_id === selectedTerm
    )
  }, [submissions, selectedClass, selectedSubject, selectedTerm])

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
          existingSubmission={existingSubmission}
          showAllStudents={showAllStudents}
        />
      </div>
    </div>
  )
}

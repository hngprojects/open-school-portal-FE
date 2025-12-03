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

interface Class {
  id: string
  name: string
  academic_session_id: string
}

export default function TeacherResultsPage() {
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedTerm, setSelectedTerm] = useState<string>("")

  const { data: classes = [] } = useGetClasses()
  const { data: subjects = [] } = useGetSubjects(selectedClass)
  const { data: terms = [] } = useGetTerms()

  const { data: students = [], isLoading: isLoadingStudents } = useGetStudents(
    selectedClass,
    selectedSubject
  )

  const { data: gradingScale = [] } = useGetGradingScale()
  const { data: submissions = [] } = useGetTeacherSubmissions({
    class_id: selectedClass || undefined,
    subject_id: selectedSubject || undefined,
    term_id: selectedTerm || undefined,
  })

  // Handle class change with subject/term reset and persistence
  const handleClassChange = (classId: string) => {
    setSelectedClass(classId)
    if (typeof window !== "undefined") {
      localStorage.setItem("results_selectedClass", classId)
    }

    // Reset subject and term when class changes
    setSelectedSubject("")
    setSelectedTerm("")

    if (typeof window !== "undefined") {
      localStorage.setItem("results_selectedSubject", "")
      localStorage.setItem("results_selectedTerm", "")
    }
  }

  // Handle subject change with persistence
  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId)
    if (typeof window !== "undefined") {
      localStorage.setItem("results_selectedSubject", subjectId)
    }
  }

  // Handle term change with persistence
  const handleTermChange = (termId: string) => {
    setSelectedTerm(termId)
    if (typeof window !== "undefined") {
      localStorage.setItem("results_selectedTerm", termId)
    }
  }

  // Use useMemo for derived state - Show students if class is selected
  const showAllStudents = useMemo(() => {
    return !!selectedClass
  }, [selectedClass])

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

  // Get academic session ID from selected class
  const academicSessionId = useMemo(() => {
    const selectedClassObj = classes.find((c) => c.id === selectedClass)
    // Use proper type instead of 'any'
    const classWithSession = selectedClassObj as Class & { academic_session_id?: string }
    return classWithSession?.academic_session_id || ""
  }, [classes, selectedClass])

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
          onClassChange={handleClassChange}
          onSubjectChange={handleSubjectChange}
          onTermChange={handleTermChange}
          isLoadingStudents={isLoadingStudents}
          canShowResults={canShowResults}
          existingSubmission={existingSubmission}
          showAllStudents={showAllStudents}
          academicSessionId={academicSessionId}
        />
      </div>
    </div>
  )
}

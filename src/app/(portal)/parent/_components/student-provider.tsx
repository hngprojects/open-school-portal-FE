"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useGetParentStudents } from "../_hooks/use-parent-students"
import { Student } from "@/lib/parents/client"

interface StudentContextParams {
  studentID?: string
  selectedStudent?: Student
  students: Student[]
  setSelectedStudentID: (id: string) => void
  isLoading: boolean
}

const StudentContext = createContext<StudentContextParams | null>(null)

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: students, isLoading, isError } = useGetParentStudents()
  const [_selectedID, setSelectedID] = useState<string>()
  const selectedID = _selectedID ?? (students && students?.[0]?.id)

  const data = {
    studentID: selectedID,
    selectedStudent: students && students.find((std) => std.id === selectedID),
    students: students || [],
    setSelectedStudentID: handleSelectStudent,
    isLoading,
  }

  return <StudentContext.Provider value={data}>{children}</StudentContext.Provider>

  function handleSelectStudent(studentID: string) {
    setSelectedID(studentID)
  }
}

export const useParentStudents = () => {
  const context = useContext(StudentContext)
  if (!context) {
    throw new Error("useParentStudents must be used within a SetupStepProvider")
  }
  return context
}

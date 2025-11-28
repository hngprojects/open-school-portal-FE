"use client"

import { useState } from "react"
import { Student, Grade } from "@/types/result"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Loader2 } from "lucide-react"
import { GradeFormDialog } from "./grade-form-dialog"
import { useGetStudentGrades } from "../_hooks/use-results"

interface StudentsTableProps {
  students: Student[]
  classId: string
  subjectId: string
  termId: string
  isLoading: boolean
}

export function StudentsTable({
  students,
  classId,
  subjectId,
  termId,
  isLoading,
}: StudentsTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student)
    setIsFormOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>CA Score</TableHead>
                  <TableHead>Exam Score</TableHead>
                  <TableHead className="hidden lg:table-cell">Grade</TableHead>
                  <TableHead>Total Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <StudentTableRow
                    key={student.id}
                    student={student}
                    classId={classId}
                    subjectId={subjectId}
                    termId={termId}
                    onEditClick={handleEditClick}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <GradeFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        student={selectedStudent}
        classId={classId}
        subjectId={subjectId}
        termId={termId}
      />
    </>
  )
}

interface StudentTableRowProps {
  student: Student
  classId: string
  subjectId: string
  termId: string
  onEditClick: (student: Student) => void
}

function StudentTableRow({
  student,
  classId,
  subjectId,
  termId,
  onEditClick,
}: StudentTableRowProps) {
  const { data: grade } = useGetStudentGrades(student.id, classId, subjectId, termId)

  const displayValue = (value: number | string | null | undefined) => {
    if (value === null || value === undefined) return "-"
    return value
  }

  // Type guard to check if grade exists and has the required properties
  const hasGradeData = (gradeData: unknown): gradeData is Grade => {
    return typeof gradeData === "object" && gradeData !== null
  }

  return (
    <TableRow>
      <TableCell className="font-medium">
        {student.first_name} {student.last_name}
      </TableCell>
      <TableCell>{hasGradeData(grade) ? displayValue(grade.ca_score) : "-"}</TableCell>
      <TableCell>{hasGradeData(grade) ? displayValue(grade.exam_score) : "-"}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {hasGradeData(grade) ? displayValue(grade.grade) : "-"}
      </TableCell>
      <TableCell>{hasGradeData(grade) ? displayValue(grade.total_score) : "-"}</TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEditClick(student)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

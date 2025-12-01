"use client"

import { useState } from "react"
import { Student, GradeEntry } from "@/types/result"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Edit } from "lucide-react"
import { GradeFormDialog } from "./grade-form-dialog"

interface StudentsTableProps {
  students: Student[]
  grades: Record<string, GradeEntry>
  onGradeUpdate: (studentId: string, updatedGrade: GradeEntry) => void
  isLoading: boolean
  classId: string
  subjectId: string
  termId: string
}

export function StudentsTable({
  students,
  grades,
  onGradeUpdate,
  isLoading,
  classId,
  subjectId,
  termId,
}: StudentsTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  const handleSaveGrade = (studentId: string, gradeData: GradeEntry) => {
    onGradeUpdate(studentId, gradeData)
    setDialogOpen(false)
    setSelectedStudent(null)
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="text-center">CA (30)</TableHead>
                  <TableHead className="text-center">Exam (70)</TableHead>
                  <TableHead className="text-center">Total (100)</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="hidden md:table-cell">Comment</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, index) => {
                  const grade = grades[student.id]
                  return (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {student.first_name} {student.last_name}
                      </TableCell>
                      <TableCell className="text-center">
                        {grade?.ca_score ?? "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {grade?.exam_score ?? "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {grade?.total_score ?? "-"}
                      </TableCell>
                      <TableCell className="text-center">{grade?.grade ?? "-"}</TableCell>
                      <TableCell className="hidden max-w-[200px] truncate md:table-cell">
                        {grade?.comment || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(student)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedStudent && (
        <GradeFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          student={selectedStudent}
          grade={grades[selectedStudent.id]}
          classId={classId}
          subjectId={subjectId}
          termId={termId}
          onSave={(data) => handleSaveGrade(selectedStudent.id, data)}
        />
      )}
    </>
  )
}

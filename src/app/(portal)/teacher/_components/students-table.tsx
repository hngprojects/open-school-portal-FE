"use client"

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
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface StudentsTableProps {
  students: Student[]
  grades: Record<string, GradeEntry>
  onGradeUpdate: (studentId: string, field: keyof GradeEntry, value: string) => void
  isLoading: boolean
}

export function StudentsTable({
  students,
  grades,
  onGradeUpdate,
  isLoading,
}: StudentsTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S/N</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Reg No</TableHead>
                <TableHead>CA (0-30)</TableHead>
                <TableHead>Exam (0-70)</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <StudentTableRow
                  key={student.id}
                  student={student}
                  index={index}
                  grade={grades[student.id]}
                  onGradeUpdate={onGradeUpdate}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

interface StudentTableRowProps {
  student: Student
  index: number
  grade?: GradeEntry
  onGradeUpdate: (studentId: string, field: keyof GradeEntry, value: string) => void
}

function StudentTableRow({ student, index, grade, onGradeUpdate }: StudentTableRowProps) {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="font-medium">
        {student.first_name} {student.last_name}
      </TableCell>
      <TableCell>{student.registration_number || "-"}</TableCell>

      {/* CA Score */}
      <TableCell>
        <Input
          type="number"
          min="0"
          max="30"
          value={grade?.ca_score ?? ""}
          onChange={(e) => onGradeUpdate(student.id, "ca_score", e.target.value)}
          className="w-20"
          placeholder="0-30"
        />
      </TableCell>

      {/* Exam Score */}
      <TableCell>
        <Input
          type="number"
          min="0"
          max="70"
          value={grade?.exam_score ?? ""}
          onChange={(e) => onGradeUpdate(student.id, "exam_score", e.target.value)}
          className="w-20"
          placeholder="0-70"
        />
      </TableCell>

      {/* Total (auto-calculated) */}
      <TableCell>{grade?.total_score ?? "-"}</TableCell>

      {/* Grade (auto-calculated) */}
      <TableCell>{grade?.grade ?? "-"}</TableCell>

      {/* Comment */}
      <TableCell>
        <Input
          value={grade?.comment ?? ""}
          onChange={(e) => onGradeUpdate(student.id, "comment", e.target.value)}
          className="w-32"
          placeholder="Comment"
        />
      </TableCell>
    </TableRow>
  )
}

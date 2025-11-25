"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { SnakeUser as User } from "@/types/user"
import { getInitials } from "@/lib/utils"

interface SelectedStudent {
  student: User
  relationship: string
}

interface LinkStudentsTableProps {
  students: User[]
  selectedStudents: SelectedStudent[]
  onStudentSelect: (student: User, selected: boolean) => void
  onRelationshipChange: (studentId: string, relationship: string) => void
  isLoading?: boolean
}

const relationshipOptions = [
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "guardian", label: "Guardian" },
  { value: "other", label: "Other" },
]

export default function LinkStudentsTable({
  students,
  selectedStudents,
  onStudentSelect,
  onRelationshipChange,
  isLoading = false,
}: LinkStudentsTableProps) {
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set())

  const toggleDropdown = (studentId: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(studentId)) {
        newSet.delete(studentId)
      } else {
        newSet.add(studentId)
      }
      return newSet
    })
  }

  const getRelationshipLabel = (relationship: string) => {
    return (
      relationshipOptions.find((opt) => opt.value === relationship)?.label || relationship
    )
  }

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">S/N</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Reg Number</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Relationship</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="h-4 w-4 rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                    <div className="h-4 w-42 rounded bg-gray-200" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="h-8 w-24 rounded bg-gray-200" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className="rounded-md border py-8 text-center">
        <p className="text-gray-500">No students found.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <span className="sr-only">Select</span>
            </TableHead>
            <TableHead className="w-12">S/N</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Reg Number</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Relationship</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => {
            const isSelected = selectedStudents.some((s) => s.student.id === student.id)
            const selectedData = selectedStudents.find((s) => s.student.id === student.id)

            return (
              <TableRow key={student.id} className={isSelected ? "bg-blue-50" : ""}>
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      onStudentSelect(student, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={student.avatar}
                        alt={`${student.first_name} ${student.last_name}`}
                      />
                      <AvatarFallback>
                        {getInitials(student.first_name, student.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {student.first_name} {student.last_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{student.reg_number}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  {isSelected ? (
                    <DropdownMenu
                      open={openDropdowns.has(student.id)}
                      onOpenChange={() => toggleDropdown(student.id)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-32 justify-between"
                        >
                          {getRelationshipLabel(selectedData?.relationship || "father")}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {relationshipOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() => onRelationshipChange(student.id, option.value)}
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

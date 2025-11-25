"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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

interface LinkStudentsGridProps {
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

export default function LinkStudentsGrid({
  students,
  selectedStudents,
  onStudentSelect,
  onRelationshipChange,
  isLoading = false,
}: LinkStudentsGridProps) {
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
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 rounded bg-gray-200" />
                  <div className="h-3 w-1/4 rounded bg-gray-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No students found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {students.map((student) => {
        const isSelected = selectedStudents.some((s) => s.student.id === student.id)
        const selectedData = selectedStudents.find((s) => s.student.id === student.id)

        return (
          <Card
            key={student.id}
            className={isSelected ? "border-blue-200 bg-blue-50" : ""}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    onStudentSelect(student, checked as boolean)
                  }
                  className="mt-1"
                />

                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={student.avatar}
                    alt={`${student.first_name} ${student.last_name}`}
                  />
                  <AvatarFallback>
                    {getInitials(student.first_name, student.last_name)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">
                    {student.first_name} {student.last_name}
                  </h3>
                  <p className="truncate text-sm text-gray-600">{student.reg_number}</p>
                  <p className="text-sm text-gray-600">{student.class}</p>

                  {isSelected && (
                    <div className="mt-3">
                      <DropdownMenu
                        open={openDropdowns.has(student.id)}
                        onOpenChange={() => toggleDropdown(student.id)}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-between"
                          >
                            {getRelationshipLabel(selectedData?.relationship || "father")}
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-full">
                          {relationshipOptions.map((option) => (
                            <DropdownMenuItem
                              key={option.value}
                              onClick={() =>
                                onRelationshipChange(student.id, option.value)
                              }
                            >
                              {option.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

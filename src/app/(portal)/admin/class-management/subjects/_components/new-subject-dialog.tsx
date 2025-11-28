"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { useState } from "react"

interface Subject {
  id: string
  name: string
//   department: string
}

// interface Department {
//   id: string
//   name: string
// }

// const mockDepartments: Department[] = [
//   { id: "1", name: "Science Department" },
//   { id: "2", name: "Arts Department" },
//   { id: "3", name: "Commercial Department" },
// ]

export default function NewSubjectDialog({
    open, setOpen, onSuccess
}: {
    open: boolean,
    setOpen: (open: boolean) => void
    onSuccess: (subject: string) => void
}) {
    const [formData, setFormData] = useState({
      department: "",
      subjectName: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Subjects</DialogTitle>
            <DialogDescription className="text-sm">
              Add a new subject to your school curriculum.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Department Select */}
            {/* <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Department
              </label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {mockDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            {/* Subject Name Input */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Subject Name
              </label>
              <Input
                type="text"
                placeholder="Enter Subject name, eg Biology"
                value={formData.subjectName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subjectName: e.target.value }))
                }
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              onClick={handleCreateSubject}
              disabled={isSubmitting || !formData.department || !formData.subjectName}
              className="w-full"
            >
              {isSubmitting ? "Creating..." : "Create Subject"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
        </Dialog>
    )

    async function handleCreateSubject() {
      setIsSubmitting(true)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
  
      // Add new subject to list
      const newSubject: Subject = {
        id: Date.now().toString(),
        name: formData.subjectName,
        // department: mockDepartments.find((d) => d.id === formData.department)?.name || "",
      }
  
      // Reset form
      setFormData({ department: "", subjectName: "" })
      setIsSubmitting(false)
      setOpen(false);
      onSuccess(formData.subjectName);
    }
}
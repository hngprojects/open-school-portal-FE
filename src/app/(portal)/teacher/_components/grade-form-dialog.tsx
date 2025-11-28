"use client"

import { useState } from "react"
import { Student } from "@/types/result"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useSaveGrade } from "../_hooks/use-results"
import { SuccessModal } from "@/components/classrooms/success-modal"

interface GradeFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: Student | null
  classId: string
  subjectId: string
  termId: string
}

export function GradeFormDialog({
  open,
  onOpenChange,
  student,
  classId,
  subjectId,
  termId,
}: GradeFormDialogProps) {
  const [formData, setFormData] = useState({
    ca_score: "",
    exam_score: "",
    total_score: "",
    grade: "",
    comment: "",
  })
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  const saveGradeMutation = useSaveGrade()

  const handleSave = async () => {
    if (!student) return

    const gradeData = {
      student_id: student.id,
      class_id: classId,
      subject_id: subjectId,
      term_id: termId,
      ca_score: formData.ca_score ? parseInt(formData.ca_score) : null,
      exam_score: formData.exam_score ? parseInt(formData.exam_score) : null,
      total_score: formData.total_score ? parseInt(formData.total_score) : null,
      grade: formData.grade || null,
      comment: formData.comment || null,
    }

    try {
      await saveGradeMutation.mutateAsync(gradeData)
      setSuccessModalOpen(true)
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save grade:", error)
    }
  }

  const calculateTotal = () => {
    const ca = parseInt(formData.ca_score) || 0
    const exam = parseInt(formData.exam_score) || 0
    return ca + exam
  }

  const handleCaScoreChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      ca_score: value,
      total_score: calculateTotal().toString(),
    }))
  }

  const handleExamScoreChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      exam_score: value,
      total_score: calculateTotal().toString(),
    }))
  }

  if (!student) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Enter Grades for {student.first_name} {student.last_name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ca_score">CA Score</Label>
                <Input
                  id="ca_score"
                  type="number"
                  min="0"
                  max="30"
                  value={formData.ca_score}
                  onChange={(e) => handleCaScoreChange(e.target.value)}
                  placeholder="0-30"
                />
              </div>

              <div>
                <Label htmlFor="exam_score">Exam Score</Label>
                <Input
                  id="exam_score"
                  type="number"
                  min="0"
                  max="70"
                  value={formData.exam_score}
                  onChange={(e) => handleExamScoreChange(e.target.value)}
                  placeholder="0-70"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="total_score">Total Score</Label>
                <Input
                  id="total_score"
                  type="number"
                  value={formData.total_score}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div>
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, grade: e.target.value }))
                  }
                  placeholder="A, B, C..."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, comment: e.target.value }))
                }
                placeholder="Additional comments..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saveGradeMutation.isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saveGradeMutation.isPending}>
              {saveGradeMutation.isPending ? "Saving..." : "Save Grade"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title="Grade Saved Successfully"
        description="The student's grade has been saved successfully."
      />
    </>
  )
}

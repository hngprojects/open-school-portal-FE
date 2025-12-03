"use client"

import { useState, useMemo } from "react"
import { Student, GradeEntry } from "@/types/result"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { calculateGrade } from "@/lib/results"
import { useSaveDraft } from "../_hooks/use-results"
import { toast } from "sonner"

interface GradeFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: Student
  grade?: GradeEntry
  onSave: (gradeData: GradeEntry) => void
  classId: string
  subjectId: string
  termId: string
  academicSessionId: string
  existingSubmissionId?: string
}

export function GradeFormDialog({
  open,
  onOpenChange,
  student,
  grade,
  onSave,
  classId,
  subjectId,
  termId,
  academicSessionId,
  existingSubmissionId,
}: GradeFormDialogProps) {
  const [formData, setFormData] = useState({
    ca_score: grade?.ca_score?.toString() || "",
    exam_score: grade?.exam_score?.toString() || "",
    comment: grade?.comment || "",
  })

  const saveDraftMutation = useSaveDraft()

  const total = useMemo(() => {
    const ca = parseInt(formData.ca_score) || 0
    const exam = parseInt(formData.exam_score) || 0
    return ca + exam
  }, [formData.ca_score, formData.exam_score])

  const gradeLetter = useMemo(() => {
    return total > 0 ? calculateGrade(total) : ""
  }, [total])

  const handleSaveToBackend = async () => {
    try {
      if (!academicSessionId) {
        toast.error("Academic session ID is required")
        return
      }

      const caScore = formData.ca_score ? parseInt(formData.ca_score) : null
      const examScore = formData.exam_score ? parseInt(formData.exam_score) : null

      const submissionData = {
        class_id: classId,
        subject_id: subjectId,
        term_id: termId,
        academic_session_id: academicSessionId,
        grades: [
          {
            student_id: student.id,
            ca_score: caScore,
            exam_score: examScore,
            comment: formData.comment || null,
          },
        ],
      }

      await saveDraftMutation.mutateAsync(submissionData)

      // Also update local state
      const totalScore =
        caScore !== null && examScore !== null ? caScore + examScore : null
      const gradeData: GradeEntry = {
        student_id: student.id,
        ca_score: caScore,
        exam_score: examScore,
        total_score: totalScore,
        grade: totalScore !== null ? calculateGrade(totalScore) : null,
        comment: formData.comment || null,
      }

      onSave(gradeData)
      toast.success("Grade saved successfully")
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to save grade")
    }
  }

  const handleSubmit = () => {
    const caScore = formData.ca_score ? parseInt(formData.ca_score) : null
    const examScore = formData.exam_score ? parseInt(formData.exam_score) : null
    const totalScore = caScore !== null && examScore !== null ? caScore + examScore : null

    const gradeData: GradeEntry = {
      student_id: student.id,
      ca_score: caScore,
      exam_score: examScore,
      total_score: totalScore,
      grade: totalScore !== null ? calculateGrade(totalScore) : null,
      comment: formData.comment || null,
    }

    onSave(gradeData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Grades</DialogTitle>
          <div className="text-sm text-gray-600">
            {student.first_name} {student.last_name}
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ca_score">CA Score (0-30)</Label>
              <Input
                id="ca_score"
                type="number"
                min="0"
                max="30"
                value={formData.ca_score}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ca_score: e.target.value }))
                }
                placeholder="Enter CA score"
              />
            </div>

            <div>
              <Label htmlFor="exam_score">Exam Score (0-70)</Label>
              <Input
                id="exam_score"
                type="number"
                min="0"
                max="70"
                value={formData.exam_score}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, exam_score: e.target.value }))
                }
                placeholder="Enter exam score"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Total Score</Label>
              <div className="flex h-10 items-center justify-center rounded-md border bg-gray-50">
                <span className="font-semibold">{total}</span>
              </div>
            </div>

            <div>
              <Label>Grade</Label>
              <div className="flex h-10 items-center justify-center rounded-md border bg-gray-50">
                <span className="font-semibold">{gradeLetter || "-"}</span>
              </div>
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
              placeholder="Enter comment..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveToBackend} disabled={saveDraftMutation.isPending}>
            {saveDraftMutation.isPending ? "Saving..." : "Save Grade"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

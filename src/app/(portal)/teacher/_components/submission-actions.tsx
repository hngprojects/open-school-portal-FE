"use client"

import { useState } from "react"
import { GradeEntry, GradeSubmission, Grade } from "@/types/result"
import { Button } from "@/components/ui/button"
import {
  useSaveDraft,
  useSubmitForApproval,
  useUpdateSubmission,
} from "../_hooks/use-results"
import { SuccessModal } from "@/components/results/success-modal"
import { toast } from "sonner"

interface SubmissionActionsProps {
  classId: string
  subjectId: string
  termId: string
  grades: GradeEntry[]
  existingSubmission?: GradeSubmission
  academicSessionId: string
}

export function SubmissionActions({
  classId,
  subjectId,
  termId,
  grades,
  existingSubmission,
  academicSessionId,
}: SubmissionActionsProps) {
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const saveDraftMutation = useSaveDraft()
  const submitMutation = useSubmitForApproval()
  const updateSubmissionMutation = useUpdateSubmission()

  const handleSaveDraft = async () => {
    try {
      if (!academicSessionId) {
        toast.error("Academic session ID is required")
        return
      }

      // Validate all grades have student_id
      const validGrades = grades.filter((grade) => {
        if (!grade.student_id || grade.student_id.trim() === "") {
          console.error("Grade missing student_id:", grade)
          return false
        }
        return true
      })

      if (validGrades.length === 0) {
        toast.error(
          "No valid grades to save. Please enter grades for at least one student."
        )
        return
      }

      const submissionData = {
        class_id: classId,
        subject_id: subjectId,
        term_id: termId,
        academic_session_id: academicSessionId,
        grades: validGrades.map((grade) => ({
          student_id: grade.student_id,
          ca_score: grade.ca_score,
          exam_score: grade.exam_score,
          comment: grade.comment || null,
        })),
      }

      if (existingSubmission?.id) {
        // Update existing submission
        await updateSubmissionMutation.mutateAsync({
          id: existingSubmission.id,
          data: {
            grades: validGrades.map((grade) => ({
              student_id: grade.student_id,
              ca_score: grade.ca_score,
              exam_score: grade.exam_score,
              total_score: grade.total_score,
              grade: grade.grade,
              comment: grade.comment,
              subject_id: subjectId,
              class_id: classId,
              term_id: termId,
            })) as Grade[],
          },
        })
      } else {
        // Create new submission
        await saveDraftMutation.mutateAsync(submissionData)
      }

      setSuccessMessage("Results saved as draft successfully!")
      setSuccessModalOpen(true)

      // Clear localStorage after successful save
      const storageKey = `grades_${classId}_${subjectId}_${termId}`
      localStorage.removeItem(storageKey)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to save draft")
      } else {
        toast.error("Failed to save draft")
      }
    }
  }

  const handleSubmitForApproval = async () => {
    try {
      if (!academicSessionId) {
        toast.error("Academic session ID is required")
        return
      }

      // Validate all grades have student_id
      const validGrades = grades.filter((grade) => {
        if (!grade.student_id || grade.student_id.trim() === "") {
          console.error("Grade missing student_id:", grade)
          return false
        }
        return true
      })

      if (validGrades.length === 0) {
        toast.error(
          "No valid grades to submit. Please enter grades for at least one student."
        )
        return
      }

      if (!existingSubmission?.id) {
        // First save as draft, then submit
        const submissionData = {
          class_id: classId,
          subject_id: subjectId,
          term_id: termId,
          academic_session_id: academicSessionId,
          grades: validGrades.map((grade) => ({
            student_id: grade.student_id,
            ca_score: grade.ca_score,
            exam_score: grade.exam_score,
            comment: grade.comment || null,
          })),
        }

        const draft = await saveDraftMutation.mutateAsync(submissionData)
        await submitMutation.mutateAsync(draft.id)
      } else {
        await submitMutation.mutateAsync(existingSubmission.id)
      }

      setSuccessMessage("Results submitted for approval successfully!")
      setSuccessModalOpen(true)

      // Clear localStorage after successful submission
      const storageKey = `grades_${classId}_${subjectId}_${termId}`
      localStorage.removeItem(storageKey)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to submit for approval")
      } else {
        toast.error("Failed to submit for approval")
      }
    }
  }

  const canSubmit =
    !existingSubmission ||
    (existingSubmission.status !== "approved" &&
      existingSubmission.status !== "submitted")

  return (
    <>
      <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:justify-end">
        <Button
          onClick={handleSaveDraft}
          disabled={saveDraftMutation.isPending || updateSubmissionMutation.isPending}
          variant="outline"
        >
          {saveDraftMutation.isPending || updateSubmissionMutation.isPending
            ? "Saving..."
            : "Save as Draft"}
        </Button>

        <Button
          onClick={handleSubmitForApproval}
          disabled={submitMutation.isPending || !canSubmit}
          className="bg-[#da3743]"
        >
          {submitMutation.isPending ? "Submitting..." : "Submit for Approval"}
        </Button>
      </div>

      <SuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title="Success"
        description={successMessage}
        buttonText="Continue"
      />
    </>
  )
}

// Update SubmissionActions to convert GradeEntry[] to Grade[]
"use client"

import { useState } from "react"
import { GradeEntry, GradeSubmission, Grade } from "@/types/result" // Add Grade import
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
}

export function SubmissionActions({
  classId,
  subjectId,
  termId,
  grades,
  existingSubmission,
}: SubmissionActionsProps) {
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const saveDraftMutation = useSaveDraft()
  const submitMutation = useSubmitForApproval()
  const updateSubmissionMutation = useUpdateSubmission()

  // Convert GradeEntry[] to Grade[] for the API
  const convertToGrades = (gradeEntries: GradeEntry[]): Partial<Grade>[] => {
    return gradeEntries.map((entry) => ({
      student_id: entry.student_id,
      ca_score: entry.ca_score,
      exam_score: entry.exam_score,
      total_score: entry.total_score,
      grade: entry.grade,
      comment: entry.comment,
      subject_id: subjectId,
      class_id: classId,
      term_id: termId,
    }))
  }

  const handleSaveDraft = async () => {
    try {
      const submissionData = {
        class_id: classId,
        subject_id: subjectId,
        term_id: termId,
        grades: grades.map((grade) => ({
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
            grades: convertToGrades(grades) as Grade[], // Type assertion
          },
        })
      } else {
        // Create new submission
        await saveDraftMutation.mutateAsync(submissionData)
      }

      setSuccessMessage("Results saved as draft successfully!")
      setSuccessModalOpen(true)
    } catch {
      toast.error("Failed to save draft")
    }
  }

  const handleSubmitForApproval = async () => {
    try {
      if (!existingSubmission?.id) {
        // First save as draft, then submit
        const submissionData = {
          class_id: classId,
          subject_id: subjectId,
          term_id: termId,
          grades: grades.map((grade) => ({
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
    } catch {
      toast.error("Failed to submit for approval")
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

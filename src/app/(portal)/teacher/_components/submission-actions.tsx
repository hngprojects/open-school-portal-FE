"use client"

import { useState, useMemo } from "react"
import { Grade, GradeEntry, GradeSubmission } from "@/types/result"
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
  submissionStatus?: GradeSubmission | null
  onSubmissionUpdate: () => void
}

export function SubmissionActions({
  classId,
  subjectId,
  termId,
  grades,
  submissionStatus,
  onSubmissionUpdate,
}: SubmissionActionsProps) {
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const saveDraftMutation = useSaveDraft()
  const submitMutation = useSubmitForApproval()
  const updateSubmissionMutation = useUpdateSubmission()

  const gradesForSubmission: Grade[] = useMemo(
    () =>
      grades.map((grade) => ({
        ...grade,
        class_id: classId,
        subject_id: subjectId,
        term_id: termId,
        total_score: grade.total_score ?? null,
        grade: grade.grade ?? null,
        comment: grade.comment ?? null,
      })),
    [grades, classId, subjectId, termId]
  )

  const handleSaveDraft = async () => {
    try {
      const submissionData = {
        class_id: classId,
        subject_id: subjectId,
        term_id: termId,
        grades: gradesForSubmission,
      }

      if (submissionStatus?.id) {
        // Update existing submission
        await updateSubmissionMutation.mutateAsync({
          id: submissionStatus.id,
          data: { grades: gradesForSubmission },
        })
      } else {
        // Create new submission
        await saveDraftMutation.mutateAsync(submissionData)
      }

      setSuccessMessage("Results saved as draft successfully!")
      setSuccessModalOpen(true)
      onSubmissionUpdate()
    } catch {
      toast.error("Failed to save draft")
    }
  }

  const handleSubmitForApproval = async () => {
    try {
      if (!submissionStatus?.id) {
        // First save as draft, then submit
        const submissionData = {
          class_id: classId,
          subject_id: subjectId,
          term_id: termId,
          grades: gradesForSubmission,
        }

        const draft = await saveDraftMutation.mutateAsync(submissionData)
        await submitMutation.mutateAsync(draft.id)
      } else {
        await submitMutation.mutateAsync(submissionStatus.id)
      }

      setSuccessMessage("Results submitted for approval successfully!")
      setSuccessModalOpen(true)
      onSubmissionUpdate()
    } catch {
      toast.error("Failed to submit for approval")
    }
  }

  const canSubmit =
    submissionStatus?.status !== "approved" && submissionStatus?.status !== "submitted"

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
          className="bg-blue-600 hover:bg-blue-700"
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

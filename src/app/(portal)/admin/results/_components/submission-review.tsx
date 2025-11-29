"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GradeSubmission } from "@/types/result"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import {
  DUMMY_CLASSES,
  DUMMY_SUBJECTS,
  DUMMY_TERMS,
  TEACHER_NAMES,
  DUMMY_STUDENTS,
} from "@/lib/dummy-data"
import { SuccessModal } from "@/components/results/success-modal"
import { RejectionModal } from "@/components/results/rejection-modal"
import { useApproveSubmission, useRejectSubmission } from "../_hooks/use-admin-results"
import { toast } from "sonner"

interface SubmissionReviewProps {
  submission: GradeSubmission
}

export function SubmissionReview({ submission }: SubmissionReviewProps) {
  const router = useRouter()
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const approveMutation = useApproveSubmission()
  const rejectMutation = useRejectSubmission()

  const teacherName = TEACHER_NAMES[submission.teacher_id] || "Unknown Teacher"
  const className =
    DUMMY_CLASSES.find((c) => c.id === submission.class_id)?.name || "Unknown Class"
  const subjectName =
    DUMMY_SUBJECTS.find((s) => s.id === submission.subject_id)?.name || "Unknown Subject"
  const termName =
    DUMMY_TERMS.find((t) => t.id === submission.term_id)?.name || "Unknown Term"

  const handleApprove = async () => {
    try {
      await approveMutation.mutateAsync(submission.id)
      setSuccessMessage("Submission approved successfully!")
      setSuccessModalOpen(true)
    } catch (error) {
      console.error("Failed to approve submission:", error)
      toast.error("Failed to approve submission")
    }
  }

  const handleReject = async (reason: string) => {
    try {
      await rejectMutation.mutateAsync({ id: submission.id, reason })
      setRejectionModalOpen(false)
      setSuccessMessage("Submission rejected successfully!")
      setSuccessModalOpen(true)
    } catch (error) {
      console.error("Failed to reject submission:", error)
      toast.error("Failed to reject submission")
    }
  }

  const handleSuccessClose = () => {
    setSuccessModalOpen(false)
    router.push("/admin/results")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="outline">Pending Review</Badge>
      case "approved":
        return <Badge variant="default">Approved</Badge>
      case "rejected":
        return <Badge variant="outline">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const isActionable = submission.status === "submitted"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Review Submission</h1>
        <p className="text-gray-600">Review and approve teacher-submitted results</p>
      </div>

      {/* Teacher Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{teacherName}</CardTitle>
              <div className="mt-4 space-y-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Class</span>
                    <p className="text-lg">{className}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Subject</span>
                    <p className="text-lg">{subjectName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Term</span>
                    <p className="text-lg">{termName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Date Submitted
                    </span>
                    <p className="text-lg">
                      {submission.submitted_at
                        ? format(new Date(submission.submitted_at), "MMM d, yyyy")
                        : "Not submitted"}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-sm font-medium text-gray-500">
                    Number of Students
                  </span>
                  <p className="text-lg">{submission.grades.length}</p>
                </div>
              </div>
            </div>
            {getStatusBadge(submission.status)}
          </div>
        </CardHeader>
      </Card>

      {/* Results Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Reg No</TableHead>
                  <TableHead className="text-center">CA (30)</TableHead>
                  <TableHead className="text-center">Exam (70)</TableHead>
                  <TableHead className="text-center">Total (100)</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead>Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submission.grades.map((grade) => {
                  const student = DUMMY_STUDENTS.find((s) => s.id === grade.student_id)
                  return (
                    <TableRow key={grade.student_id}>
                      <TableCell className="font-medium">
                        {student
                          ? `${student.first_name} ${student.last_name}`
                          : "Unknown Student"}
                      </TableCell>
                      <TableCell>{student?.registration_number || "-"}</TableCell>
                      <TableCell className="text-center">
                        {grade.ca_score ?? "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {grade.exam_score ?? "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {grade.total_score ?? "-"}
                      </TableCell>
                      <TableCell className="text-center">{grade.grade ?? "-"}</TableCell>
                      <TableCell>{grade.comment || "-"}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {isActionable && (
        <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:justify-end">
          <Button
            onClick={() => setRejectionModalOpen(true)}
            disabled={rejectMutation.isPending || approveMutation.isPending}
            variant="outline"
            className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 sm:w-auto"
          >
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            disabled={approveMutation.isPending || rejectMutation.isPending}
            className="bg-green-600 hover:bg-green-700 sm:w-auto"
          >
            {approveMutation.isPending ? "Approving..." : "Approve"}
          </Button>
        </div>
      )}

      <RejectionModal
        open={rejectionModalOpen}
        onOpenChange={setRejectionModalOpen}
        onReject={handleReject}
        isRejecting={rejectMutation.isPending}
      />

      <SuccessModal
        open={successModalOpen}
        onOpenChange={handleSuccessClose}
        title="Success"
        description={successMessage}
        buttonText="Back to Submissions"
      />
    </div>
  )
}

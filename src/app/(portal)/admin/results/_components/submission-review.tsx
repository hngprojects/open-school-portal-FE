"use client"

import { useState } from "react"
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

interface SubmissionReviewProps {
  submission: GradeSubmission
}

export function SubmissionReview({ submission }: SubmissionReviewProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const teacherName = TEACHER_NAMES[submission.teacher_id] || "Unknown Teacher"
  const className =
    DUMMY_CLASSES.find((c) => c.id === submission.class_id)?.name || "Unknown Class"
  const subjectName =
    DUMMY_SUBJECTS.find((s) => s.id === submission.subject_id)?.name || "Unknown Subject"
  const termName =
    DUMMY_TERMS.find((t) => t.id === submission.term_id)?.name || "Unknown Term"

  // Mock grades data for the submission
  const mockGrades = [
    { student_id: "7", ca_score: 18, exam_score: 30, total_score: 48, grade: "C" },
    { student_id: "7", ca_score: 27, exam_score: 51, total_score: 78, grade: "A" },
    { student_id: "7", ca_score: 20, exam_score: 45, total_score: 65, grade: "B" },
    { student_id: "7", ca_score: 18, exam_score: 30, total_score: 80, grade: "A" },
    { student_id: "7", ca_score: 18, exam_score: 30, total_score: 48, grade: "C" },
    { student_id: "7", ca_score: 40, exam_score: 30, total_score: 70, grade: "A" },
    { student_id: "7", ca_score: 18, exam_score: 30, total_score: 48, grade: "C" },
    { student_id: "7", ca_score: 18, exam_score: 30, total_score: 50, grade: "B" },
  ]

  const getStudentName = (studentId: string) => {
    const student = DUMMY_STUDENTS.find((s) => s.id === studentId)
    return student ? `${student.first_name} ${student.last_name}` : "Unknown Student"
  }

  const handleApprove = async () => {
    setIsApproving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccessMessage("Submission approved successfully!")
      setSuccessModalOpen(true)
    } catch (error) {
      console.error("Failed to approve submission:", error)
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    setIsRejecting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccessMessage("Submission rejected successfully!")
      setSuccessModalOpen(true)
    } catch (error) {
      console.error("Failed to reject submission:", error)
    } finally {
      setIsRejecting(false)
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Result Management</h1>
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
                  <p className="text-lg">{mockGrades.length}</p>
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
                  <TableHead>Student</TableHead>
                  <TableHead className="text-center">C.A. (30)</TableHead>
                  <TableHead className="text-center">Exam (70)</TableHead>
                  <TableHead className="text-center">Total (100)</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockGrades.map((grade, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {getStudentName(grade.student_id)}
                    </TableCell>
                    <TableCell className="text-center">{grade.ca_score}</TableCell>
                    <TableCell className="text-center">{grade.exam_score}</TableCell>
                    <TableCell className="text-center">{grade.total_score}</TableCell>
                    <TableCell className="text-center">
                      {/* <Badge 
                        variant={
                          grade.grade === "A" || grade.grade === "B" ? "default" : 
                          grade.grade === "C" ? "outline" : "outline"
                        }
                      >
                        {grade.grade}
                      </Badge> */}

                      {grade.grade}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" className="bg-blue-100">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:justify-end">
        <Button
          onClick={handleReject}
          disabled={isRejecting || isApproving || submission.status !== "submitted"}
          variant="outline"
          className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 sm:w-auto"
        >
          {isRejecting ? "Rejecting..." : "Reject"}
        </Button>
        <Button
          onClick={handleApprove}
          disabled={isApproving || isRejecting || submission.status !== "submitted"}
          className="bg-green-600 hover:bg-green-700 sm:w-auto"
        >
          {isApproving ? "Approving..." : "Approve"}
        </Button>
      </div>

      <SuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title="Success"
        description={successMessage}
        buttonText="Back to Submissions"
      />
    </div>
  )
}

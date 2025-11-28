"use client"

import { GradeSubmission } from "@/types/result"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface SubmissionCardProps {
  submission: GradeSubmission
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  const router = useRouter()

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "rejected":
        return "outline"
      case "pending":
        return "outline"
      default:
        return "outline"
    }
  }

  const handleReview = () => {
    router.push(`/admin/results/${submission.id}`)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {submission.grades[0]?.student_id ? "Multiple Students" : "Grade Submission"}
          </h3>
          <Badge variant={getStatusVariant(submission.status)}>
            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pb-3">
        <div className="text-sm">
          <span className="font-medium">Class:</span> {submission.class_id}
        </div>
        <div className="text-sm">
          <span className="font-medium">Subject:</span> {submission.subject_id}
        </div>
        <div className="text-sm">
          <span className="font-medium">Term:</span> {submission.term_id}
        </div>
        <div className="text-sm">
          <span className="font-medium">Students:</span> {submission.grades.length}
        </div>
        {submission.submitted_at && (
          <div className="text-sm text-gray-600">
            Submitted: {format(new Date(submission.submitted_at), "MMM d, yyyy")}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button onClick={handleReview} className="w-full">
          Review Submission
        </Button>
      </CardFooter>
    </Card>
  )
}

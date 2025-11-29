"use client"

import { GradeSubmission } from "@/types/result"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
  DUMMY_CLASSES,
  DUMMY_SUBJECTS,
  DUMMY_TERMS,
  TEACHER_NAMES,
} from "@/lib/dummy-data"

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
      case "submitted":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "submitted":
        return "Pending Review"
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  const teacherName = TEACHER_NAMES[submission.teacher_id] || "Unknown Teacher"
  const className =
    DUMMY_CLASSES.find((c) => c.id === submission.class_id)?.name || "Unknown Class"
  const subjectName =
    DUMMY_SUBJECTS.find((s) => s.id === submission.subject_id)?.name || "Unknown Subject"
  const termName =
    DUMMY_TERMS.find((t) => t.id === submission.term_id)?.name || "Unknown Term"

  const handleReview = () => {
    router.push(`/admin/results/${submission.id}`)
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{teacherName}</h3>
            <p className="text-sm text-gray-600">
              {className} • {subjectName}
            </p>
          </div>
          <Badge variant={getStatusVariant(submission.status)}>
            {getStatusText(submission.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pb-3">
        <div className="text-sm">
          <span className="font-medium">Term:</span> {termName}
        </div>
        <div className="text-sm">
          <span className="font-medium">Students:</span>{" "}
          {submission.grades.length || "Multiple"}
        </div>
        {submission.submitted_at && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Submitted:</span>{" "}
            {format(new Date(submission.submitted_at), "MMM d, yyyy")}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button onClick={handleReview} className="w-full" variant="outline">
          Review Submission
        </Button>
      </CardFooter>
    </Card>
  )
}

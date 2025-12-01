"use client"

import { Grade } from "@/types/result"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  results: Grade[]
  className: string
  term: string
}

export function DownloadButton({ results, className, term }: DownloadButtonProps) {
  const handleDownload = () => {
    // Implement PDF generation and download
    // This would integrate with a PDF generation service
    console.log("Downloading results...", { results, className, term })

    // For now, create a simple CSV download
    const csvContent = generateCSV(results)
    downloadCSV(csvContent, `results-${className}-${term}.csv`)
  }

  const generateCSV = (grades: Grade[]): string => {
    const headers = [
      "Subject",
      "CA Score",
      "Exam Score",
      "Total Score",
      "Grade",
      "Comment",
    ]
    const rows = grades.map((grade) => [
      grade.subject_id,
      grade.ca_score ?? "",
      grade.exam_score ?? "",
      grade.total_score ?? "",
      grade.grade ?? "",
      grade.comment ?? "",
    ])

    return [headers, ...rows].map((row) => row.join(",")).join("\n")
  }

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button onClick={handleDownload} className="gap-2">
      <Download className="h-4 w-4" />
      Download Result
    </Button>
  )
}

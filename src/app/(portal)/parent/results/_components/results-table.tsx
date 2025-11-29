"use client"

import { Grade } from "@/types/result"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ResultsTableProps {
  results: Grade[]
  isLoading: boolean
}

export function ResultsTable({ results, isLoading }: ResultsTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <p className="text-gray-600">No results found for the selected class and term.</p>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>CA Score</TableHead>
                <TableHead>Exam Score</TableHead>
                <TableHead>Total Score</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={`${result.subject_id}-${result.student_id}`}>
                  <TableCell className="font-medium">{result.subject_id}</TableCell>
                  <TableCell>{result.ca_score ?? "-"}</TableCell>
                  <TableCell>{result.exam_score ?? "-"}</TableCell>
                  <TableCell>{result.total_score ?? "-"}</TableCell>
                  <TableCell>{result.grade ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

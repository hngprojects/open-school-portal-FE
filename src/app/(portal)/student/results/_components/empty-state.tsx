// File: app/(portal)/student/results/_components/empty-state.tsx
"use client"

import { FileText } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <div className="mx-auto max-w-md">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </div>
  )
}

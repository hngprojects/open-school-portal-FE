"use client"

import { useState } from "react"
import { AdminResultsView } from "./_components/admin-results-view"
import { useGetSubmissions, useGetSubmissionStats } from "./_hooks/use-admin-results"

export default function AdminResultsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const { data: submissions = [], isLoading } = useGetSubmissions({
    search: searchQuery,
    status: statusFilter === "all" ? undefined : statusFilter,
  })
  const { data: stats } = useGetSubmissionStats()

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Result Management</h1>
          <p className="text-gray-600">
            Review and manage grade submissions from teachers
          </p>
        </div>

        <AdminResultsView
          submissions={submissions}
          stats={stats}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

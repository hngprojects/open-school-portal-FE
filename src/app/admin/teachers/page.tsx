// app/admin/teachers/page.tsx

"use client"

import { useEffect } from "react"
import { UsersView } from "@/components/users/users-view"
import { useTeacherStore } from "@/store/general-auth-store"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function TeachersPage() {
  const { teachers, fetchTeachers, loading, error, clearError } = useTeacherStore()

  useEffect(() => {
    fetchTeachers()
  }, [fetchTeachers])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />
          <p className="text-gray-600">Loading teachers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Failed to Load Teachers
          </h2>
          <p className="mb-6 text-gray-600">{error}</p>
          <div className="space-y-3">
            <Button
              onClick={() => {
                clearError()
                fetchTeachers()
              }}
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <details className="text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Troubleshooting Tips
              </summary>
              <ul className="mt-2 space-y-1 text-xs text-gray-600">
                <li>• Check if the API URL is correct in .env.local</li>
                <li>• Verify the API server is running</li>
                <li>• Check your internet connection</li>
                <li>• Look at browser console for more details</li>
                <li>• Verify authentication token if required</li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    )
  }

  return <UsersView users={teachers} userType="teachers" />
}

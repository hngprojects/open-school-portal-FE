"use client"

import React from "react"
import Link from "next/link"
import { toast } from "sonner"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import { Button } from "@/components/ui/button"
import { CircleAlert, ListFilter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import AcademicSessionTable from "./academic-session-table"
import AcademicSessionsMobile from "./academic-session-mobile"
import {
  useAcademicSessions,
  useActivateAcademicSession,
  useDeleteAcademicSession,
} from "../../class-management/_hooks/use-session"
import EmptyState from "../empty-state"

const SessionsPage = () => {
  const { data, isLoading, isError, error } = useAcademicSessions()
  const { mutate: activateSession, isPending: isActivating } =
    useActivateAcademicSession()
  const { mutate: deleteSession, isPending: isDeleting } = useDeleteAcademicSession()

  const isMutating = isActivating || isDeleting
  const sessions = data?.data ?? []

  const handleActivate = (id: string) =>
    activateSession(id, {
      onSuccess: () => {
        toast.success("Session activated successfully")
      },
      onError: (err) => {
        toast.error(err.message)
      },
    })

  const handleDelete = (id: string) =>
    deleteSession(id, {
      onSuccess: () => {
        toast.success("Session deleted")
      },
      onError: (err) => {
        toast.error(err.message)
      },
    })

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="mt-10 rounded-xl border bg-white p-6 text-sm text-slate-600 shadow-sm">
          Loading sessions...
        </div>
      )
    }

    if (isError) {
      return (
        <div className="mt-10 rounded-xl border bg-white p-6 text-sm text-red-600 shadow-sm">
          {error instanceof Error ? error.message : "Failed to load sessions."}
        </div>
      )
    }

    if (!sessions.length) {
      return (
        <div className="mt-6">
          <EmptyState
            title="No Academic Session yet"
            description="Create your first session to start managing terms, classes, and school activities."
            buttonText="Create Session"
            buttonHref="/admin/class-management/session/create-session"
          />
        </div>
      )
    }

    return (
      <>
        <AcademicSessionsMobile
          sessions={sessions}
          onActivate={handleActivate}
          onDelete={handleDelete}
          isMutating={isMutating}
        />
        <AcademicSessionTable
          sessions={sessions}
          onActivate={handleActivate}
          onDelete={handleDelete}
          isMutating={isMutating}
        />
      </>
    )
  }

  return (
    <div>
      <header className="flex flex-col justify-between gap-4 lg:flex-row">
        <DashboardTitle
          heading="Create Session"
          description="View, manage, or create academic sessions"
        />
        <Button className="h-12 w-full lg:w-90">
          <Link
            href="/admin/class-management/session/create-session"
            className="flex items-center gap-2"
          >
            <Plus />
            Create Session
          </Link>
        </Button>
      </header>

      <div className="flex items-center justify-between">
        {/* search bar */}
        <div className="relative my-5">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#64748B]" />
          <Input
            placeholder="Search Sessions"
            className="max-h-10 max-w-[18rem] border pl-8"
          />
        </div>

        {/* icon */}
        <div className="w-fit rounded-xl border p-[9px]">
          <ListFilter />
        </div>
      </div>

      {/* warning note */}
      <div className="flex items-start gap-1.5 text-sm text-[#F42C2C]">
        <CircleAlert className="size-7 lg:size-3.5" />
        <p className="leading-none">
          Only one academic session can be active at a time. Once a new session has been
          created that will be your active academic session. Archived sessions cannot be
          edited.
        </p>
      </div>

      {/* show a table for desktop and cards for mobile */}
      {renderContent()}
    </div>
  )
}

export default SessionsPage

import React from "react"
import Link from "next/link"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"

const EmptyState = () => {
  return (
    <div>
      <DashboardTitle
        heading="Create Session"
        description="View, manage, or create academic sessions"
      />

      <section className="flex min-h-[500px] flex-col items-center justify-center gap-6">
        <div className="relative">
          <Image
            src="/assets/images/dashboard/empty-state-hr.svg"
            alt="Empty state"
            width={148}
            height={148}
            priority
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-center text-xl font-semibold text-[#101828]">
            No Academic Session yet
          </h4>
          <p className="text-primary max-w-[50ch] text-center">
            Create your first session to start managing terms, classes, and school
            activities.
          </p>
        </div>
        <Button>
          <Link
            href="/admin/class-management/session/create-session"
            className="flex items-center gap-2"
          >
            <Plus />
            Create Session
          </Link>
        </Button>
      </section>
    </div>
  )
}

export default EmptyState

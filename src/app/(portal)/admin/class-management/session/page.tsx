import React from "react"
// import EmptyState from "../../_components/empty-state"
import SessionsPage from "../../_components/sessions/sessions-page"
// import DashboardTitle from "@/components/dashboard/dashboard-title"

const page = () => {
  return (
    <div className="bg-[#FAFAFA] px-2 py-4 lg:px-4">
      <SessionsPage />

      {/* <div className="p-5">
        <DashboardTitle
          heading="Create Session"
          description="View, manage, or create academic sessions"
        />
        <EmptyState
          title=" No Academic Session yet"
          description=" Create your first session to start managing terms, classes, and school
        activities."
          buttonText=" Create Session"
          buttonHref="/admin/class-management/session/create-session"
        />
      </div> */}
    </div>
  )
}

export default page

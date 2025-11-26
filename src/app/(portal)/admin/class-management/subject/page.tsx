import React from "react"
import EmptyState from "../../_components/empty-state"
import DashboardTitle from "@/components/dashboard/dashboard-title"
const SubjectPage = () => {
  return (
    <div className="p-5">
      <DashboardTitle
        heading="Add Subject "
        description="View, manage, or create subjects "
      />
      <EmptyState
        title="No Subjects Assigned yet"
        description="Add Subjects."
        buttonText="Add Subjects"
        buttonHref="#"
        // buttonHref="/admin/class-management/class/add-class"
      />
    </div>
  )
}

export default SubjectPage

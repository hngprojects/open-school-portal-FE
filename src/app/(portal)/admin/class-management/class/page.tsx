import React from "react"
// import EmptyState from "../../_components/empty-state"
import ExistingClasses from "../../_components/classes/existing-classes"
// import DashboardTitle from "@/components/dashboard/dashboard-title"

const page = () => {
  return (
    <div className="bg-[#FAFAFA] px-2 pt-4 lg:px-4">
      <ExistingClasses />

      {/* empty state */}
      {/* <div className="p-5">
        <DashboardTitle
          heading="Create Classes"
          description="View, manage, or create classes"
        />
        <EmptyState
          title="No Classes Assigned yet"
          description="Add Classes to make the session active."
          buttonText="Add Classes"
          buttonHref="/admin/class-management/class/add-class"
        />
      </div> */}
    </div>
  )
}

export default page

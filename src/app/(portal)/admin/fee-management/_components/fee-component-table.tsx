import React from "react"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import CreateComponentButton from "./create-component-button"

const FeeComponentTable = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <DashboardTitle
          heading="Fee Management"
          description="Create and management to group different fee components"
        />
        <CreateComponentButton>Add Category</CreateComponentButton>
      </div>
    </div>
  )
}

export default FeeComponentTable

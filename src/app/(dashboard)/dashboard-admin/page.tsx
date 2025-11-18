import React from "react"
import DashboardTitle from "../_components/dashboard-title"
import StatCard from "../_components/dashboard/stat-card"
// import TodayActivities from "../_components/dashboard/today-activities"

const page = () => {
  return (
    <div className="bg-[#FAFAFA] px-10 pt-4">
      {/* Header */}

      <DashboardTitle
        heading="Dashboard"
        description="Welcome back! Here is an overview of your school"
      />

      {/* Stat card */}
      <StatCard />

      {/* Today's activities */}
      {/* <TodayActivities /> */}
    </div>
  )
}

export default page

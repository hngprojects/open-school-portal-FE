import React from "react"
import DashboardTitle from "../_components/dashboard-title"
import StatCard from "../_components/dashboard/stat-card"
import TodayActivities from "../_components/dashboard/today-activities"
import StudentGrowthChart from "../_components/dashboard/student-growth-chart"
import FeesReportChart from "../_components/dashboard/fees-report-chart"

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

      {/* student growth and fees report*/}
      <section className="mt-10 grid grid-cols-1 gap-[72px] lg:grid-cols-2">
        <StudentGrowthChart />
        <FeesReportChart />
      </section>

      {/* Today's activities */}
      <TodayActivities />
    </div>
  )
}

export default page

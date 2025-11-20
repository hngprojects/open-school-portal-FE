import React from "react"
import DashboardTitle from "../_components/dashboard-title"
import StatCard, { StatItem } from "../_components/dashboard/stat-card"
import TodayActivities from "../_components/dashboard/today-activities-table"
import StudentGrowthChart from "../_components/dashboard/student-growth-chart"
import FeesReportChart from "../_components/dashboard/fees-report-chart"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, Search } from "lucide-react"
import TodayActivityGrid from "../_components/dashboard/today-activity-grid"
import { Users, GraduationCap, File, Book } from "lucide-react"

const dashboardStats: StatItem[] = [
  {
    name: "Total Students",
    quantity: 3.6,
    percentage: 10,
    icon: GraduationCap,
  },
  {
    name: "Total Teachers",
    quantity: 150,
    percentage: 10,
    icon: Users,
  },
  {
    name: "Total Parents",
    quantity: 300,
    percentage: 10,
    icon: File,
  },
  {
    name: "Total Classes",
    quantity: 50,
    percentage: 10,
    icon: Book,
  },
]

const page = () => {
  return (
    <div className="bg-[#FAFAFA] px-2 pt-4 lg:px-10">
      {/* Header */}

      <DashboardTitle
        heading="Dashboard"
        description="Welcome back! Here is an overview of your school"
      />

      {/* Stat card */}
      <StatCard stats={dashboardStats} />

      {/* student growth and fees report*/}
      <section className="mt-10 grid grid-cols-1 gap-[72px] lg:grid-cols-2">
        <StudentGrowthChart />
        <FeesReportChart />
      </section>

      {/* Today's activities */}
      <section className="mt-6 mb-10 rounded-2xl border px-2 py-4 shadow-xl lg:px-6">
        {/* heading */}
        <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
          <div className="flex items-center gap-2 px-4 py-2.5">
            <Activity className="text-accent size-5" />
            <h2 className="text-primary text-2xl font-bold">Today&apos;s Activities</h2>
          </div>

          {/* search and button */}
          <aside className="flex items-center justify-between gap-2">
            <div className="relative bg-[#D9D9D933]">
              <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
              <Input type="search" className="h-11 pl-8 md:h-10" placeholder="Search" />
            </div>
            <Button className="h-11 w-[137px] md:h-10">View all</Button>
          </aside>
        </div>

        {/* table for desktop */}
        <TodayActivities />

        {/* grid for mobile */}
        <TodayActivityGrid />
      </section>
    </div>
  )
}

export default page

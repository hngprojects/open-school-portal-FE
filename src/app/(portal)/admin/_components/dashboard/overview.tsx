"use client"

import React, { useState, useMemo } from "react"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import StatCard, { StatItem } from "@/components/dashboard/stat-card"
import TodayActivities from "./today-activities-table"
import TodayActivityGrid from "./today-activity-grid"

import StudentGrowthChart from "./student-growth-chart"
import FeesReportChart from "./fees-report-chart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, Search, Users, GraduationCap, Book } from "lucide-react"
import { activityData } from "@/data/activity-data"
import NotePad from "../../../../../../public/svgs/note-pad"
import { useTeachersCount } from "../../teachers/_hooks/use-teachers"

const Overview = () => {
  const { data: teacherTotal, isLoading } = useTeachersCount()

  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const suggestions = useMemo(() => {
    if (!searchTerm) return []
    const term = searchTerm.toLowerCase()
    return activityData
      .map((item, i) => ({
        index: i,
        label: `${item.teacher} - ${item.subject} (${item.class})`,
        matches:
          item.teacher.toLowerCase().includes(term) ||
          item.subject.toLowerCase().includes(term) ||
          item.class.toLowerCase().includes(term),
      }))
      .filter((item) => item.matches)
  }, [searchTerm])

  const scrollToActivity = (index: number) => {
    // If the item is beyond the initial 5 and showAll is false, expand the list first
    if (index >= 5 && !showAll) {
      setShowAll(true)
    }

    // Clear search and close dropdown
    setSearchTerm("")

    // Wait for DOM to update before scrolling
    setTimeout(() => {
      const element = document.getElementById(`activity-${index}`)
      if (!element) return

      element.scrollIntoView({ behavior: "smooth", block: "center" })

      setHighlightedIndex(index)
      setTimeout(() => setHighlightedIndex(null), 2000)
    }, 100)
  }

  function formatNumber(num: number) {
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"
    return num.toString()
  }

  const formattedTeachers = teacherTotal ? formatNumber(teacherTotal) : "0"

  const dashboardStats: StatItem[] = useMemo(
    () => [
      { name: "Total Students", quantity: 3.6, percentage: 10, icon: GraduationCap },
      {
        name: "Total Teachers",
        quantity: isLoading ? 0 : formattedTeachers,
        percentage: 10,
        icon: Users,
      },
      { name: "Today's Attendance", quantity: 300, percentage: 10, icon: NotePad },
      { name: "Total Classes", quantity: 50, percentage: 10, icon: Book },
    ],
    [isLoading, formattedTeachers]
  )

  return (
    <div className="bg-[#FAFAFA] px-2 pt-4 lg:px-4">
      <DashboardTitle
        heading="Dashboard"
        description="Welcome back! Here is an overview of your school"
      />

      <StatCard stats={dashboardStats} isLoading={isLoading} />

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

          <div className="mt-4 flex items-center justify-between gap-2 lg:mt-0">
            {/* Search */}
            <aside className="relative w-full max-w-[250px]">
              <div className="relative bg-[#D9D9D933]">
                <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
                <Input
                  type="search"
                  className="h-11 pl-8 md:h-10"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Suggestions Dropdown */}
              {searchTerm.length > 0 && (
                <div className="absolute z-20 mt-1 max-h-[220px] min-h-[120px] w-full overflow-y-auto rounded-lg border bg-white shadow">
                  {suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <button
                        key={item.index}
                        type="button"
                        onClick={() => scrollToActivity(item.index)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                      >
                        {item.label}
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-3 text-sm text-gray-500">No results found</p>
                  )}
                </div>
              )}
            </aside>

            <Button
              className="h-11 w-[137px] md:h-10"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "View All"}
            </Button>
          </div>
        </div>

        <TodayActivities
          search={searchTerm}
          highlightedIndex={highlightedIndex}
          showAll={showAll}
        />
        <TodayActivityGrid
          search={searchTerm}
          highlightedIndex={highlightedIndex}
          showAll={showAll}
        />
      </section>
    </div>
  )
}

export default Overview

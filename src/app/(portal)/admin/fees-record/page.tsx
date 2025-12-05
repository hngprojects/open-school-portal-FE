"use client"

import React from "react"
import Link from "next/link"
import { Upload, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import StatsCards from "./_components/stats-cards"
import FeesChart from "./_components/fees-chart"
import FeesFilters from "./_components/fees-filters"
import FeesTable from "./_components/fees-table"

const FeesRecord = () => {
  return (
    <div className="w-full space-y-8 px-4 py-10 lg:px-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <DashboardTitle
          heading="Fees Dashboard"
          description="Overview of student fee collections for the current academic year"
        />
        <div className="flex w-full gap-3 md:w-auto">
          <Button
            variant="outline"
            className="flex-1 border-red-100 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 md:flex-none"
          >
            <Upload className="mr-2 h-4 w-4" />
            Export Records
          </Button>
          <Link href="/admin/fees-record/add-payment">
            <Button className="flex-1 bg-[#DA3743] hover:bg-[#DA3743]/90 md:flex-none">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Chart */}
      <FeesChart />

      {/* Filters and Table */}
      <div className="space-y-6">
        <FeesFilters />
        <FeesTable />
      </div>
    </div>
  )
}

export default FeesRecord

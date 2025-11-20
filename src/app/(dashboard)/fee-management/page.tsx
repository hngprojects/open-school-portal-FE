import React from "react"
import DashboardTitle from "../_components/dashboard-title"
import { GraduationCap, BanknoteX, File, Book } from "lucide-react"
import StatCard, { StatItem } from "../_components/dashboard/stat-card"
import FeesReportChart from "../_components/fee-management/fee-bar-chart"
import InvoiceChart from "../_components/fee-management/invoice-pie-chart"

const feesStats: StatItem[] = [
  {
    name: "Total Students",
    quantity: 3.6,
    percentage: 10,
    icon: GraduationCap,
  },
  {
    name: "Incoming Fees",
    quantity: 8.6,
    percentage: 10,
    icon: BanknoteX,
  },
  {
    name: "Total Unpaid",
    quantity: 4.6,
    percentage: 10,
    icon: File,
  },
  {
    name: "Invoices",
    quantity: 1.6,
    percentage: 10,
    icon: Book,
  },
]

const page = () => {
  return (
    <div className="bg-[#FAFAFA] px-2 pt-4 lg:px-10">
      <DashboardTitle
        heading="Fees Management"
        description="Manage fees, track payment & generate report"
      />

      {/* stats */}
      <StatCard stats={feesStats} />

      {/* fees report */}
      <section className="my-10 grid grid-cols-1 gap-[72px] lg:grid-cols-2">
        <FeesReportChart />
        <InvoiceChart />
      </section>
    </div>
  )
}
export default page

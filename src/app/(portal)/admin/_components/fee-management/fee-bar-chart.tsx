"use client"

import { Wallet } from "lucide-react"
import { ReuseableBarChart } from "../dashboard/bar-chart"

import { TypedChartConfig } from "@/types/chart"

// -------------------
// Chart Data
// -------------------
const feeData = [
  { month: "Jun", paid: 100000, unpaid: 45000 },
  { month: "Jul", paid: 90000, unpaid: 52000 },
  { month: "Aug", paid: 120000, unpaid: 32000 },
  { month: "Sep", paid: 105000, unpaid: 43000 },
  { month: "Oct", paid: 110000, unpaid: 70000 },
  { month: "Nov", paid: 45000, unpaid: 120000 },
]

// -------------------
// Chart Config
// -------------------
const feeConfig: TypedChartConfig<"paid" | "unpaid"> = {
  paid: { label: "Paid", color: "#10B981" },
  unpaid: { label: "Unpaid", color: "#EF4444" },
}

// -------------------
// Component
// -------------------
export default function FeesReportChart() {
  return (
    <ReuseableBarChart
      title="Fees Management"
      icon={Wallet}
      data={feeData}
      xKey="month"
      bars={["paid", "unpaid"]}
      config={feeConfig}
      // dropdown={[
      //   { label: "2025/2026", value: "2025" },
      //   { label: "2024/2025", value: "2024" },
      //   { label: "2023/2024", value: "2023" },
      // ]}
      footer={[
        { label: "Paid", color: "#10B981" },
        { label: "Unpaid", color: "#EF4444" },
      ]}
    />
  )
}

import React from "react"
import { PiMoneyWavyBold } from "react-icons/pi"
import { CheckCircle2, AlertCircle, CreditCard } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: React.ElementType
  iconColor: string
  bgIconColor: string
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  bgIconColor,
}: StatCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${bgIconColor}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      <div className="text-primary text-3xl font-semibold">{value}</div>
    </div>
  )
}

const StatsCards = () => {
  const stats = [
    {
      title: "Total Expected Fees",
      value: "₦8,600,000",
      icon: PiMoneyWavyBold,
      iconColor: "text-red-500",
      bgIconColor: "bg-red-50",
    },
    {
      title: "Total Paid",
      value: "₦2,000,000",
      icon: CheckCircle2,
      iconColor: "text-green-500",
      bgIconColor: "bg-green-50",
    },
    {
      title: "Outstanding Balance",
      value: "₦110,070,000",
      icon: AlertCircle,
      iconColor: "text-orange-500",
      bgIconColor: "bg-orange-50",
    },
    {
      title: "Transaction This Month",
      value: "110",
      icon: CreditCard,
      iconColor: "text-emerald-500",
      bgIconColor: "bg-emerald-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

export default StatsCards

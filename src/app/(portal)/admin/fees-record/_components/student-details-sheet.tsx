"use client"

import React from "react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ArrowDown } from "lucide-react"

interface Student {
  avatar: string
  name: string
  id: string
  class: string
}

interface StudentDetailsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: Student | null
}

const StudentDetailsSheet = ({
  open,
  onOpenChange,
  student,
}: StudentDetailsSheetProps) => {
  if (!student) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90%] overflow-y-auto px-7 sm:max-w-[40%]">
        <SheetHeader className="mb-6 flex flex-row items-center justify-between space-y-0 border-b border-gray-100 pb-4">
          <SheetTitle className="text-xl font-bold text-gray-900">
            Students Fess Details
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-8 pb-10">
          {/* Profile Section */}
          <div className="flex flex-col gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <Image
                src={student.avatar}
                alt={student.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{student.name}</h3>
              <p className="text-sm text-gray-500">ID: {student.id.replace("#", "")}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                <span>Session: 2025/2026</span>
                <span>Class: {student.class}</span>
                <span>Term: 2</span>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-gray-200 p-3 text-center">
              <p className="text-xs font-medium text-gray-600">Total Fess</p>
              <p className="mt-1 text-sm font-bold text-gray-900">₦2,000,000</p>
            </div>
            <div className="rounded-lg border border-green-200 p-3 text-center">
              <p className="text-xs font-medium text-gray-600">Total Paid</p>
              <p className="mt-1 text-sm font-bold text-green-500">₦2,000,000</p>
            </div>
            <div className="rounded-lg border border-red-200 p-3 text-center">
              <p className="text-xs font-medium text-gray-600">Unpaid</p>
              <p className="mt-1 text-sm font-bold text-red-500">₦2,000,000</p>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-gray-900">Payment Breakdown</h4>
            <div className="rounded-lg border border-gray-100">
              <div className="grid grid-cols-3 border-b border-gray-100 bg-white p-3 text-xs font-semibold text-gray-900">
                <span>Fess Component</span>
                <span className="text-center">Amount</span>
                <span className="text-right">Status</span>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { name: "Tuition Fee", amount: "₦100,000", status: "Paid" },
                  { name: "Lab Fee", amount: "₦50,000", status: "Pending" },
                  { name: "Boarding Fee", amount: "₦250,000", status: "Paid" },
                  { name: "1st Term Balance", amount: "₦20,000", status: "Paid" },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-3 items-center p-4 text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="text-center font-medium text-gray-900">
                      {item.amount}
                    </span>
                    <div className="text-right">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-gray-900">Payment History</h4>
            <div className="space-y-6">
              {[
                {
                  title: "1st Term Payment",
                  date: "September 20, 2025 via Bank transfer",
                  amount: "₦300,000",
                },
                {
                  title: "2nd Term Payment",
                  date: "September 20, 2025 via Bank transfer",
                  amount: "₦300,000",
                },
                {
                  title: "3rd Term Payment (Part Payment)",
                  date: "September 20, 2025 via Bank transfer",
                  amount: "₦250,000",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <ArrowDown className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-500">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default StudentDetailsSheet

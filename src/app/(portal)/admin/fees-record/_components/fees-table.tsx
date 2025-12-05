"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import StudentDetailsSheet from "./student-details-sheet"

interface StudentFee {
  id: string
  name: string
  class: string
  breakdown: string
  amountDue: string
  amountPaid: string
  balance: string
  status: string
  avatar: string
}

const students: StudentFee[] = [
  {
    id: "#12345",
    name: "Daniel Esther",
    class: "JSS1",
    breakdown: "Tuition, Books",
    amountDue: "₦100,000",
    amountPaid: "₦100,000",
    balance: "₦0",
    status: "Paid",
    avatar: "/assets/images/dashboard/avatar.svg", // Placeholder
  },
  {
    id: "#12345",
    name: "Daniel Esther",
    class: "JSS2",
    breakdown: "Tuition, Transport",
    amountDue: "₦100,000",
    amountPaid: "₦100,000",
    balance: "₦0",
    status: "Paid",
    avatar: "/assets/images/dashboard/avatar.svg",
  },
  {
    id: "#12345",
    name: "Daniel Esther",
    class: "JSS3",
    breakdown: "Tuition, Exam",
    amountDue: "₦100,000",
    amountPaid: "₦78,000",
    balance: "₦22,000",
    status: "Pending",
    avatar: "/assets/images/dashboard/avatar.svg",
  },
  {
    id: "#12345",
    name: "Daniel Esther",
    class: "SSS1",
    breakdown: "Tuition, Transport",
    amountDue: "₦100,000",
    amountPaid: "₦100,000",
    balance: "₦0",
    status: "Paid",
    avatar: "/assets/images/dashboard/avatar.svg",
  },
  {
    id: "#12345",
    name: "Daniel Esther",
    class: "SSS2",
    breakdown: "Tuition, Books",
    amountDue: "₦100,000",
    amountPaid: "₦0",
    balance: "₦100,000",
    status: "Overdue",
    avatar: "/assets/images/dashboard/avatar.svg",
  },
  {
    id: "#12345",
    name: "Daniel Esther",
    class: "SSS2",
    breakdown: "Tuition, Transport",
    amountDue: "₦100,000",
    amountPaid: "₦100,000",
    balance: "₦0",
    status: "Paid",
    avatar: "/assets/images/dashboard/avatar.svg",
  },
  {
    id: "#12345",
    name: "Daniel Esther",
    class: "SSS3",
    breakdown: "Tuition, Books",
    amountDue: "₦100,000",
    amountPaid: "₦100,000",
    balance: "₦0",
    status: "Paid",
    avatar: "/assets/images/dashboard/avatar.svg",
  },
]

const FeesTable = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentFee | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleRowClick = (student: StudentFee) => {
    setSelectedStudent(student)
    setIsSheetOpen(true)
  }

  return (
    <>
      <div className="space-y-4">
        {/* Desktop Table */}
        <div className="hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-[250px]">Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Fee Breakdown</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow
                  key={index}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(student)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={student.avatar}
                          alt={student.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{student.name}</span>
                        <span className="text-xs text-gray-500">ID: {student.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.breakdown}</TableCell>
                  <TableCell>{student.amountDue}</TableCell>
                  <TableCell>{student.amountPaid}</TableCell>
                  <TableCell>{student.balance}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        student.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : student.status === "Pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {students.map((student, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-gray-300"
              onClick={() => handleRowClick(student)}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{student.name}</span>
                  <span className="text-xs text-gray-500">ID: {student.id}</span>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    student.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : student.status === "Pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {student.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs text-gray-500">Due</span>
                  <span className="mt-1 text-sm font-semibold text-gray-900">
                    {student.amountDue}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs text-gray-500">Paid</span>
                  <span className="mt-1 text-sm font-semibold text-gray-900">
                    {student.amountPaid}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs text-gray-500">Balance</span>
                  <span className="mt-1 text-sm font-semibold text-gray-900">
                    {student.balance}
                  </span>
                </div>
              </div>

              <div className="mt-4 w-full rounded-lg border border-red-200 py-2 text-center text-sm font-medium text-red-500">
                View Details
              </div>
            </div>
          ))}
        </div>
      </div>

      <StudentDetailsSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        student={selectedStudent}
      />
    </>
  )
}

export default FeesTable

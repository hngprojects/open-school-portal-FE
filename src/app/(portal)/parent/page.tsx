"use client"

import Image from "next/image"
import React, { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import Link from "next/link"

const studentsData = [
  {
    id: 1,
    name: "Sarah F.",
    class: "Jss3C",
    photo: "/assets/images/parent.png",
    academic: { term: "2nd", grade: "A" },
    attendance: { present: 85, absent: 3 },
    fees: { amount: 300000, dueDate: "1 March 2025", status: "Unpaid" },
    events: [
      { title: "Mid-Term Break", date: "27-28 December 2025" },
      { title: "Christmas Carol", date: "29 December 2025" },
    ],
  },
  {
    id: 2,
    name: "John D.",
    class: "Jss2A",
    photo: "/assets/images/parent.png",
    academic: { term: "Term 2", grade: "B+" },
    attendance: { present: 90, absent: 2 },
    fees: { amount: 250000, dueDate: "25 September 2025", status: "Paid" },
    events: [
      { title: "Science Fair", date: "10 November 2025" },
      { title: "Sports Day", date: "5 December 2025" },
    ],
  },
]

export default function ParentDashboard() {
  const [selectedStudentId, setSelectedStudentId] = useState(studentsData[0].id)
  const student = studentsData.find((s) => s.id === selectedStudentId)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-2 text-2xl font-semibold">Welcome, Dr. Faith</h1>
      <p className="mb-6 text-gray-600">Here is your child’s academic report</p>

      <div className="mb-6 flex items-center justify-between space-x-6">
        {/* Shadcn Select */}
        <Select
          value={selectedStudentId.toString()}
          onValueChange={(value) => setSelectedStudentId(Number(value))}
        >
          <SelectTrigger className="border-accent text-accent w-30">
            <SelectValue placeholder="Select Student" />
          </SelectTrigger>
          <SelectContent>
            {studentsData.map((s) => (
              <SelectItem key={s.id} value={s.id.toString()}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-col items-center space-x-4">
          <div>
            <Image
              src={student?.photo || "/assets/images/parent.png"}
              alt={student?.name || "Student"}
              width={70}
              height={70}
              className="h-20 w-20 rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">{student?.name}</p>
            <p className="text-gray-500">{student?.class}</p>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Academic Summary */}
        <div className="min-h-[195px] rounded-xl bg-white p-4 shadow">
          <div className="lg:flex lg:justify-between">
            <div className="">
              <h2 className="text-primary text-lg font-semibold">
                Academic Result Summary
              </h2>
              <p className="text-primary">
                <span className="font-bold">Term:</span> {student?.academic.term}
              </p>
              <p className="text-primary">
                <span className="font-bold">Session:</span> 2025/2026
              </p>
            </div>
            {/* grade */}
            <div className="text-center">
              <p className="text-[40px] font-medium text-green-600">
                {student?.academic.grade}
              </p>
              <p className="text-primary">Overall Grade</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="link" className="text-accent mt-2 text-sm">
              <Link href="/parent/results">View Full Result →</Link>
            </Button>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="min-h-[195px] rounded-xl bg-white p-4 shadow">
          {/* <div className="lg:flex lg:justify-between"> */}
          <h2 className="text-primary text-lg font-semibold">Attendance Summary</h2>

          <div className="mt-4 flex justify-between">
            {/* present days */}
            <p className="flex flex-col items-center justify-center lg:px-16">
              <span className="text-[40px] leading-none text-[#10B981]">
                {student?.attendance.present}%
              </span>
              <span className="text-primary">Present</span>
            </p>
            {/* absent days */}
            <p className="flex flex-col items-center justify-center">
              <span className="text-accent text-[40px] leading-none font-medium">
                {student?.attendance.absent}
              </span>
              <span className="text-primary">Absent Days</span>
            </p>
          </div>
          {/* </div> */}
          <div className="flex justify-center">
            <Button variant="link" className="text-accent mt-2 text-sm">
              <Link href="/parent/attendance">View Attendance Calendar →</Link>
            </Button>
          </div>
        </div>

        {/* School Fees */}
        <div className="min-h-[195px] space-y-[31px] rounded-xl bg-white p-4 shadow">
          <div className="flex justify-between">
            <div className="space-x-2">
              <h2 className="text-primary text-lg leading-5 font-semibold">
                School Fees
              </h2>
              <p className="text-primary">
                <span className="font-bold">Term Fees:</span> {student?.academic.term}
              </p>
              <p className="text-primary">
                <span className="font-bold">Session:</span> 2025/2026
              </p>
            </div>

            {/* fee status */}
            <p
              className={`h-fit rounded-2xl px-2 py-1 text-sm ${
                student?.fees.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-accent/10 text-accent"
              }`}
            >
              {student?.fees.status}
            </p>
          </div>

          {/* amount */}
          <div className="space-y-[15px]">
            <p className="text-primary text-[2rem] font-semibold">
              {student?.fees.amount.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
            </p>
            {student?.fees.status === "Unpaid" && (
              <p className="text-text-secondary leading-none">
                Due on {student?.fees.dueDate}
              </p>
            )}
          </div>
          {student?.fees.status === "Unpaid" && (
            <Button className="w-full">
              <Link href="/parent/fee-management">Pay School Fees</Link>
            </Button>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="min-h-[195px] space-y-6 rounded-xl bg-white p-4 shadow">
          <h2 className="text-primary text-2xl font-semibold">Upcoming Events</h2>
          <div className="flex flex-col gap-5">
            {student?.events.map((event, index) => (
              <div key={index} className="mb-2 flex items-center">
                <span className="bg-accent/10 mr-4 flex h-[50px] w-[50px] items-center justify-center rounded-full">
                  <CalendarDays className="text-accent" />
                </span>
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

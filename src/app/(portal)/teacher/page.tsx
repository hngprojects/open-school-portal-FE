"use client"

import React from "react"
import Image from "next/image"
import { LiaListAltSolid } from "react-icons/lia"
import { GoChecklist } from "react-icons/go"
import { PiPawPrintFill } from "react-icons/pi"
import { CgFileDocument } from "react-icons/cg"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import StatCard, { StatItem } from "@/components/dashboard/stat-card"
import TeacherWelcome from "./_components/teacher-welcome"
import { cn } from "@/lib/utils"

const assetBasePath = "/assets/dashboard/teacher"

// Teacher stats
const teacherStats: StatItem[] = [
  { name: "Take Attendance", quantity: 78, percentage: 10, icon: LiaListAltSolid },
  { name: "Result", quantity: 60, percentage: 10, icon: GoChecklist },
  { name: "Class", quantity: 10, percentage: 10, icon: PiPawPrintFill },
  { name: "Assignment", quantity: 8, percentage: 10, icon: CgFileDocument },
]

// Today's classes
const todaysClasses = [
  {
    id: "maths",
    subject: "Mathematics",
    className: "JSS2B",
    time: "09:00 AM - 10:00 AM",
    room: "Room 201",
    image: `${assetBasePath}/mathematics-hero.png`,
  },
  {
    id: "physics",
    subject: "Physics",
    className: "SS2B",
    time: "11:00 AM - 12:00 PM",
    room: "Room 305",
    image: `${assetBasePath}/physics-hero.png`,
  },
]

// Homework items
const homeworkItems = [
  {
    id: "maths-test",
    type: "Test",
    subject: "Mathematics",
    topic: "Algebra",
    className: "JSS2B",
    date: "20th Nov, 2025",
  },
  {
    id: "chem-assignment",
    type: "Assignment",
    subject: "Chemistry",
    topic: "Element",
    className: "SS2B",
    date: "20th Nov, 2025",
  },
  {
    id: "physics-practical",
    type: "Practical",
    subject: "Physics",
    topic: "Friction",
    className: "JSS2B",
    date: "20th Nov, 2025",
  },
  {
    id: "english-test",
    type: "Test",
    subject: "English",
    topic: "Dictation",
    className: "SS2B",
    date: "20th Nov, 2025",
  },
]

// Notifications
const notifications = [
  {
    id: "assembly",
    title: "School-wide assembly schedule for Friday, 10 AM",
    timeAgo: "2 hours ago",
    iconSrc: `${assetBasePath}/icons/icon-notification-calendar.svg`,
  },
  {
    id: "lab-approval",
    title: "Your supply request for new lab equipment has been approved",
    timeAgo: "Yesterday",
    iconSrc: `${assetBasePath}/icons/icon-notification-approval.svg`,
  },
]

// Class performance
const classPerformance = [
  {
    id: "maths",
    subject: "Mathematics",
    average: "88% Avg.",
    accentDotClass: "bg-emerald-500",
    accentTextClass: "text-emerald-500",
  },
  {
    id: "chemistry",
    subject: "Chemistry",
    average: "74% Avg.",
    accentDotClass: "bg-amber-500",
    accentTextClass: "text-amber-500",
  },
  {
    id: "physics",
    subject: "Physics",
    average: "91% Avg.",
    accentDotClass: "bg-blue-500",
    accentTextClass: "text-blue-500",
  },
]

// Homework badge styles
const homeworkBadgeStyles: Record<string, string> = {
  Test: "bg-[#E9FBF2] text-[#1F9254]",
  Assignment: "bg-[#FFF3E3] text-[#B4690E]",
  Practical: "bg-[#E7F1FF] text-[#1E63C3]",
}

export default function TeachersPage() {
  return (
    <section className="min-h-screen bg-[#FAFAFA] px-4 py-10 text-[#2D2D2D] sm:px-8">
      <div className="mx-auto flex w-full max-w-[1112px] flex-col gap-8 pb-16">
        {/* Welcome banner */}
        <TeacherWelcome />

        {/* Teacher Stats */}
        <StatCard stats={teacherStats} />

        {/* Today's Classes */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-medium text-[#2D2D2D]">Today’s Classes</h2>
            <Button
              variant="ghost"
              size="sm"
              className="group flex h-10 items-center gap-2 rounded-lg border border-[#D5D5D5] px-6 text-base font-medium text-[#535353]"
            >
              View All
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {todaysClasses.map((classItem) => (
              <article
                key={classItem.id}
                className="flex h-full flex-col rounded-2xl border border-[#CCCCCC] bg-white"
              >
                <div className="relative h-[196px] w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src={classItem.image}
                    alt={`${classItem.subject} classroom`}
                    fill
                    className="object-cover"
                    priority={classItem.id === "maths"}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <h3 className="text-2xl leading-7 font-medium">
                      {classItem.subject}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[15px] text-[#535353]">
                      <span>Class: {classItem.className}</span>
                      <span className="hidden h-4 w-px bg-[#595959]/70 sm:block" />
                      <span>{classItem.time}</span>
                      <span className="hidden h-4 w-px bg-[#595959]/70 sm:block" />
                      <span>{classItem.room}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-[172px] rounded-lg border-[#DA3743] text-base font-medium text-[#DA3743]"
                  >
                    View Class
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pending Homework */}
        <section className="rounded-2xl border border-[#E8E8E8] bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-[#2D2D2D]">Pending Homework</h2>
            <Button
              variant="ghost"
              size="sm"
              className="group flex h-10 items-center gap-2 rounded-lg border border-[#D5D5D5] px-6 text-base font-medium text-[#535353]"
            >
              View All
            </Button>
          </div>

          <div className="space-y-4 lg:hidden">
            {homeworkItems.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-[#E0E0E0] bg-[#FFFFFF] p-4 shadow-[0px_8px_24px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <Badge
                    className={cn(
                      "rounded-full px-4 py-1 text-sm font-medium",
                      homeworkBadgeStyles[item.type] ?? "bg-[#F2F4F7] text-[#475467]"
                    )}
                  >
                    {item.type}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 rounded-lg border border-[#DA3743] px-4 text-sm font-medium text-[#DA3743]"
                  >
                    View All
                  </Button>
                </div>
                <dl className="mt-4 space-y-3 text-sm text-[#535353]">
                  <div className="flex justify-between">
                    <dt className="font-medium text-[#2D2D2D]">Subject</dt>
                    <dd>{item.subject}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-[#2D2D2D]">Topic</dt>
                    <dd>{item.topic}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-[#2D2D2D]">Class</dt>
                    <dd>{item.className}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-[#2D2D2D]">Date</dt>
                    <dd>{item.date}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* Notifications + Class Performance */}
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#CDCDCD] bg-white p-6">
            <h2 className="text-2xl font-semibold text-[#2D2D2D]">
              Recent Notifications
            </h2>
            <div className="mt-6 space-y-6">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#FBEBEC]">
                    <Image src={notification.iconSrc} alt="" width={26} height={26} />
                  </div>
                  <div>
                    <p className="text-lg leading-6 font-medium text-[#535353]">
                      {notification.title}
                    </p>
                    <p className="text-sm text-[#6F6F6F]">{notification.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#CDCDCD] bg-white p-6">
            <h2 className="text-2xl font-semibold text-[#2D2D2D]">
              Class performance Summary
            </h2>
            <div className="mt-6 space-y-4">
              {classPerformance.map((performance) => (
                <div
                  key={performance.id}
                  className="flex items-center justify-between rounded-lg bg-[#F6F6F6] px-4 py-3"
                >
                  <div className="flex items-center gap-3 text-lg text-[#535353]">
                    <span
                      className={cn("size-3 rounded-full", performance.accentDotClass)}
                    />
                    {performance.subject}
                  </div>
                  <p className={cn("text-lg font-medium", performance.accentTextClass)}>
                    {performance.average}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

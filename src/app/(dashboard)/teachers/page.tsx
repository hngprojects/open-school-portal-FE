import Image from "next/image"
import { ArrowUpRight, Bell, Menu } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const assetBasePath = "/assets/dashboard/teacher"

type StatItem = {
  id: string
  label: string
  value: number
  delta: string
  iconSrc: string
}

type ClassItem = {
  id: string
  subject: string
  className: string
  time: string
  room: string
  image: string
}

type HomeworkItem = {
  id: string
  type: "Test" | "Assignment" | "Practical"
  subject: string
  topic: string
  className: string
  date: string
}

type NotificationItem = {
  id: string
  title: string
  timeAgo: string
  iconSrc: string
}

type PerformanceItem = {
  id: string
  subject: string
  average: string
  accentDotClass: string
  accentTextClass: string
}

const arrowIconSrc = `${assetBasePath}/icons/icon-arrow-right.svg`

const stats: StatItem[] = [
  {
    id: "attendance",
    label: "Take Attendance",
    value: 78,
    delta: "+10% Since this term",
    iconSrc: `${assetBasePath}/icons/icon-stat-attendance.svg`,
  },
  {
    id: "result",
    label: "Result",
    value: 60,
    delta: "+10% Since this term",
    iconSrc: `${assetBasePath}/icons/icon-stat-result.svg`,
  },
  {
    id: "classes",
    label: "Class",
    value: 10,
    delta: "+10% Since this term",
    iconSrc: `${assetBasePath}/icons/icon-stat-class.svg`,
  },
  {
    id: "assignments",
    label: "Assignment",
    value: 8,
    delta: "+10% Since this term",
    iconSrc: `${assetBasePath}/icons/icon-stat-assignment.svg`,
  },
]

const todaysClasses: ClassItem[] = [
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

const homeworkItems: HomeworkItem[] = [
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

const notifications: NotificationItem[] = [
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

const classPerformance: PerformanceItem[] = [
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

const homeworkBadgeStyles: Record<HomeworkItem["type"], string> = {
  Test: "bg-[#E9FBF2] text-[#1F9254]",
  Assignment: "bg-[#FFF3E3] text-[#B4690E]",
  Practical: "bg-[#E7F1FF] text-[#1E63C3]",
}

export default function TeachersPage() {
  return (
    <section className="min-h-screen bg-[#FAFAFA] px-4 py-10 text-[#2D2D2D] sm:px-8">
      <div className="mx-auto flex w-full max-w-[1112px] flex-col gap-8 pb-16">
        <div className="flex items-center justify-between rounded-2xl border border-transparent bg-white px-4 py-3 shadow-sm md:hidden">
          <button
            aria-label="Open menu"
            className="flex size-10 items-center justify-center rounded-lg bg-white shadow"
          >
            <Menu className="size-6 text-[#2D2D2D]" />
          </button>
          <div className="flex items-center gap-3">
            <button
              aria-label="View notifications"
              className="relative flex size-10 items-center justify-center rounded-lg bg-white shadow"
            >
              <Bell className="size-5 text-[#2D2D2D]" />
              <span className="absolute -top-1 -right-1 flex size-3 items-center justify-center rounded-full border border-white bg-[#DA3743]" />
            </button>
            <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-white shadow">
              <Image
                src="/Avatar/Avatar Base.png"
                alt="Sophia Alakija"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <header className="hidden space-y-1 md:block">
          <p className="text-[18px] leading-8 font-medium md:text-2xl">
            Welcome back, Mr. Daniel
          </p>
          <p className="text-sm font-normal text-[#535353]">
            Here’s what’s happening in your classes today
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex h-[151px] flex-col justify-between rounded-lg border border-[#D5D5D5] bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex size-10 items-center justify-center rounded-full bg-[#FBEBEC]">
                  <Image src={stat.iconSrc} alt="" width={24} height={24} />
                </div>
                <span className="text-lg font-medium text-[#535353]">{stat.label}</span>
              </div>
              <div className="space-y-2">
                <p className="text-[28px] leading-9 font-semibold text-[#2D2D2D]">
                  {stat.value}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 font-medium text-[#10B981]">
                    <ArrowUpRight className="size-4" />
                    {stat.delta.replace("Since this term", "").trim()}
                  </span>
                  <span className="text-[#686868]">Since this term</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-medium text-[#2D2D2D]">Today’s Classes</h2>
            <Button
              variant="ghost"
              size="sm"
              className="group flex h-10 items-center gap-2 rounded-lg border border-[#D5D5D5] px-6 text-base font-medium text-[#535353]"
            >
              View All
              <Image
                src={arrowIconSrc}
                alt=""
                width={14}
                height={8}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
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
                    sizes="(max-width: 768px) 100vw, 540px"
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
                    className="group flex w-[172px] items-center justify-center gap-2 rounded-lg border-[#DA3743] text-base font-medium text-[#DA3743]"
                  >
                    View Class
                    <Image
                      src={arrowIconSrc}
                      alt=""
                      width={14}
                      height={8}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#E8E8E8] bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-[#2D2D2D]">Pending Homework</h2>
            <Button
              variant="ghost"
              size="sm"
              className="group flex h-10 items-center gap-2 rounded-lg border border-[#D5D5D5] px-6 text-base font-medium text-[#535353]"
            >
              View All
              <Image
                src={arrowIconSrc}
                alt=""
                width={14}
                height={8}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
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
                    className="group flex h-9 items-center gap-2 rounded-lg border border-[#DA3743] px-4 text-sm font-medium text-[#DA3743]"
                  >
                    View All
                    <Image
                      src={arrowIconSrc}
                      alt=""
                      width={14}
                      height={8}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
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
          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-xl border border-[#EAECF0]">
              <Table className="[&_th]:uppercase">
                <TableHeader className="bg-[#F9FAFB]">
                  <TableRow className="border-[#EAECF0]">
                    <TableHead className="text-[14px] font-medium text-[#535353]">
                      Type
                    </TableHead>
                    <TableHead className="text-[14px] font-medium text-[#535353]">
                      Subject
                    </TableHead>
                    <TableHead className="text-[14px] font-medium text-[#535353]">
                      Topic
                    </TableHead>
                    <TableHead className="text-[14px] font-medium text-[#535353]">
                      Class
                    </TableHead>
                    <TableHead className="text-[14px] font-medium text-[#535353]">
                      Date
                    </TableHead>
                    <TableHead className="text-[14px] font-medium text-[#535353]">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {homeworkItems.map((item) => (
                    <TableRow key={item.id} className="border-[#EAECF0]">
                      <TableCell>
                        <Badge
                          className={cn(
                            "rounded-full px-4 py-1 text-sm font-medium",
                            homeworkBadgeStyles[item.type] ??
                              "bg-[#F2F4F7] text-[#475467]"
                          )}
                        >
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-base text-[#2D2D2D]">
                        {item.subject}
                      </TableCell>
                      <TableCell className="text-base text-[#2D2D2D]">
                        {item.topic}
                      </TableCell>
                      <TableCell className="text-base text-[#2D2D2D]">
                        {item.className}
                      </TableCell>
                      <TableCell className="text-base text-[#2D2D2D]">
                        {item.date}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="group flex h-9 items-center gap-2 rounded-lg border border-[#DA3743] px-4 text-sm font-medium text-[#DA3743]"
                        >
                          View All
                          <Image
                            src={arrowIconSrc}
                            alt=""
                            width={14}
                            height={8}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

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

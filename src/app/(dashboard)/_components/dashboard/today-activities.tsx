import React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, Search } from "lucide-react"

const activityData = [
  {
    teacher: "Mr Victor Ajadi",
    subject: "Mathematics",
    "time-start": "08:30am",
    "time-end": "09:15am",
    status: "completed",
    class: "JSS1A",
    students: 80,
    venue: "TFBRM1",
  },
  {
    teacher: "Miss Chiwendu Agu",
    subject: "Physics",
    "time-start": "08:30am",
    "time-end": "09:15am",
    status: "completed",
    class: "SS2B",
    students: 60,
    venue: "LAB1",
  },
  {
    teacher: "Mrs Ruth Samuel-Temi",
    subject: "Chemistry",
    "time-start": "09:20am",
    "time-end": "10:05am",
    status: "Up coming",
    class: "SSS3A",
    students: 17,
    venue: "LAB1",
  },
  {
    teacher: "Miss Funke Daniels",
    subject: "Biology",
    "time-start": "10:10am",
    "time-end": "10:55am",
    status: "Up coming",
    class: "JSS3C",
    students: 20,
    venue: "Lecture Room 2",
  },
  {
    teacher: "Mr David Junior",
    subject: "Literature",
    "time-start": "10:10am",
    "time-end": "10:55am",
    status: "Ongoing",
    class: "SS1A",
    students: 10,
    venue: "Lecture Room 1",
  },
]

const TodayActivities = () => {
  return (
    <section className="mt-6 mb-10 rounded-2xl border px-6 py-4 shadow-xl">
      <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
        <div className="flex items-center gap-2 px-4 py-2.5">
          <Activity className="text-accent size-5" />
          <h2 className="text-primary text-2xl font-bold">Today&apos;s Activities</h2>
        </div>

        {/* search and button */}
        <aside className="flex items-center justify-between gap-2">
          <div className="relative bg-[#D9D9D933]">
            <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
            <Input type="search" className="h-11 pl-8 md:h-10" placeholder="Search" />
          </div>
          <Button className="h-11 w-[137px] md:h-10">View all</Button>
        </aside>
      </div>

      {/* table */}
      <Table>
        <TableHeader className="bg-tint h-13">
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="w-[150px] px-4 py-2.5 text-center">Teacher</TableHead>
            <TableHead className="px-4 py-2.5">Subject</TableHead>

            <TableHead className="px-4 py-2.5 text-center">Time</TableHead>
            <TableHead className="px-4 py-2.5 text-center">Status</TableHead>
            <TableHead className="px-4 py-2.5 text-center">Class</TableHead>
            <TableHead className="px-4 py-2.5 text-center">No of Students</TableHead>
            <TableHead className="px-4 py-2.5 text-center">Venue</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {activityData.map((activity, i) => (
            <TableRow key={i}>
              <TableCell className="px-4 py-2.5">{i + 1}</TableCell>

              <TableCell className="px-4 py-2.5">{activity.teacher}</TableCell>
              <TableCell>{activity.subject}</TableCell>

              <TableCell className="text-center">
                {`${activity["time-start"]} - ${activity["time-end"]}`}
              </TableCell>

              <TableCell className="text-center">
                <span
                  className={`rounded-2xl px-2 py-0.5 text-sm font-medium ${activity.status.toLowerCase() === "completed" ? "bg-[#D1FADF] text-[#10B981]" : activity.status.toLowerCase() === "ongoing" ? "bg-[#F42c2c]/10 text-[#F42C2C]" : "bg-[#F59E0B]/10 text-[#F59E0B]"}`}
                >
                  {activity.status}
                </span>
              </TableCell>
              <TableCell className="text-center">{activity.class}</TableCell>
              <TableCell className="text-center">{activity.students}</TableCell>
              <TableCell className="text-center">{activity.venue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default TodayActivities

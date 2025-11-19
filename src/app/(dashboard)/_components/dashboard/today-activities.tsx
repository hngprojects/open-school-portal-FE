import React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const activityData = [
  {
    teacher: "Mr Victor Ajadi",
    subject: "Mathematics",
    method: "Physical",
    "time-start": "08:30am",
    "time-end": "09:15am",
    status: "completed",
    class: "JSS1A",
    students: 80,
    venue: "TFBRM1",
  },
  {
    teacher: "Mr Victor Ajadi",
    subject: "Mathematics",
    method: "Physical",
    "time-start": "08:30am",
    "time-end": "09:15am",
    status: "completed",
    class: "JSS1A",
    students: 80,
    venue: "TFBRM1",
  },
  {
    teacher: "Mr Victor Ajadi",
    subject: "Mathematics",
    method: "Physical",
    "time-start": "08:30am",
    "time-end": "09:15am",
    status: "completed",
    class: "JSS1A",
    students: 80,
    venue: "TFBRM1",
  },
  {
    teacher: "Mr Victor Ajadi",
    subject: "Mathematics",
    method: "Physical",
    "time-start": "08:30am",
    "time-end": "09:15am",
    status: "completed",
    class: "JSS1A",
    students: 80,
    venue: "TFBRM1",
  },
]

const TodayActivities = () => {
  return (
    <section className="mt-20 mb-10 rounded-2xl border shadow-xl">
      <h2 className="text-primary px-4 py-2.5 text-2xl font-bold">
        Today&apos;s Activities
      </h2>

      {/* table */}
      <Table>
        <TableHeader className="bg-tint h-13">
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="w-[150px] px-4 py-2.5 text-center">Teacher</TableHead>
            <TableHead className="px-4 py-2.5">Subject</TableHead>
            <TableHead className="px-4 py-2.5">Method</TableHead>
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
              <TableCell>{activity.method}</TableCell>

              <TableCell className="text-center">
                {`${activity["time-start"]} - ${activity["time-end"]}`}
              </TableCell>

              <TableCell className="text-center">{activity.status}</TableCell>
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

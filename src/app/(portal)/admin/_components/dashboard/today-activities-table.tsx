"use client"

import React from "react"
import { activityData } from "../../_data/activity-data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getActivityStatusStyles } from "../../_utils/activity-status"

const TodayActivities = ({
  highlightedIndex,
  showAll,
}: {
  highlightedIndex: number | null
  showAll: boolean
  search?: string
}) => {
  return (
    <div className="hidden lg:block">
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
            <TableRow
              id={`activity-${i}`}
              key={i}
              className={`${highlightedIndex === i ? "bg-accent/10 transition-all" : ""} ${!showAll && i >= 5 ? "hidden" : ""}`}
            >
              <TableCell className="px-4 py-2.5">{i + 1}</TableCell>
              <TableCell className="px-4 py-2.5">{activity.teacher}</TableCell>
              <TableCell>{activity.subject}</TableCell>
              <TableCell className="text-center">
                {`${activity["time-start"]} - ${activity["time-end"]}`}
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`rounded-2xl px-2 py-0.5 text-sm font-medium ${getActivityStatusStyles(
                    activity.status
                  )}`}
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
    </div>
  )
}

export default TodayActivities

"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Archive, MoreVertical } from "lucide-react"
import React from "react"

type AcademicSession = {
  session: string
  status: "Active" | "Archived"
  classCount: number
  createdAt: string
}

const data: AcademicSession[] = [
  {
    session: "2024/2025",
    status: "Active",
    classCount: 10,
    createdAt: "8/24/2023 10:06:39 PM",
  },
  {
    session: "2023/2024",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:06:39 PM",
  },
  {
    session: "2022/2023",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:06:39 PM",
  },
  {
    session: "2021/2022",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:06:39 PM",
  },
]

// Badge styling
const statusStyles = {
  Active: "bg-emerald-100 text-emerald-700",
  Archived: "bg-orange-100 text-orange-600",
}

export default function AcademicSessionsMobile() {
  return (
    <div className="mt-10 space-y-4 p-3 lg:hidden">
      {data.map((item, index) => (
        <div key={index} className="relative rounded-xl border bg-white p-4 shadow-sm">
          {/* Header */}
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-base font-semibold">{item.session}</h3>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="text-gray-600" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Eye size={16} /> View
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Edit size={16} /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                  <Archive size={16} /> Archived
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <div className="space-y-1 text-sm">
            <p>Class count: {item.classCount}</p>
            <p>Date created: {item.createdAt}</p>
            <p className="flex items-center gap-2">
              Status:
              <Badge className={`${statusStyles[item.status]} px-2 py-0.5`}>
                {item.status}
              </Badge>
            </p>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <button className="rounded-md border px-3 py-1 text-sm">Previous</button>
        <button className="bg-primary rounded-md border px-3 py-1 text-sm text-white">
          1
        </button>
        <button className="rounded-md border px-3 py-1 text-sm">2</button>
        <button className="rounded-md border px-3 py-1 text-sm">Next</button>
      </div>
    </div>
  )
}

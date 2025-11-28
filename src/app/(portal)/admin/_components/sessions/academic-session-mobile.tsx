"use client"

import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MoreVertical } from "lucide-react"
import { AcademicSession } from "@/lib/academic-session"

type Props = {
  sessions: AcademicSession[]
  onActivate: (id: string) => void
  onDelete: (id: string) => void
  isMutating?: boolean
}

export default function AcademicSessionsMobile({
  sessions,

  isMutating,
}: Props) {
  return (
    <div className="mt-2 space-y-4 p-3 lg:hidden">
      {sessions.map((item) => (
        <div key={item.id} className="relative rounded-xl border bg-white p-4 shadow-sm">
          {/* Header */}
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-base font-semibold">{item.name}</h3>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="text-gray-600" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-fit">
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  // onClick={() => onActivate(item.id)}
                  disabled={isMutating}
                >
                  <Eye size={16} /> View
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-2"
                  // onClick={() => onDelete(item.id)}
                  disabled={!item.isActive}
                >
                  <Edit size={16} /> Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <div className="text-text-secondary mt-6 space-y-4 text-sm">
            <p className="flex justify-between">
              <span>Start date: </span>
              <span className="text-[#404040]"> {item.startDate}</span>
            </p>
            <p className="flex justify-between">
              <span>End date: </span>
              <span className="text-[#404040]"> {item.endDate}</span>
            </p>
            <p className="flex justify-between">
              <span>Date created: </span>
              <span className="text-[#404040]">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </p>
            <p className="flex items-center gap-2">
              Status:
              <Badge
                className={`px-2 py-0.5 ${
                  item.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-[#FEF5E7] text-[#F59E0B]"
                }`}
              >
                {item.isActive ? "Active" : "Archived"}
              </Badge>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

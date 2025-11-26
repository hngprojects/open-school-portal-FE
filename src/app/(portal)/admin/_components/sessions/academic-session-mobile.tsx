"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Play, Trash2 } from "lucide-react"
import React from "react"
import { AcademicSession } from "@/lib/academic-session"

type Props = {
  sessions: AcademicSession[]
  onActivate: (id: string) => void
  onDelete: (id: string) => void
  isMutating?: boolean
}

export default function AcademicSessionsMobile({
  sessions,
  onActivate,
  onDelete,
  isMutating,
}: Props) {
  return (
    <div className="mt-10 space-y-4 p-3 lg:hidden">
      {sessions.map((item) => (
        <div key={item.id} className="relative rounded-xl border bg-white p-4 shadow-sm">
          {/* Header */}
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-base font-semibold">{item.name}</h3>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="text-gray-600" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-36">
                {!item.isActive && (
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => onActivate(item.id)}
                    disabled={isMutating}
                  >
                    <Play size={16} /> Activate
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="flex items-center gap-2 text-red-600"
                  onClick={() => onDelete(item.id)}
                  disabled={isMutating}
                >
                  <Trash2 size={16} /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <div className="space-y-1 text-sm">
            <p>Start: {item.startDate}</p>
            <p>End: {item.endDate}</p>
            <p>Date created: {new Date(item.createdAt).toLocaleString()}</p>
            <p className="flex items-center gap-2">
              Status:
              <Badge
                className={`px-2 py-0.5 ${
                  item.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {item.isActive ? "Active" : "Inactive"}
              </Badge>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

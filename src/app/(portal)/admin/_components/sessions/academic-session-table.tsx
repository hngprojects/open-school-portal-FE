"use client"

import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Play, Trash2 } from "lucide-react"
import { AcademicSession } from "@/lib/academic-session"

type Props = {
  sessions: AcademicSession[]
  onActivate: (id: string) => void
  onDelete: (id: string) => void
  isMutating?: boolean
}

const AcademicSessionTable = ({ sessions, onActivate, onDelete, isMutating }: Props) => {
  return (
    <div className="mt-10 hidden rounded-xl border bg-white p-4 shadow-sm lg:block">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[60px]">S/N</TableHead>
            <TableHead>Academic Session</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead className="pr-6 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sessions.map((item, index) => {
            const statusLabel = item.isActive ? "Active" : "Inactive"
            return (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell>{index + 1}</TableCell>

                <TableCell>{item.name}</TableCell>

                <TableCell>
                  <Badge
                    className={
                      item.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }
                  >
                    {statusLabel}
                  </Badge>
                </TableCell>

                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.endDate}</TableCell>

                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>

                {/* Action menu */}
                <TableCell className="pr-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="cursor-pointer text-gray-500" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-40">
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
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default AcademicSessionTable

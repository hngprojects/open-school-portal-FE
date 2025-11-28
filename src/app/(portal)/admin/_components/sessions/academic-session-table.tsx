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
import { Edit, Eye, MoreVertical } from "lucide-react"
import { AcademicSession } from "@/lib/academic-session"

type Props = {
  sessions: AcademicSession[]
  onActivate: (id: string) => void
  onDelete: (id: string) => void
  isMutating?: boolean
}

const AcademicSessionTable = ({ sessions }: Props) => {
  return (
    <div className="mt-10 hidden rounded-xl border bg-white p-4 shadow-sm lg:block">
      <Table>
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-5">S/N</TableHead>
            <TableHead className="w-60 text-center">Academic Session</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Start Date</TableHead>
            <TableHead className="text-center">End Date</TableHead>
            <TableHead className="text-center">Date and Time Created</TableHead>
            <TableHead className="pr-6 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sessions.map((item, index) => {
            const statusLabel = item.isActive ? "Active" : "Archived"
            return (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="text-center text-[#404040]">{index + 1}</TableCell>

                <TableCell className="text-center text-[#404040]">{item.name}</TableCell>

                <TableCell className="text-center">
                  <Badge
                    className={
                      item.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "border-none bg-[#FEF5E7] text-[#F59E0B]"
                    }
                  >
                    {statusLabel}
                  </Badge>
                </TableCell>

                <TableCell className="text-center text-[#404040]">
                  {item.startDate}
                </TableCell>
                <TableCell className="text-center text-[#404040]">
                  {item.endDate}
                </TableCell>

                <TableCell className="text-center text-[#404040]">
                  {new Date(item.createdAt).toLocaleString()}
                </TableCell>

                {/* Action menu */}
                <TableCell className="pr-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="cursor-pointer text-gray-500" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-fit">
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        // onClick={() => onActivate(item.id)}
                        // disabled={isMutating}
                      >
                        <Eye size={16} /> View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        // onClick={() => onDelete(item.id)}
                        // disabled={isMutating}
                        disabled={!item.isActive}
                      >
                        <Edit size={16} /> Edit
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

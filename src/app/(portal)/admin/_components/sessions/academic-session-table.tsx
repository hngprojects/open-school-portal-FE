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
import { MoreVertical, Eye, Edit, Archive } from "lucide-react"

type AcademicSession = {
  id: number
  session: string
  status: "Active" | "Archived"
  classCount: number
  createdAt: string
}

const sampleData: AcademicSession[] = [
  {
    id: 1,
    session: "2025/2026",
    status: "Active",
    classCount: 10,
    createdAt: "8/24/2023 10:6:39 PM",
  },
  {
    id: 2,
    session: "2024/2025",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:6:39 PM",
  },
  {
    id: 3,
    session: "2023/2025",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:6:39 PM",
  },
  {
    id: 4,
    session: "2022/2023",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:6:39 PM",
  },
  {
    id: 5,
    session: "2021/2022",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:6:39 PM",
  },
  {
    id: 6,
    session: "2020/2021",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:6:39 PM",
  },
  {
    id: 7,
    session: "2019/2020",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:6:39 PM",
  },
  {
    id: 8,
    session: "2018/2019",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:6:39 PM",
  },
  {
    id: 9,
    session: "2017/2018",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:6:39 PM",
  },
  {
    id: 10,
    session: "2016/2017",
    status: "Archived",
    classCount: 10,
    createdAt: "8/24/2023 10:6:39 PM",
  },
]

// Status badge colors
const statusStyles = {
  Active: "bg-emerald-100 text-emerald-700",
  Archived: "bg-orange-100 text-orange-600",
}

const AcademicSessionTable = () => {
  return (
    <div className="mt-10 hidden rounded-xl border bg-white p-4 shadow-sm lg:block">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[60px]">S/N</TableHead>
            <TableHead>Academic Session</TableHead>
            <TableHead>Badge</TableHead>
            <TableHead>Class Count</TableHead>
            <TableHead>Date and Time Created</TableHead>
            <TableHead className="pr-6 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sampleData.map((item, index) => (
            <TableRow key={item.id} className="hover:bg-gray-50">
              <TableCell>{index + 1}</TableCell>

              <TableCell>{item.session}</TableCell>

              <TableCell>
                <Badge className={`${statusStyles[item.status]}`}>{item.status}</Badge>
              </TableCell>

              <TableCell>{item.classCount} classes</TableCell>

              <TableCell>{item.createdAt}</TableCell>

              {/* Action menu */}
              <TableCell className="pr-6 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="cursor-pointer text-gray-500" />
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AcademicSessionTable

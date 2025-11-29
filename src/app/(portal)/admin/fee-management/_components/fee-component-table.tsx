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

type FeeComponent = {
  id: string
  component_name: string
  description?: string
  term?: { id: string; name: string }
  created_by: string
  amount: number
  status: string
  created_at: string
}

interface FeeComponentTableProps {
  feeComponents: FeeComponent[]
}

const FeeComponentTable: React.FC<FeeComponentTableProps> = ({ feeComponents }) => {
  console.log("Table received fee components:", feeComponents)

  // Helper function to safely format dates
  // const formatDate = (dateString?: string) => {
  //   if (!dateString) return "N/A"

  //   // try {
  //   // Try parsing as ISO string first
  //   const date = new Date(dateString)

  //   // Check if date is valid
  //   if (isNaN(date.getTime())) {
  //     console.error("Invalid date:", dateString)
  //     return dateString // Return original if can't parse
  //   }

  //   // Format the date using native JavaScript
  //   const options: Intl.DateTimeFormatOptions = {
  //     day: "2-digit",
  //     month: "short",
  //     year: "numeric",
  //   }
  //   return date.toLocaleDateString("en-GB", options)
  //   // } catch (error) {
  //   //   console.error("Date formatting error:", error, dateString)
  //   //   return "Invalid Date"
  //   // }
  // }

  if (feeComponents.length === 0) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <p className="text-gray-500">No fee components to display</p>
      </div>
    )
  }

  return (
    <div className="border-primary/30 hidden rounded-xl border p-6 lg:block">
      <div className="rounded-sm border">
        <Table className="border-[#EAECF0]">
          <TableHeader className="h-13 bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="px-4 py-2.5">Component Name</TableHead>
              <TableHead className="px-4 py-2.5">Description</TableHead>
              <TableHead className="px-4 py-2.5 text-center">Term</TableHead>
              <TableHead className="px-4 py-2.5 text-center">Created By</TableHead>
              <TableHead className="px-4 py-2.5 text-center">Amount</TableHead>
              <TableHead className="px-4 py-2.5 text-center">Status</TableHead>
              <TableHead className="px-4 py-2.5 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {feeComponents.map((fee) => {
              // console.log("Rendering fee in table:", fee.id, "created_at:", fee.created_at)

              return (
                <TableRow key={fee.id}>
                  <TableCell className="px-4 py-2.5 font-medium">
                    {fee.component_name}
                  </TableCell>
                  <TableCell className="px-4 py-2.5">
                    {fee.description || "NIL"}
                  </TableCell>
                  <TableCell className="px-4 py-2.5 text-center">
                    {fee.term?.name || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-2.5 text-center">
                    {/* {fee.created_by} */} Admin
                  </TableCell>
                  <TableCell className="px-4 py-2.5 text-center">
                    ₦{fee.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="px-4 py-2.5 text-center">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        fee.status.toLowerCase() === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {fee.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-2.5 text-center">
                    <span className="rounded-sm border px-1.5 py-1">View</span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default FeeComponentTable

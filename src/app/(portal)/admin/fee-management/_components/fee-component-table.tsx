"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

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
  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedFee, setSelectedFee] = useState<FeeComponent | null>(null)

  const handleViewClick = (fee: FeeComponent) => {
    setSelectedFee(fee)
    setOpenDrawer(true)
  }

  if (feeComponents.length === 0) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <p className="text-gray-500">No fee components to display</p>
      </div>
    )
  }

  return (
    <>
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
              {feeComponents.map((fee) => (
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
                  <TableCell className="px-4 py-2.5 text-center">Admin</TableCell>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewClick(fee)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Drawer */}
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer} direction="right">
        <DrawerContent className="w-96">
          <DrawerHeader>
            <DrawerTitle>Fee Component Details</DrawerTitle>
          </DrawerHeader>

          {/* Body */}
          <div className="space-y-2 p-4">
            {selectedFee ? (
              <>
                <p>
                  <strong>Component Name:</strong> {selectedFee.component_name}
                </p>
                <p>
                  <strong>Description:</strong> {selectedFee.description || "NIL"}
                </p>
                <p>
                  <strong>Term:</strong> {selectedFee.term?.name || "N/A"}
                </p>
                <p>
                  <strong>Created By:</strong> Admin
                </p>
                <p>
                  <strong>Amount:</strong> ₦{selectedFee.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      selectedFee.status.toLowerCase() === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedFee.status}
                  </span>
                </p>
                {/* <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedFee.created_at).toLocaleDateString()}
                </p> */}
              </>
            ) : (
              <p>No details available.</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t p-4">
            <Button variant="outline" onClick={() => setOpenDrawer(false)}>
              Close
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default FeeComponentTable

// "use client"

// import React from "react"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// type FeeComponent = {
//   id: string
//   component_name: string
//   description?: string
//   term?: { id: string; name: string }
//   created_by: string
//   amount: number
//   status: string
//   created_at: string
// }

// interface FeeComponentTableProps {
//   feeComponents: FeeComponent[]
// }

// const FeeComponentTable: React.FC<FeeComponentTableProps> = ({ feeComponents }) => {
//   // console.log("Table received fee components:", feeComponents)

//   if (feeComponents.length === 0) {
//     return (
//       <div className="rounded-xl border p-6 text-center">
//         <p className="text-gray-500">No fee components to display</p>
//       </div>
//     )
//   }

//   return (
//     <div className="border-primary/30 hidden rounded-xl border p-6 lg:block">
//       <div className="rounded-sm border">
//         <Table className="border-[#EAECF0]">
//           <TableHeader className="h-13 bg-[#F9FAFB]">
//             <TableRow>
//               <TableHead className="px-4 py-2.5">Component Name</TableHead>
//               <TableHead className="px-4 py-2.5">Description</TableHead>
//               <TableHead className="px-4 py-2.5 text-center">Term</TableHead>
//               <TableHead className="px-4 py-2.5 text-center">Created By</TableHead>
//               <TableHead className="px-4 py-2.5 text-center">Amount</TableHead>
//               <TableHead className="px-4 py-2.5 text-center">Status</TableHead>
//               <TableHead className="px-4 py-2.5 text-center">Action</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {feeComponents.map((fee) => {
//               return (
//                 <TableRow key={fee.id}>
//                   <TableCell className="px-4 py-2.5 font-medium">
//                     {fee.component_name}
//                   </TableCell>
//                   <TableCell className="px-4 py-2.5">
//                     {fee.description || "NIL"}
//                   </TableCell>
//                   <TableCell className="px-4 py-2.5 text-center">
//                     {fee.term?.name || "N/A"}
//                   </TableCell>
//                   <TableCell className="px-4 py-2.5 text-center">
//                     {/* {fee.created_by} */} Admin
//                   </TableCell>
//                   <TableCell className="px-4 py-2.5 text-center">
//                     ₦{fee.amount.toLocaleString()}
//                   </TableCell>
//                   <TableCell className="px-4 py-2.5 text-center">
//                     <span
//                       className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
//                         fee.status.toLowerCase() === "active"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {fee.status}
//                     </span>
//                   </TableCell>
//                   <TableCell className="px-4 py-2.5 text-center">
//                     <span className="rounded-sm border px-1.5 py-1">View</span>
//                   </TableCell>
//                 </TableRow>
//               )
//             })}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }

// export default FeeComponentTable

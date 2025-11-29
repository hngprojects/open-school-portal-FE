"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

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

interface FeeComponentGridProps {
  feeComponents: FeeComponent[]
}

const FeeComponentGrid: React.FC<FeeComponentGridProps> = ({ feeComponents }) => {
  if (feeComponents.length === 0) {
    return <div className="py-8 text-center text-gray-500">No fee components found</div>
  }

  return (
    <div className="flex flex-col gap-4 lg:hidden">
      {feeComponents.map((fee) => (
        <Card key={fee.id} className="overflow-hidden p-0!">
          <CardHeader className="border-b bg-[#F9FAFB] px-4 py-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-[#313131]">{fee.component_name}</h3>
                {fee.description && (
                  <p className="mt-1 text-sm text-gray-600">{fee.description}</p>
                )}
              </div>
              <span
                className={`ml-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  fee.status.toLowerCase() === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {fee.status}
              </span>
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-3 p-4">
            {/* Term */}
            <div>
              <p className="text-xs text-gray-500">Term</p>
              <p className="mt-1 font-medium text-gray-900">{fee.term?.name || "N/A"}</p>
            </div>

            {/* Amount */}
            <div>
              <p className="text-xs text-gray-500">Amount</p>
              <p className="mt-1 font-medium text-gray-900">
                ₦{fee.amount.toLocaleString()}
              </p>
            </div>

            {/* Created By */}
            <div>
              <p className="text-xs text-gray-500">Created By</p>
              <p className="mt-1 font-medium text-gray-900">Admin</p>
            </div>

            {/* Action */}
            <div className="flex items-end">
              <button className="rounded-sm border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                View
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default FeeComponentGrid
// "use client"

// import React from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

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

// interface FeeComponentGridProps {
//   feeComponents: FeeComponent[]
// }

// const FeeComponentGrid: React.FC<FeeComponentGridProps> = ({ feeComponents }) => {
//   // Helper function to safely format dates
//   const formatDate = (dateString?: string) => {
//     if (!dateString) return "N/A"

//     try {
//       // Try parsing as ISO string first
//       const date = new Date(dateString)

//       // Check if date is valid
//       if (isNaN(date.getTime())) {
//         console.error("Invalid date:", dateString)
//         return dateString // Return original if can't parse
//       }

//       // Format the date
//       const options: Intl.DateTimeFormatOptions = {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//       return date.toLocaleDateString("en-GB", options)
//     } catch (error) {
//       console.error("Date formatting error:", error, dateString)
//       return "Invalid Date"
//     }
//   }

//   if (feeComponents.length === 0) {
//     return <div className="py-8 text-center text-gray-500">No fee components found</div>
//   }

//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//       {feeComponents.map((fee) => {
//         console.log("Rendering fee:", fee.id, "created_at:", fee.created_at)

//         return (
//           <Card key={fee.id}>
//             <CardHeader>
//               <CardTitle className="text-lg">{fee.component_name}</CardTitle>
//               <p className={fee.status === "active" ? "default" : "secondary"}>
//                 {fee.status}
//               </p>
//             </CardHeader>
//             <CardContent className="space-y-2 text-sm">
//               {fee.description && (
//                 <div>
//                   <span className="font-medium">Description: </span>
//                   <span className="text-gray-600">{fee.description}</span>
//                 </div>
//               )}
//               <div>
//                 <span className="font-medium">Term: </span>
//                 <span className="text-gray-600">{fee.term?.name || "N/A"}</span>
//               </div>
//               <div>
//                 <span className="font-medium">Amount: </span>
//                 <span className="text-gray-600">₦{fee.amount.toLocaleString()}</span>
//               </div>
//               <div>
//                 <span className="font-medium">Created By: </span>
//                 <span className="text-gray-600">{fee.created_by}</span>
//               </div>
//               <div>
//                 <span className="font-medium">Created: </span>
//                 <span className="text-gray-600">{formatDate(fee.created_at)}</span>
//               </div>
//             </CardContent>
//           </Card>
//         )
//       })}
//     </div>
//   )
// }

// export default FeeComponentGrid

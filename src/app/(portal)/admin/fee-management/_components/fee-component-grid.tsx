"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeactivateFee } from "../_hooks/use-fees" // ← your new hook

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
  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedFee, setSelectedFee] = useState<FeeComponent | null>(null)

  const [confirmOpen, setConfirmOpen] = useState(false)

  // Mutation — Safe to pass empty string; execute only when we click deactivate
  const deactivateMutation = useDeactivateFee(selectedFee?.id || "")

  const handleViewClick = (fee: FeeComponent) => {
    setSelectedFee(fee)
    setOpenDrawer(true)
  }

  const handleDeactivate = () => {
    if (!selectedFee) return

    deactivateMutation.mutate("No longer applicable for current academic year", {
      onSuccess: () => {
        setConfirmOpen(false)
        setOpenDrawer(false)
      },
    })
  }

  if (feeComponents.length === 0) {
    return <div className="py-8 text-center text-gray-500">No fee components found</div>
  }

  return (
    <>
      {/* Mobile Cards */}
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
                {/* <span
                  className={`ml-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    fee.status.toLowerCase() === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {fee.status}
                </span> */}
              </div>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-3 p-4">
              <div>
                <p className="text-xs text-gray-500">Term</p>
                <p className="mt-1 font-medium text-gray-900">
                  {fee.term?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="mt-1 font-medium text-gray-900">
                  ₦{fee.amount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Created By</p>
                <p className="mt-1 font-medium text-gray-900">Admin</p>
              </div>

              <div className="flex items-end">
                <Button size="sm" variant="outline" onClick={() => handleViewClick(fee)}>
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Drawer */}
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="w-96">
          <DrawerHeader>
            <DrawerTitle>Fee Component Details</DrawerTitle>
          </DrawerHeader>

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
                  <strong>Created By:</strong> {selectedFee.created_by}
                </p>
                <p>
                  <strong>Amount:</strong> ₦{selectedFee.amount.toLocaleString()}
                </p>
                {/* <p>
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
                </p> */}
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedFee.created_at).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p>No details available.</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t p-4">
            <Button variant="outline" size="lg" onClick={() => setOpenDrawer(false)}>
              Close
            </Button>

            {selectedFee?.status.toLowerCase() === "active" && (
              <Button
                size="lg"
                variant="destructive"
                onClick={() => setConfirmOpen(true)}
                disabled={deactivateMutation.isPending}
              >
                {deactivateMutation.isPending ? "Deleting..." : "Deleting"}
              </Button>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Confirm Deactivation */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Fee Component?</AlertDialogTitle>
            <AlertDialogDescription>
              This fee component will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deactivateMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeactivate}
              disabled={deactivateMutation.isPending}
            >
              {deactivateMutation.isPending ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default FeeComponentGrid

// "use client"

// import React, { useState } from "react"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
// import { Button } from "@/components/ui/button"

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
//   const [openDrawer, setOpenDrawer] = useState(false)
//   const [selectedFee, setSelectedFee] = useState<FeeComponent | null>(null)

//   const handleViewClick = (fee: FeeComponent) => {
//     setSelectedFee(fee)
//     setOpenDrawer(true)
//   }

//   if (feeComponents.length === 0) {
//     return <div className="py-8 text-center text-gray-500">No fee components found</div>
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-4 lg:hidden">
//         {feeComponents.map((fee) => (
//           <Card key={fee.id} className="overflow-hidden p-0!">
//             <CardHeader className="border-b bg-[#F9FAFB] px-4 py-3">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-[#313131]">{fee.component_name}</h3>
//                   {fee.description && (
//                     <p className="mt-1 text-sm text-gray-600">{fee.description}</p>
//                   )}
//                 </div>
//                 <span
//                   className={`ml-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
//                     fee.status.toLowerCase() === "active"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   {fee.status}
//                 </span>
//               </div>
//             </CardHeader>

//             <CardContent className="grid grid-cols-2 gap-3 p-4">
//               {/* Term */}
//               <div>
//                 <p className="text-xs text-gray-500">Term</p>
//                 <p className="mt-1 font-medium text-gray-900">
//                   {fee.term?.name || "N/A"}
//                 </p>
//               </div>

//               {/* Amount */}
//               <div>
//                 <p className="text-xs text-gray-500">Amount</p>
//                 <p className="mt-1 font-medium text-gray-900">
//                   ₦{fee.amount.toLocaleString()}
//                 </p>
//               </div>

//               {/* Created By */}
//               <div>
//                 <p className="text-xs text-gray-500">Created By</p>
//                 <p className="mt-1 font-medium text-gray-900">Admin</p>
//               </div>

//               {/* Action */}
//               <div className="flex items-end">
//                 <Button size="sm" variant="outline" onClick={() => handleViewClick(fee)}>
//                   View
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Drawer */}
//       <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
//         <DrawerContent className="w-96">
//           <DrawerHeader>
//             <DrawerTitle>Fee Component Details</DrawerTitle>
//           </DrawerHeader>

//           {/* Drawer Body */}
//           <div className="space-y-2 p-4">
//             {selectedFee ? (
//               <>
//                 <p>
//                   <strong>Component Name:</strong> {selectedFee.component_name}
//                 </p>
//                 <p>
//                   <strong>Description:</strong> {selectedFee.description || "NIL"}
//                 </p>
//                 <p>
//                   <strong>Term:</strong> {selectedFee.term?.name || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Created By:</strong> {selectedFee.created_by}
//                 </p>
//                 <p>
//                   <strong>Amount:</strong> ₦{selectedFee.amount.toLocaleString()}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span
//                     className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
//                       selectedFee.status.toLowerCase() === "active"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {selectedFee.status}
//                   </span>
//                 </p>
//                 <p>
//                   <strong>Created At:</strong>{" "}
//                   {new Date(selectedFee.created_at).toLocaleDateString()}
//                 </p>
//               </>
//             ) : (
//               <p>No details available.</p>
//             )}
//           </div>

//           {/* Drawer Footer */}
//           <div className="flex justify-end border-t p-4">
//             <Button variant="outline" size="lg" onClick={() => setOpenDrawer(false)}>
//               Close
//             </Button>
//             <Button>Deactivate</Button>
//           </div>
//         </DrawerContent>
//       </Drawer>
//     </>
//   )
// }

// export default FeeComponentGrid

// // "use client"

// // import React from "react"
// // import { Card, CardContent, CardHeader } from "@/components/ui/card"

// // type FeeComponent = {
// //   id: string
// //   component_name: string
// //   description?: string
// //   term?: { id: string; name: string }
// //   created_by: string
// //   amount: number
// //   status: string
// //   created_at: string
// // }

// // interface FeeComponentGridProps {
// //   feeComponents: FeeComponent[]
// // }

// // const FeeComponentGrid: React.FC<FeeComponentGridProps> = ({ feeComponents }) => {
// //   if (feeComponents.length === 0) {
// //     return <div className="py-8 text-center text-gray-500">No fee components found</div>
// //   }

// //   return (
// //     <div className="flex flex-col gap-4 lg:hidden">
// //       {feeComponents.map((fee) => (
// //         <Card key={fee.id} className="overflow-hidden p-0!">
// //           <CardHeader className="border-b bg-[#F9FAFB] px-4 py-3">
// //             <div className="flex items-start justify-between">
// //               <div className="flex-1">
// //                 <h3 className="font-semibold text-[#313131]">{fee.component_name}</h3>
// //                 {fee.description && (
// //                   <p className="mt-1 text-sm text-gray-600">{fee.description}</p>
// //                 )}
// //               </div>
// //               <span
// //                 className={`ml-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
// //                   fee.status.toLowerCase() === "active"
// //                     ? "bg-green-100 text-green-800"
// //                     : "bg-gray-100 text-gray-800"
// //                 }`}
// //               >
// //                 {fee.status}
// //               </span>
// //             </div>
// //           </CardHeader>

// //           <CardContent className="grid grid-cols-2 gap-3 p-4">
// //             {/* Term */}
// //             <div>
// //               <p className="text-xs text-gray-500">Term</p>
// //               <p className="mt-1 font-medium text-gray-900">{fee.term?.name || "N/A"}</p>
// //             </div>

// //             {/* Amount */}
// //             <div>
// //               <p className="text-xs text-gray-500">Amount</p>
// //               <p className="mt-1 font-medium text-gray-900">
// //                 ₦{fee.amount.toLocaleString()}
// //               </p>
// //             </div>

// //             {/* Created By */}
// //             <div>
// //               <p className="text-xs text-gray-500">Created By</p>
// //               <p className="mt-1 font-medium text-gray-900">Admin</p>
// //             </div>

// //             {/* Action */}
// //             <div className="flex items-end">
// //               <button className="rounded-sm border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
// //                 View
// //               </button>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   )
// // }

// // export default FeeComponentGrid

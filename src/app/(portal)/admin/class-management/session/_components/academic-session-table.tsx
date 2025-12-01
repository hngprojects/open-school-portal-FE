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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MoreVertical } from "lucide-react"
import SessionDrawer from "./session-drawer"
import { AcademicSession } from "@/lib/academic-session"
import { useRouter } from "next/navigation"

type Props = {
  sessions: AcademicSession[]
}

const AcademicSessionTable = ({ sessions }: Props) => {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selected, setSelected] = useState<AcademicSession | null>(null)

  // VIEW session in drawer
  const viewSession = (session: AcademicSession) => {
    setSelected(session)
    setDrawerOpen(true)
  }

  // EDIT session -> navigate to create/edit page with query param
  const editSession = (id: string) => {
    router.push(`/admin/class-management/session/create-session?id=${id}`)
  }

  return (
    <>
      <div className="mt-10 hidden rounded-xl border bg-white p-4 shadow-sm lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead className="text-center">Academic Session</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Start Date</TableHead>
              <TableHead className="text-center">End Date</TableHead>
              <TableHead className="text-center">Created At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sessions.map((item, index) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={
                      item.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : item.status === "Inactive"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-yellow-100 text-yellow-600"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{item.startDate}</TableCell>
                <TableCell className="text-center">{item.endDate}</TableCell>
                <TableCell className="text-center">
                  {new Date(item.createdAt).toLocaleString()}
                </TableCell>

                <TableCell className="pr-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="cursor-pointer text-gray-500" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={() => viewSession(item)}
                      >
                        <Eye size={16} /> View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={() => editSession(item.id)}
                        disabled={item.status !== "Active"}
                      >
                        <Edit size={16} /> Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Drawer for VIEW ONLY */}
      <SessionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        session={selected}
      />
    </>
  )
}

export default AcademicSessionTable

// "use client"

// import React, { useState } from "react"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Badge } from "@/components/ui/badge"
// import { Edit, Eye, MoreVertical } from "lucide-react"
// import SessionDrawer from "./session-drawer"
// import { AcademicSession } from "@/lib/academic-session"
// import { useRouter } from "next/navigation"

// type Props = {
//   sessions: AcademicSession[]
// }

// const AcademicSessionTable = ({ sessions }: Props) => {
//   const router = useRouter()
//   const [drawerOpen, setDrawerOpen] = useState(false)
//   const [selected, setSelected] = useState<AcademicSession | null>(null)

//   const openDrawer = (session: AcademicSession) => {
//     setSelected(session)
//     setDrawerOpen(true)
//   }

//   const editSession = (id: string) => {
//     router.push(`/admin/class-management/session/create-session?id=${id}`)
//   }

//   return (
//     <>
//       <div className="mt-10 hidden rounded-xl border bg-white p-4 shadow-sm lg:block">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>S/N</TableHead>
//               <TableHead className="text-center">Academic Session</TableHead>
//               <TableHead className="text-center">Status</TableHead>
//               <TableHead className="text-center">Start Date</TableHead>
//               <TableHead className="text-center">End Date</TableHead>
//               <TableHead className="text-center">Created At</TableHead>
//               <TableHead className="text-right">Action</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {sessions.map((item, index) => (
//               <TableRow key={item.id} className="hover:bg-gray-50">
//                 <TableCell className="text-center">{index + 1}</TableCell>
//                 <TableCell className="text-center">{item.name}</TableCell>

//                 <TableCell className="text-center">
//                   <Badge
//                     className={
//                       item.status === "Active"
//                         ? "bg-emerald-100 text-emerald-700"
//                         : item.status === "Inactive"
//                           ? "bg-gray-200 text-gray-700"
//                           : "bg-yellow-100 text-yellow-600"
//                     }
//                   >
//                     {item.status}
//                   </Badge>
//                 </TableCell>

//                 <TableCell className="text-center">{item.startDate}</TableCell>
//                 <TableCell className="text-center">{item.endDate}</TableCell>
//                 <TableCell className="text-center">
//                   {new Date(item.createdAt).toLocaleString()}
//                 </TableCell>

//                 <TableCell className="pr-6 text-right">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger>
//                       <MoreVertical className="cursor-pointer text-gray-500" />
//                     </DropdownMenuTrigger>

//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem
//                         className="flex items-center gap-2"
//                         onClick={() => openDrawer(item)}
//                       >
//                         <Eye size={16} /> View
//                       </DropdownMenuItem>

//                       <DropdownMenuItem
//                         className="flex items-center gap-2"
//                         onClick={() => editSession(item.id)}
//                         disabled={item.status !== "Active"}
//                       >
//                         <Edit size={16} /> Edit
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <SessionDrawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         session={selected}
//       />
//     </>
//   )
// }

// export default AcademicSessionTable

// // "use client"

// // import React, { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table"
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu"
// // import { Badge } from "@/components/ui/badge"
// // import { Edit, Eye, MoreVertical } from "lucide-react"
// // import SessionDrawer from "./session-drawer"
// // import { AcademicSession } from "@/lib/academic-session"

// // type Props = {
// //   sessions: AcademicSession[]
// // }

// // const AcademicSessionTable = ({ sessions }: Props) => {
// //   const [drawerOpen, setDrawerOpen] = useState(false)
// //   const [selected, setSelected] = useState<AcademicSession | null>(null)
// //   const [mode, setMode] = useState<"view" | "edit">("view")

// //   const openDrawer = (session: AcademicSession, type: "view" | "edit") => {
// //     setSelected(session)
// //     setMode(type)
// //     setDrawerOpen(true)
// //   }

// //   return (
// //     <>
// //       {/* TABLE */}
// //       <div className="mt-10 hidden rounded-xl border bg-white p-4 shadow-sm lg:block">
// //         <Table>
// //           <TableHeader>
// //             <TableRow>
// //               <TableHead>S/N</TableHead>
// //               <TableHead className="text-center">Academic Session</TableHead>
// //               <TableHead className="text-center">Status</TableHead>
// //               <TableHead className="text-center">Start Date</TableHead>
// //               <TableHead className="text-center">End Date</TableHead>
// //               <TableHead className="text-center">Created At</TableHead>
// //               <TableHead className="text-right">Action</TableHead>
// //             </TableRow>
// //           </TableHeader>

// //           <TableBody>
// //             {sessions.map((item, index) => (
// //               <TableRow key={item.id} className="hover:bg-gray-50">
// //                 <TableCell className="text-center">{index + 1}</TableCell>
// //                 <TableCell className="text-center">{item.name}</TableCell>

// //                 <TableCell className="text-center">
// //                   <Badge
// //                     className={
// //                       item.status === "Active"
// //                         ? "bg-emerald-100 text-emerald-700"
// //                         : item.status === "Inactive"
// //                           ? "bg-gray-200 text-gray-700"
// //                           : "bg-yellow-100 text-yellow-600"
// //                     }
// //                   >
// //                     {item.status}
// //                   </Badge>
// //                 </TableCell>

// //                 <TableCell className="text-center">{item.startDate}</TableCell>
// //                 <TableCell className="text-center">{item.endDate}</TableCell>
// //                 <TableCell className="text-center">
// //                   {new Date(item.createdAt).toLocaleString()}
// //                 </TableCell>

// //                 <TableCell className="pr-6 text-right">
// //                   <DropdownMenu>
// //                     <DropdownMenuTrigger>
// //                       <MoreVertical className="cursor-pointer text-gray-500" />
// //                     </DropdownMenuTrigger>

// //                     <DropdownMenuContent align="end">
// //                       <DropdownMenuItem
// //                         className="flex items-center gap-2"
// //                         onClick={() => openDrawer(item, "view")}
// //                       >
// //                         <Eye size={16} /> View
// //                       </DropdownMenuItem>

// //                       <DropdownMenuItem
// //                         disabled={item.status !== "Active"}
// //                         className="flex items-center gap-2"
// //                         onClick={() => openDrawer(item, "edit")}
// //                       >
// //                         <Edit size={16} /> Edit
// //                       </DropdownMenuItem>
// //                     </DropdownMenuContent>
// //                   </DropdownMenu>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </div>

// //       {/* DRAWER */}
// //       <SessionDrawer
// //         open={drawerOpen}
// //         onClose={() => setDrawerOpen(false)}
// //         session={selected}
// //         mode={mode}
// //       />
// //     </>
// //   )
// // }

// // export default AcademicSessionTable

// // // "use client"

// // // import React from "react"
// // // import { useRouter } from "next/navigation"
// // // import {
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableHead,
// // //   TableHeader,
// // //   TableRow,
// // // } from "@/components/ui/table"
// // // import {
// // //   DropdownMenu,
// // //   DropdownMenuContent,
// // //   DropdownMenuItem,
// // //   DropdownMenuTrigger,
// // // } from "@/components/ui/dropdown-menu"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Edit, Eye, MoreVertical } from "lucide-react"
// // // import { AcademicSession } from "@/lib/academic-session"

// // // type Props = {
// // //   sessions: AcademicSession[]
// // // }

// // // const AcademicSessionTable = ({ sessions }: Props) => {
// // //   const router = useRouter()
// // //   return (
// // //     <div className="mt-10 hidden rounded-xl border bg-white p-4 shadow-sm lg:block">
// // //       <Table>
// // //         <TableHeader>
// // //           <TableRow>
// // //             <TableHead>S/N</TableHead>
// // //             <TableHead className="text-center">Academic Session</TableHead>
// // //             <TableHead className="text-center">Status</TableHead>
// // //             <TableHead className="text-center">Start Date</TableHead>
// // //             <TableHead className="text-center">End Date</TableHead>
// // //             <TableHead className="text-center">Created At</TableHead>
// // //             <TableHead className="text-right">Action</TableHead>
// // //           </TableRow>
// // //         </TableHeader>

// // //         <TableBody>
// // //           {sessions.map((item, index) => (
// // //             <TableRow key={item.id} className="hover:bg-gray-50">
// // //               <TableCell className="text-center">{index + 1}</TableCell>

// // //               <TableCell className="text-center">{item.name}</TableCell>

// // //               <TableCell className="text-center">
// // //                 <Badge
// // //                   className={
// // //                     item.status === "Active"
// // //                       ? "bg-emerald-100 text-emerald-700"
// // //                       : item.status === "Inactive"
// // //                         ? "bg-gray-200 text-gray-700"
// // //                         : "bg-yellow-100 text-yellow-600"
// // //                   }
// // //                 >
// // //                   {item.status}
// // //                 </Badge>
// // //               </TableCell>

// // //               <TableCell className="text-center">{item.startDate}</TableCell>
// // //               <TableCell className="text-center">{item.endDate}</TableCell>

// // //               <TableCell className="text-center">
// // //                 {new Date(item.createdAt).toLocaleString()}
// // //               </TableCell>

// // //               <TableCell className="pr-6 text-right">
// // //                 <DropdownMenu>
// // //                   <DropdownMenuTrigger>
// // //                     <MoreVertical className="cursor-pointer text-gray-500" />
// // //                   </DropdownMenuTrigger>

// // //                   <DropdownMenuContent align="end">
// // //                     <DropdownMenuItem
// // //                       className="flex items-center gap-2"
// // //                       onClick={() => router.push(`/admin/sessions/${session.id}`)}
// // //                     >
// // //                       <Eye size={16} /> View
// // //                     </DropdownMenuItem>

// // //                     <DropdownMenuItem
// // //                       disabled={item.status !== "Active"}
// // //                       className="flex items-center gap-2"
// // //                     >
// // //                       <Edit size={16} /> Edit
// // //                     </DropdownMenuItem>
// // //                   </DropdownMenuContent>
// // //                 </DropdownMenu>
// // //               </TableCell>
// // //             </TableRow>
// // //           ))}
// // //         </TableBody>
// // //       </Table>
// // //     </div>
// // //   )
// // // }

// // // export default AcademicSessionTable

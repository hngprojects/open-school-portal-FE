"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import { Button } from "@/components/ui/button"
import { ListFilter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import AcademicSessionTable from "./academic-session-table"
import AcademicSessionsMobile from "./academic-session-mobile"
import { useAcademicSessions } from "../_hooks/use-session"
import EmptyState from "../../../_components/empty-state"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

const SessionsPage = () => {
  const { data, isLoading, isError, error } = useAcademicSessions()

  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "archived">("all")

  const sessions = useMemo(() => data?.data ?? [], [data])

  const filteredSessions = useMemo(() => {
    let items = sessions

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter((s) => {
        const status = (s.status ?? "").toLowerCase()
        return (
          s.name.toLowerCase().includes(q) ||
          s.startDate.toLowerCase().includes(q) ||
          s.endDate.toLowerCase().includes(q) ||
          status.includes(q)
        )
      })
    }

    if (filter === "active") items = items.filter((s) => s.status === "Active")
    if (filter === "inactive") items = items.filter((s) => s.status === "Inactive")
    if (filter === "archived") items = items.filter((s) => s.status === "Archived")

    return items
  }, [sessions, searchQuery, filter])

  const renderContent = () => {
    if (isLoading) return <div>Loading sessions...</div>
    if (isError)
      return (
        <div>{error instanceof Error ? error.message : "Failed to load sessions."}</div>
      )
    if (!filteredSessions.length)
      return (
        <EmptyState
          title="No Academic Sessions Yet"
          description="Create your first session to start managing terms, classes, and school activities."
          buttonText="Create Session"
          buttonHref="/admin/class-management/session/create-session"
        />
      )

    return (
      <>
        <AcademicSessionsMobile sessions={filteredSessions} />
        <AcademicSessionTable sessions={filteredSessions} />
      </>
    )
  }

  return (
    <div>
      <header className="flex flex-col justify-between gap-4 lg:flex-row">
        <DashboardTitle
          heading="Academic Sessions"
          description="View, manage, or create academic sessions"
        />
        <Button asChild className="h-12 w-full lg:w-90">
          <Link
            href="/admin/class-management/session/create-session"
            className="flex items-center gap-2"
          >
            <Plus />
            Create Session
          </Link>
        </Button>
      </header>

      <div className="flex items-center justify-between gap-4">
        <div className="relative my-4 w-full">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#64748B]" />
          <Input
            placeholder="Search Sessions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-h-10 w-full max-w-[20rem] border pl-8"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-fit rounded-md border p-[9px] hover:bg-gray-50">
              <ListFilter className="size-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel className="text-xs text-gray-500">
              Filter by
            </DropdownMenuLabel>

            <DropdownMenuItem onClick={() => setFilter("all")}>
              All Sessions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("inactive")}>
              Inactive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("archived")}>
              Archived
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {renderContent()}
    </div>
  )
}

export default SessionsPage

// "use client"

// import React, { useState, useMemo } from "react"
// import Link from "next/link"
// import DashboardTitle from "@/components/dashboard/dashboard-title"
// import { Button } from "@/components/ui/button"
// import { ListFilter, Plus, Search } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import AcademicSessionTable from "./academic-session-table"
// import AcademicSessionsMobile from "./academic-session-mobile"
// import { useAcademicSessions } from "../_hooks/use-session"
// import EmptyState from "../../../_components/empty-state"

// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
// } from "@/components/ui/dropdown-menu"

// const SessionsPage = () => {
//   const { data, isLoading, isError, error } = useAcademicSessions()

//   const [searchQuery, setSearchQuery] = useState("")
//   const [filter, setFilter] = useState<"all" | "active" | "inactive" | "archived">("all")

//   const sessions = useMemo(() => data?.data ?? [], [data])

//   // 🔍 FILTER + SEARCH
//   const filteredSessions = useMemo(() => {
//     let items = sessions

//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase()
//       items = items.filter((s) => {
//         const status = (s.status ?? "").toLowerCase()
//         return (
//           s.name.toLowerCase().includes(q) ||
//           // s.academicYear.toLowerCase().includes(q) ||
//           s.startDate.toLowerCase().includes(q) ||
//           s.endDate.toLowerCase().includes(q) ||
//           status.includes(q)
//         )
//       })
//     }

//     if (filter === "active") items = items.filter((s) => s.status === "Active")
//     if (filter === "inactive") items = items.filter((s) => s.status === "Inactive")
//     if (filter === "archived") items = items.filter((s) => s.status === "Archived")

//     return items
//   }, [sessions, searchQuery, filter])

//   // 🔄 CONTENT RENDERING
//   const renderContent = () => {
//     if (isLoading) {
//       return (
//         <div className="text-text-secondary mt-10 flex h-60 animate-pulse items-center justify-center rounded-md border bg-white p-6 text-sm shadow-sm">
//           Loading sessions...
//         </div>
//       )
//     }

//     if (isError) {
//       return (
//         <div className="mt-10 flex h-60 items-center justify-center rounded-md border bg-white p-6 text-sm text-red-600 shadow-sm">
//           {error instanceof Error ? error.message : "Failed to load sessions."}
//         </div>
//       )
//     }

//     if (!filteredSessions.length) {
//       return (
//         <div className="mt-6">
//           <EmptyState
//             title="No Academic Sessions Yet"
//             description="Create your first session to start managing terms, classes, and school activities."
//             buttonText="Create Session"
//             buttonHref="/admin/class-management/session/create-session"
//           />
//         </div>
//       )
//     }

//     return (
//       <>
//         <AcademicSessionsMobile sessions={filteredSessions} />

//         <AcademicSessionTable sessions={filteredSessions} />
//       </>
//     )
//   }

//   return (
//     <div>
//       <header className="flex flex-col justify-between gap-4 lg:flex-row">
//         <DashboardTitle
//           heading="Create Session"
//           description="View, manage, or create academic sessions"
//         />
//         <Button asChild className="h-12 w-full lg:w-90">
//           <Link
//             href="/admin/class-management/session/create-session"
//             className="flex items-center gap-2"
//           >
//             <Plus />
//             Create Session
//           </Link>
//         </Button>
//       </header>

//       <div className="flex items-center justify-between gap-4">
//         {/* SEARCH BAR */}
//         <div className="relative my-4 w-full">
//           <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#64748B]" />
//           <Input
//             placeholder="Search Sessions"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="max-h-10 w-full max-w-[20rem] border pl-8"
//           />
//         </div>

//         {/* FILTER DROPDOWN */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="w-fit rounded-md border p-[9px] hover:bg-gray-50">
//               <ListFilter className="size-4" />
//             </button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent align="end" className="w-40">
//             <DropdownMenuLabel className="text-xs text-gray-500">
//               Filter by
//             </DropdownMenuLabel>

//             <DropdownMenuItem onClick={() => setFilter("all")}>
//               All Sessions
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setFilter("active")}>
//               Active
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setFilter("inactive")}>
//               Inactive
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setFilter("archived")}>
//               Archived
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {renderContent()}
//     </div>
//   )
// }

// export default SessionsPage

// // "use client"

// // import React, { useState, useMemo } from "react"
// // import Link from "next/link"
// // import { toast } from "sonner"
// // import DashboardTitle from "@/components/dashboard/dashboard-title"
// // import { Button } from "@/components/ui/button"
// // import { ListFilter, Plus, Search } from "lucide-react"
// // import { Input } from "@/components/ui/input"
// // import AcademicSessionTable from "./academic-session-table"
// // import AcademicSessionsMobile from "./academic-session-mobile"
// // import {
// //   useAcademicSessions,
// //   useActivateAcademicSession,
// //   useDeleteAcademicSession,
// // } from "../_hooks/use-session"
// // import EmptyState from "../../../_components/empty-state"

// // import {
// //   DropdownMenu,
// //   DropdownMenuTrigger,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// // } from "@/components/ui/dropdown-menu"

// // const SessionsPage = () => {
// //   const { data, isLoading, isError, error } = useAcademicSessions()
// //   const { mutate: activateSession, isPending: isActivating } =
// //     useActivateAcademicSession()
// //   const { mutate: deleteSession, isPending: isDeleting } = useDeleteAcademicSession()

// //   // SEARCH STATE
// //   const [searchQuery, setSearchQuery] = useState("")

// //   const isMutating = isActivating || isDeleting
// //   // const sessions = data?.data ?? []

// //   const [filter, setFilter] = useState<"all" | "active" | "archived" | "inactive">("all")

// //   const sessions = useMemo(() => {
// //     return data?.data ?? []
// //   }, [data])

// //   // 🔍 FILTER LOGIC
// //   const filteredSessions = useMemo(() => {
// //     let items = sessions

// //     // TEXT SEARCH FILTER
// //     if (searchQuery.trim()) {
// //       const q = searchQuery.toLowerCase()
// //       items = items.filter((s) => {
// //         const status = s.isActive ? "active" : "archived"
// //         return (
// //           s.name.toLowerCase().includes(q) ||
// //           s.startDate.toLowerCase().includes(q) ||
// //           s.endDate.toLowerCase().includes(q) ||
// //           status.includes(q)
// //         )
// //       })
// //     }

// //     // STATUS FILTER
// //     if (filter === "active") {
// //       items = items.filter((s) => s.isActive)
// //     }

// //     if (filter === "archived") {
// //       items = items.filter((s) => !s.isActive)
// //     }

// //     if (filter === "archived") {
// //       items = items.filter((s) => !s.isActive)
// //     }

// //     return items
// //   }, [sessions, searchQuery, filter])

// //   const handleActivate = (id: string) =>
// //     activateSession(id, {
// //       onSuccess: () => {
// //         toast.success("Session activated successfully")
// //       },
// //       onError: (err) => {
// //         toast.error(err.message)
// //       },
// //     })

// //   const handleDelete = (id: string) =>
// //     deleteSession(id, {
// //       onSuccess: () => {
// //         toast.success("Session deleted")
// //       },
// //       onError: (err) => {
// //         toast.error(err.message)
// //       },
// //     })

// //   const renderContent = () => {
// //     if (isLoading) {
// //       return (
// //         <div className="text-text-secondary mt-10 flex h-60 animate-pulse items-center justify-center rounded-md border bg-white p-6 text-sm shadow-sm">
// //           Loading sessions...
// //         </div>
// //       )
// //     }

// //     if (isError) {
// //       return (
// //         <div className="mt-10 flex h-60 items-center justify-center rounded-md border bg-white p-6 text-sm text-red-600 shadow-sm">
// //           {error instanceof Error ? error.message : "Failed to load sessions."}
// //         </div>
// //       )
// //     }

// //     if (!filteredSessions.length) {
// //       return (
// //         <div className="mt-6">
// //           <EmptyState
// //             title="No Academic Sessions Yet"
// //             description="Create your first session to start managing terms, classes, and school activities."
// //             buttonText="Create Session"
// //             buttonHref="/admin/class-management/session/create-session"
// //           />
// //         </div>
// //       )
// //     }

// //     return (
// //       <>
// //         <AcademicSessionsMobile
// //           sessions={filteredSessions}
// //           onActivate={handleActivate}
// //           onDelete={handleDelete}
// //           isMutating={isMutating}
// //         />

// //         <AcademicSessionTable
// //           sessions={filteredSessions}
// //           onActivate={handleActivate}
// //           onDelete={handleDelete}
// //           isMutating={isMutating}
// //         />
// //       </>
// //     )
// //   }

// //   return (
// //     <div>
// //       <header className="flex flex-col justify-between gap-4 lg:flex-row">
// //         <DashboardTitle
// //           heading="Create Session"
// //           description="View, manage, or create academic sessions"
// //         />
// //         <Button asChild className="h-12 w-full lg:w-90">
// //           <Link
// //             href="/admin/class-management/session/create-session"
// //             className="flex items-center gap-2"
// //           >
// //             <Plus />
// //             Create Session
// //           </Link>
// //         </Button>
// //       </header>

// //       <div className="flex items-center justify-between gap-4">
// //         {/* search bar */}
// //         <div className="relative my-4 w-full">
// //           <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#64748B]" />
// //           <Input
// //             placeholder="Search Sessions"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="max-h-10 w-full max-w-[20rem] border pl-8"
// //           />
// //         </div>

// //         {/* icon */}
// //         {/* <div className="w-fit rounded-md border p-[9px]">
// //           <ListFilter className="size-4" />
// //         </div> */}
// //         {/* FILTER DROPDOWN */}
// //         <DropdownMenu>
// //           <DropdownMenuTrigger asChild>
// //             <button className="w-fit rounded-md border p-[9px] hover:bg-gray-50">
// //               <ListFilter className="size-4" />
// //             </button>
// //           </DropdownMenuTrigger>

// //           <DropdownMenuContent align="end" className="w-40">
// //             <DropdownMenuLabel className="text-xs text-gray-500">
// //               Filter by
// //             </DropdownMenuLabel>

// //             <DropdownMenuItem onClick={() => setFilter("all")}>
// //               All Sessions
// //             </DropdownMenuItem>

// //             <DropdownMenuItem onClick={() => setFilter("active")}>
// //               Active
// //             </DropdownMenuItem>

// //             <DropdownMenuItem onClick={() => setFilter("archived")}>
// //               Archived
// //             </DropdownMenuItem>
// //           </DropdownMenuContent>
// //         </DropdownMenu>
// //       </div>

// //       {renderContent()}
// //     </div>
// //   )
// // }

// // export default SessionsPage

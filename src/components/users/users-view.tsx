"use client"

import { useState, useMemo, useEffect } from "react"
import { User, UserType } from "@/types/user"
import { UsersTable } from "./users-table"
import { UsersGrid } from "./users-grid"
import { UsersToolbar } from "./users-toolbar"
import { Pagination } from "../ui/pagination"
import { useRouter } from "next/navigation"

interface UsersViewProps {
  users: User[]
  userType: UserType
  pageSize?: {
    desktop: number
    mobile: number
  }
  onAddUser?: () => void
}

export function UsersView({
  users,
  userType,
  pageSize = { desktop: 10, mobile: 4 },
  onAddUser,
}: UsersViewProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const filteredUsers = useMemo(() => {
    // Add safety check to ensure users is an array
    if (!Array.isArray(users)) {
      console.warn("UsersView: users prop is not an array", users)
      return []
    }

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [users, searchQuery, statusFilter])

  const itemsPerPage =
    filteredUsers.length <= pageSize.mobile
      ? filteredUsers.length
      : isMobile
        ? pageSize.mobile
        : pageSize.desktop
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const router = useRouter()
  const navigate = () => {
    router.push(`/admin/${userType}/new`)
  }

  return (
    <div className="mx-auto max-w-[1112px] p-4 md:p-6">
      <UsersToolbar
        userType={userType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onAddUser={onAddUser ?? navigate}
      />

      <div className="hidden md:block">
        <UsersTable
          users={paginatedUsers}
          userType={userType}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="block md:hidden">
        <UsersGrid users={paginatedUsers} userType={userType} />
      </div>

      {filteredUsers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          onPageChange={handlePageChange}
          className="mt-6"
        />
      )}

      {filteredUsers.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No {userType} found.</p>
        </div>
      )}
    </div>
  )
}
// "use client"

// import { useState, useMemo, useEffect } from "react"
// import { User, UserType } from "@/types/user"
// import { UsersTable } from "./users-table"
// import { UsersGrid } from "./users-grid"
// import { UsersToolbar } from "./users-toolbar"
// import { Pagination } from "../ui/pagination"
// import { useRouter } from "next/navigation"

// interface UsersViewProps {
//   users: User[]
//   userType: UserType
//   pageSize?: {
//     desktop: number
//     mobile: number
//   }
//   onAddUser?: () => void
// }

// export function UsersView({
//   users,
//   userType,
//   pageSize = { desktop: 10, mobile: 4 },
//   onAddUser,
// }: UsersViewProps) {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [statusFilter, setStatusFilter] = useState<string>("all")
//   const [isMobile, setIsMobile] = useState<boolean>(false)

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     checkMobile()
//     window.addEventListener("resize", checkMobile)
//     return () => window.removeEventListener("resize", checkMobile)
//   }, [])

//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const matchesSearch =
//         user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.role.toLowerCase().includes(searchQuery.toLowerCase())
//       const matchesStatus = statusFilter === "all" || user.status === statusFilter
//       return matchesSearch && matchesStatus
//     })
//   }, [users, searchQuery, statusFilter])

//   const itemsPerPage =
//     filteredUsers.length <= pageSize.mobile
//       ? filteredUsers.length
//       : isMobile
//         ? pageSize.mobile
//         : pageSize.desktop
//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   const router = useRouter()
//   const navigate = () => {
//     router.push(`/admin/${userType}/new`)
//   }

//   return (
//     <div className="mx-auto max-w-[1112px] p-4 md:p-6">
//       <UsersToolbar
//         userType={userType}
//         searchQuery={searchQuery}
//         onSearchChange={setSearchQuery}
//         statusFilter={statusFilter}
//         onStatusFilterChange={setStatusFilter}
//         onAddUser={onAddUser ?? navigate}
//       />

//       <div className="hidden md:block">
//         <UsersTable
//           users={paginatedUsers}
//           userType={userType}
//           currentPage={currentPage}
//           itemsPerPage={itemsPerPage}
//         />
//       </div>

//       <div className="block md:hidden">
//         <UsersGrid users={paginatedUsers} userType={userType} />
//       </div>

//       {filteredUsers.length > 0 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           totalItems={filteredUsers.length}
//           onPageChange={handlePageChange}
//           className="mt-6"
//         />
//       )}

//       {filteredUsers.length === 0 && (
//         <div className="py-12 text-center">
//           <p className="text-muted-foreground">No {userType} found.</p>
//         </div>
//       )}
//     </div>
//   )
// }

// components/users/users-view.tsx
"use client"

import { useState, useMemo } from "react"
import { User, UserType } from "@/types/user"
import { UsersTable } from "./users-table"
import { UsersGrid } from "./users-grid"
import { UsersToolbar } from "./users-toolbar"
import { Pagination } from "../ui/pagination"

interface UsersViewProps {
  users: User[]
  userType: UserType
  pageSize?: {
    desktop: number
    mobile: number
  }
}

export function UsersView({
  users,
  userType,
  pageSize = { desktop: 10, mobile: 4 },
}: UsersViewProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Filter users based on search query and status
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [users, searchQuery, statusFilter])

  // Pagination logic
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false
  const itemsPerPage = isMobile ? pageSize.mobile : pageSize.desktop

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="mx-auto max-w-[1112px] p-4 md:p-6">
      <UsersToolbar
        userType={userType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onAddUser={() => console.log(`Add ${userType}`)}
      />

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <UsersTable users={paginatedUsers} userType={userType} />
      </div>

      {/* Mobile Grid View */}
      <div className="block md:hidden">
        <UsersGrid users={paginatedUsers} userType={userType} />
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
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

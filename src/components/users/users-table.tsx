"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit3, Trash2 } from "lucide-react"
import { SnakeUser as User, UserType } from "@/types/user"
import { useRouter } from "next/navigation"
import { useDeleteTeacher } from "@/app/admin/teachers/_hooks/use-teachers"
interface UsersTableProps {
  users: User[]
  userType: UserType
  currentPage: number
  itemsPerPage: number
}

export function UsersTable({
  users,
  userType,
  currentPage,
  itemsPerPage,
}: UsersTableProps) {
  const deleteTeacher = useDeleteTeacher().mutateAsync
  const getFullName = (user: User) =>
    user.full_name || `${user.first_name} ${user.last_name}`
  const getInitials = (user: User) => {
    const fullName = getFullName(user)
    return fullName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const getID = (user: User) => {
    return user.employment_id || user.reg_number || "N/A"
  }

  const startSN = (currentPage - 1) * itemsPerPage + 1

  const getStatusVariant = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "inactive"
      default:
        return "outline"
    }
  }
  const isTeacher = userType === "teachers"
  const router = useRouter()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">S/N</TableHead>
            <TableHead>{isTeacher ? "Name" : "Student"}</TableHead>
            <TableHead>{isTeacher ? "Employee Number" : "Reg Number"}</TableHead>
            {isTeacher ? <TableHead>Email</TableHead> : <TableHead>Class</TableHead>}
            {!isTeacher && <TableHead>Address</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead className="w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{startSN + index}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={getFullName(user)} />
                    <AvatarFallback>{getInitials(user)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{getFullName(user)}</span>
                </div>
              </TableCell>
              <TableCell>{getID(user)}</TableCell>
              {isTeacher ? (
                <TableCell>{user.email}</TableCell>
              ) : (
                <>
                  <TableCell>{user.class}</TableCell>
                  <TableCell>{user.home_address}</TableCell>
                </>
              )}
              <TableCell>
                <Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
              </TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-[#da3743]">
                  <Trash2
                    className="h-3 w-3 cursor-pointer"
                    onClick={async () => {
                      if (confirm("Delete this teacher?")) {
                        await deleteTeacher(user.id)
                      }
                    }}
                  />
                  <Edit3
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => router.push(`/admin/teachers/${user.id}`)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

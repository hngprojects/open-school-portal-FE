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
import { User, UserType } from "@/types/user"

interface UsersTableProps {
  users: User[]
  userType: UserType
  currentPage: number
  itemsPerPage: number
}

export function UsersTable({ users, currentPage, itemsPerPage }: UsersTableProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">S/N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Employee Number</TableHead>
            <TableHead>Email</TableHead>
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
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.employeeId}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">{user.email}</div>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
              </TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-[#da3743]">
                  <span>
                    <Trash2 className="cursor-pointer text-[14px]" />
                  </span>
                  <span>
                    <Edit3 className="cursor-pointer text-[14px]" />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

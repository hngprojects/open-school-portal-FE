"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import { User, UserType } from "@/types/user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useTeacherStore } from "@/store/general-auth-store"

interface UsersGridProps {
  users: User[]
  userType: UserType
}

export function UsersGrid({ users, userType }: UsersGridProps) {
  const deleteTeacher = useTeacherStore((state) => state.deleteTeacher)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const isTeacher = userType === "teachers"
  const router = useRouter()

  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-muted-foreground text-sm">
                      {isTeacher ? user.employeeId : user.regNumber}
                    </span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/teachers/${user.id}`)}
                  >
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={async () => {
                      if (confirm("Delete teacher?")) {
                        await deleteTeacher(user.id)
                      }
                    }}
                    className="text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
              {!isTeacher && (
                <>
                  <div className="flex items-center justify-between pb-2">
                    <p className="text-muted-foreground">Class:</p>
                    <p className="text-right font-medium">{user.class}</p>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <p className="text-muted-foreground">Guardian:</p>
                    <p className="text-right font-medium">{user.guardian}</p>
                  </div>
                </>
              )}
              {isTeacher && (
                <div className="flex items-center justify-between pb-2">
                  <span className="text-muted-foreground">Subject:</span>
                  <p>{user.role}</p>
                </div>
              )}
              <div className="flex items-center justify-between pb-2">
                <p className="text-muted-foreground">Phone No:</p>
                <p className="font-medium">{user.phone}</p>
              </div>
              {!isTeacher && (
                <div className="flex items-center justify-between pb-2">
                  <p className="text-muted-foreground">Address:</p>
                  <p className="text-right text-xs">{user.address}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

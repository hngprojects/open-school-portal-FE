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

interface UsersGridProps {
  users: User[]
  userType: UserType
}

export function UsersGrid({ users }: UsersGridProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

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
                      {user.employeeId}
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
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center justify-between pb-2">
                <p className="text-muted-foreground">Email:</p>
                <p className="text-right font-medium">{user.email}</p>
              </div>

              <div className="flex items-center justify-between pb-2">
                <span className="text-muted-foreground">Subject:</span>
                <p>{user.role}</p>
              </div>

              <div className="flex items-center justify-between pb-2">
                <p className="text-muted-foreground">Phone No:</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical, Users, MapPin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Classroom } from "@/types/classroom"
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"

interface ClassroomCardProps {
  classroom: Classroom
  onEdit: (classroom: Classroom) => void
  onDelete: (classroom: Classroom) => void
  onToggleAvailability: (id: string, is_available: boolean) => void
}

export function ClassroomCard({
  classroom,
  onEdit,
  onDelete,
  onToggleAvailability,
}: ClassroomCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleToggleAvailability = (checked: boolean) => {
    onToggleAvailability(classroom.id, checked)
  }

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {classroom.name}
                  </h3>
                  <Badge
                    variant={classroom.is_available ? "default" : "outline"}
                    className="mt-1"
                  >
                    {classroom.is_available ? "Available" : "In Use"}
                  </Badge>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(classroom)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteDialogOpen(true)}
                      className="text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Capacity: {classroom.capacity} students</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Location: {classroom.location}</span>
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Type:</span> {classroom.type}
                </div>

                {classroom.description && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Description:</span>{" "}
                    {classroom.description}
                  </div>
                )}
              </div>
            </div>

            <div className="ml-4 flex flex-col items-center gap-2">
              <Switch
                checked={classroom.is_available}
                onCheckedChange={handleToggleAvailability}
                className="data-[state=checked]:bg-green-600"
              />
              <span className="text-xs whitespace-nowrap text-gray-500">
                {classroom.is_available ? "Available" : "In Use"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          onDelete(classroom)
          setDeleteDialogOpen(false)
        }}
        title="Delete Classroom"
        description="Are you sure you want to delete this classroom? This action cannot be undone."
        itemName={classroom.name}
      />
    </>
  )
}

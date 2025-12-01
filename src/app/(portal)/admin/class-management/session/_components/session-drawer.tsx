"use client"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { AcademicSession } from "@/lib/academic-session"
import { format } from "date-fns"
import { X } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
  session: AcademicSession | null
}

export default function SessionDrawer({ open, onClose, session }: Props) {
  if (!session) return null

  const formatDate = (date: string) => format(new Date(date), "dd-MM-yyyy")

  return (
    <Drawer open={open} onClose={onClose} direction="right">
      <DrawerContent className="ml-auto h-full w-full max-w-lg border-l shadow-xl">
        <DrawerHeader className="flex flex-row items-center justify-between border-b py-0">
          <DrawerTitle className="text-primary text-base leading-none">
            Session Preview
          </DrawerTitle>
          <Button variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </DrawerHeader>

        <ScrollArea className="h-[calc(100vh-60px)] p-5">
          <div className="space-y-4">
            {/* Session Name */}
            <div>
              <p className="text-lg font-medium text-[#3E3E3E]">
                {session.name} Academic Session
              </p>
            </div>

            {/* Status */}
            <div className="grid grid-cols-[45fr_55fr] gap-1">
              <p className="text-text-secondary text-sm">Status</p>
              <span
                className={`w-fit rounded-2xl px-2 py-0.5 text-xs font-medium ${
                  session.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : session.status === "Inactive"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {session.status}
              </span>
            </div>

            {/* Description */}
            {session.description && (
              <div className="grid grid-cols-[45fr_55fr] gap-1">
                <p className="text-text-secondary text-sm">Description</p>
                <p className="text-primary text-sm wrap-break-word">
                  {session.description}
                </p>
              </div>
            )}

            {/* Terms */}
            {session.terms && session.terms.length > 0 && (
              <div className="">
                {session.terms.map((term) => (
                  <div
                    key={term.id}
                    className="grid grid-cols-[45fr_55fr] gap-1 space-y-4"
                  >
                    <p className="text-text-secondary text-sm">{term.name} Start Date</p>
                    <p className="text-primary text-sm">{formatDate(term.startDate)}</p>
                    <p className="text-text-secondary text-sm">{term.name} End Date</p>
                    <p className="text-primary text-sm">{formatDate(term.endDate)}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Date Created */}
            <div className="grid grid-cols-[45fr_55fr] gap-1">
              <p className="text-text-secondary text-sm">Date Created</p>
              <p className="text-primary text-sm">{formatDate(session.createdAt)}</p>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

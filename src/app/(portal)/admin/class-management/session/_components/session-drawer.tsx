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

  return (
    <Drawer open={open} onClose={onClose} direction="right">
      <DrawerContent className="ml-auto h-full w-full max-w-lg border-l shadow-xl">
        <DrawerHeader className="flex flex-row items-center justify-between border-b py-0">
          <DrawerTitle className="text-primary text-base leading-none">
            Session Preview
          </DrawerTitle>
          <Button variant="ghost" onClick={onClose} className="">
            <X />
          </Button>
        </DrawerHeader>

        <ScrollArea className="h-[calc(100vh-60px)] p-5">
          <div className="space-y-6">
            <div>
              <p className="text-lg font-medium text-[#3E3E3E]">
                {session.name} Academic Session
              </p>
            </div>

            {/* status */}
            <div className="grid grid-cols-2 gap-1">
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

            {/* description */}
            {session.description && (
              <div className="grid grid-cols-2 gap-1">
                <p className="text-text-secondary text-sm">Description</p>
                <p className="text-primary max-w-[25ch] truncate text-sm">
                  {session.description}
                </p>
              </div>
            )}

            {/* <div className="grid grid-cols-2 gap-4"> */}
            <div className="grid grid-cols-2 gap-1">
              <p className="text-text-secondary text-sm">First Term Start Date</p>
              <p className="text-primary text-sm">
                {format(new Date(session.startDate), "PPP")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1">
              <p className="text-text-secondary text-sm">End Date</p>
              <p className="text-primary text-sm">
                {format(new Date(session.endDate), "PPP")}
              </p>
            </div>
            {/* </div> */}

            <div className="grid grid-cols-2 gap-1">
              <p className="text-text-secondary text-sm">Date Created</p>
              <p className="text-primary text-sm">
                {format(new Date(session.createdAt), "PPP")}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

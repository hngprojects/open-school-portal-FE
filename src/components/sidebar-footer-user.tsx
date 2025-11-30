"use client"

import Image from "next/image"
import { LogOut } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "@/store/auth-store"
import { titleCase } from "@/lib/utils"
import { LogoutDialog } from "@/app/(portal)/admin/_components/logout-confirmation-dialog"
// import { LogoutDialog } from "@/components/dashboard/logout-confirmation-dialog"
import { useLogout } from "@/hooks/use-user-data"

interface SidebarFooterUserProps {
  isCollapsed?: boolean
}

export function SidebarFooterUser({ isCollapsed = false }: SidebarFooterUserProps) {
  const user = useAuthStore((state) => state.user)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const sendLogoutRequest = useLogout().mutateAsync

  const handleLogout = async () => {
    await sendLogoutRequest()
  }

  return (
    <>
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={"/assets/images/dashboard/avatar.svg"}
                alt="avatar"
                width={32}
                height={32}
                className="w-full object-cover"
              />
              <div className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  {user?.first_name}
                </span>
                <span className="text-xs text-gray-500">
                  {titleCase(user?.role?.[0] || "")}
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={() => setShowLogoutDialog(true)}
              className="cursor-pointer rounded-md p-1.5 text-[#DA3743] transition-colors hover:bg-red-50"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </>
  )
}

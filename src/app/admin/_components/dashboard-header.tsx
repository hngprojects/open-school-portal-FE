"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Play, LogOut } from "lucide-react"
import Image from "next/image"
import { useAuthStore } from "@/store/auth-store"
import { useLogout } from "../_hooks/use-user-data"

const DashboardHeader = () => {
  const user = useAuthStore((state) => state.user)
  const { state, isMobile, openMobile } = useSidebar()
  const sendLogoutRequest = useLogout().mutateAsync;

  const showDesktopTrigger = !isMobile && state === "collapsed"
  const showMobileTrigger = isMobile && !openMobile
  const showTrigger = showDesktopTrigger || showMobileTrigger

  const handleLogout = async () => {
    await sendLogoutRequest();
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-[72px] w-full items-center justify-between border-b bg-white px-4">
      <div className="relative z-100">{showTrigger && <SidebarTrigger />}</div>

      <aside className="flex items-center gap-4">
        {/* bell icon */}
        <div className="relative">
          <Bell className="text-text-secondary size-5" />
          <span className="bg-accent absolute top-0 right-0.5 h-1.5 w-1.5 rounded-full"></span>
        </div>

        {/* avatar container */}
        <div className="flex items-center gap-1 rounded-[0.625rem] border px-3.5 py-1 transition-all duration-200 ease-in-out hover:shadow">
          <div>
            <Image
              src="/assets/images/dashboard/avatar.svg"
              alt="avatar"
              width={32}
              height={32}
            />
          </div>
          <p className="space-x-2">
            <span>{user?.first_name || "User"}</span>
            <span>{user?.last_name || "Name"}</span>
          </p>

          <Play className="fill-text-secondary size-2 rotate-90" />
        </div>
        {/* avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 rounded-[0.625rem] border px-3.5 py-1 transition-all duration-200 ease-in-out hover:shadow hover:cursor-pointer">
              <Image
                src="/assets/images/dashboard/avatar.svg"
                alt="avatar"
                width={32}
                height={32}
              />
              Sophia Alkija
              <Play className="fill-text-secondary size-2 rotate-90" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>
    </header>
  )
}

export default DashboardHeader

"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Bell, Play } from "lucide-react"
import Image from "next/image"

const DashboardHeader = () => {
  const { state, isMobile, openMobile } = useSidebar()

  // Desktop: show trigger when collapsed
  const showDesktopTrigger = !isMobile && state === "collapsed"

  // Mobile: show trigger when mobile sidebar is closed
  const showMobileTrigger = isMobile && !openMobile

  const showTrigger = showDesktopTrigger || showMobileTrigger

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-[72px] w-full items-center justify-between border-b bg-white px-4">
      <div>{showTrigger && <SidebarTrigger />}</div>

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
          Sophia Alkija
          <Play className="fill-text-secondary size-2 rotate-90" />
        </div>
      </aside>
    </header>
  )
}

export default DashboardHeader

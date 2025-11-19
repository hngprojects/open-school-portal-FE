"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

const DashboardHeader = () => {
  const { state, isMobile, openMobile } = useSidebar()

  // Desktop: show trigger when collapsed
  const showDesktopTrigger = !isMobile && state === "collapsed"

  // Mobile: show trigger when mobile sidebar is closed
  const showMobileTrigger = isMobile && !openMobile

  const showTrigger = showDesktopTrigger || showMobileTrigger

  return (
    <header className="fixed top-0 right-0 left-0 z-0 flex h-[72px] w-full items-center justify-between border-b bg-white px-4">
      <div>{showTrigger && <SidebarTrigger />}</div>

      <p className="rounded-2xl border px-3.5 py-1">Sophia Alkija</p>
    </header>
  )
}

export default DashboardHeader

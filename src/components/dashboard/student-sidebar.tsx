"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutGrid,
  GraduationCap,
  User,
  NotebookPen,
  CalendarDays,
  FileBadge,
  Settings,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Logo from "@/components/logo"
import { useLogout } from "@/hooks/use-user-data"
import { LogoutDialog } from "./logout-confirmation-dialog"

// Menu items
const items = [
  { title: "Dashboard", url: "/student", icon: LayoutGrid, exactMatch: true },
  { title: "Classes", url: "/student/classes", icon: User },
  { title: "Attendance", url: "/student/attendance", icon: GraduationCap },
  { title: "Messages", url: "/student/messages", icon: User },
  { title: "Assignments", url: "/student/assignments", icon: NotebookPen },
  { title: "Timetable", url: "/student/timetable", icon: CalendarDays },
  { title: "Results", url: "/student/results", icon: FileBadge },
]

export function StudentSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile, state } = useSidebar()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  // Close mobile sidebar when link is clicked
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const isCollapsed = state === "collapsed"

  const sendLogoutRequest = useLogout().mutateAsync
  const handleLogout = async () => {
    await sendLogoutRequest()
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-7 items-center justify-between px-2 py-4">
          <div className={isCollapsed ? "hidden" : ""}>
            <Logo />
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = item.exactMatch
                  ? pathname === item.url
                  : pathname === item.url || pathname.startsWith(item.url + "/")

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={
                        isActive
                          ? "bg-[#DA3743]/10 text-[#DA3743]"
                          : "text-primary hover:bg-[#DA3743]/10 hover:text-[#DA3743]"
                      }
                    >
                      <Link
                        href={item.url || "#"}
                        className="flex items-center gap-2"
                        onClick={handleLinkClick}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="cursor-pointer">
        <Link href={"/student/settings"}>
          <div className="flex items-center gap-2 text-sm">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </div>
        </Link>
      </SidebarFooter>

      <SidebarFooter onClick={() => setShowLogoutDialog(true)} className="cursor-pointer">
        <div className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </div>
      </SidebarFooter>
      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </Sidebar>
  )
}

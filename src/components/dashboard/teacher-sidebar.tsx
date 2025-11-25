"use client"

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

// ----------------------------
// MENU CONFIG
// ----------------------------
const items = [
  { title: "Dashboard", url: "/teacher", icon: LayoutGrid, exactMatch: true },

  { title: "Students", url: "/teacher/students", icon: GraduationCap },

  { title: "Parents", url: "/teacher/parents", icon: User },

  { title: "Attendance", url: "/teacher/attendance", icon: NotebookPen },

  { title: "Timetable", url: "/teacher/timetable", icon: CalendarDays },

  { title: "Results", url: "/teacher/results", icon: FileBadge },
]

// ----------------------------
// COMPONENT
// ----------------------------
export function TeacherSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile, state } = useSidebar()

  const isCollapsed = state === "collapsed"

  // Auto close on mobile click
  const handleLinkClick = () => {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar>
      {/* HEADER */}
      <SidebarHeader>
        <div className="flex h-7 items-center justify-between px-2 py-4">
          {!isCollapsed && <Logo />}
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      {/* CONTENT */}
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
                          : "text-gray-700 hover:bg-[#DA3743]/10 hover:text-[#DA3743]"
                      }
                    >
                      <Link
                        href={item.url}
                        onClick={handleLinkClick}
                        className="flex items-center gap-2"
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
        <Link href={"/teacher/settings"}>
          <div className="flex items-center gap-2 text-sm">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}

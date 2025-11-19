"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutGrid,
  Users,
  GraduationCap,
  User,
  Table,
  File,
  Banknote,
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
} from "@/components/ui/sidebar"

// Menu items
const items = [
  { title: "Dashboard", url: "/dashboard-admin", icon: LayoutGrid },
  { title: "Teachers", url: "/teachers", icon: Users },
  { title: "Students", url: "/students", icon: GraduationCap },
  { title: "Parents", url: "/parents", icon: User },
  { title: "Attendance", url: "#", icon: File },
  { title: "Timetable", url: "#", icon: Table },
  { title: "Results", url: "#", icon: Table },
  { title: "Fees Management", url: "#", icon: Banknote },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div>
            <Image src="/assets/logo.png" alt="logo" width={50} height={200} />
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 rounded px-3 py-2 transition-colors ${
                          isActive
                            ? "bg-[#DA3743]/10 text-[#DA3743]"
                            : "text-black hover:bg-gray-100"
                        }`}
                      >
                        <item.icon />
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
    </Sidebar>
  )
}

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
import Image from "next/image"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard-admin",
    icon: LayoutGrid,
  },
  {
    title: "Teachers",
    url: "/teachers",
    icon: Users,
  },
  {
    title: "Students",
    url: "/students",
    icon: GraduationCap,
  },
  {
    title: "Parents",
    url: "/parents",
    icon: User,
  },
  {
    title: "Attendance",
    url: "#",
    icon: File,
  },
  {
    title: "Timetable",
    url: "#",
    icon: Table,
  },
  {
    title: "Results",
    url: "#",
    icon: Table,
  },
  {
    title: "Fees Management",
    url: "#",
    icon: Banknote,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-between">
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

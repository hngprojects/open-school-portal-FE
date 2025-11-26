"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, GraduationCap, Settings, LifeBuoy, LogOutIcon } from "lucide-react"
import { PiMoneyWavyBold } from "react-icons/pi"
import { FaRegUser } from "react-icons/fa6"
import { AiOutlinePieChart } from "react-icons/ai"
import Users from "../../../../../public/svgs/users"

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
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"

import Logo from "@/components/logo"
import { useLogout } from "../_hooks/use-user-data"
import { LogoutDialog } from "./logout-confirmation-dialog"
import Image from "next/image"
import { useAuthStore } from "@/store/auth-store"

// Menu items
const items = [
  { title: "Dashboard", url: "/super-admin", icon: Menu, exactMatch: true },
  { title: "Admins", url: "/super-admin/admins", icon: Users },
  { title: "Teachers", url: "/super-admin/teachers", icon: Users },
  { title: "Students", url: "/super-admin/students", icon: GraduationCap },
  { title: "Parents", url: "/super-admin/parents", icon: FaRegUser },
  {
    title: "Classes & Sessions",
    url: "/super-admin/classes-and-sessions",
    icon: GraduationCap,
  },
  { title: "Fees", url: "/super-admin/fees", icon: PiMoneyWavyBold },
  { title: "Analytics", url: "/super-admin/analytics", icon: AiOutlinePieChart },
]

export function SuperAdminSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile, state } = useSidebar()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const user = useAuthStore((state) => state.user)

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

      <SidebarFooter onClick={() => setShowLogoutDialog(true)} className="cursor-pointer">
        <div className="flex items-center gap-2">
          <LifeBuoy className="h-4 w-4" />
          <span>Support</span>
        </div>
      </SidebarFooter>

      <SidebarFooter className="cursor-pointer">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </div>
      </SidebarFooter>

      <SidebarFooter className="cursor-pointer">
        <div className="flex items-center gap-1 rounded-[0.625rem] border px-3.5 py-1 transition-all duration-200 ease-in-out hover:shadow">
          <div>
            <Image
              src="/assets/images/dashboard/avatar.svg"
              alt="avatar"
              width={32}
              height={32}
            />
          </div>
          <div>
            <p className="space-x-2">
              <span>{user?.first_name || "User"}</span>
              <span>{user?.last_name || "Name"}</span>
            </p>
            <p>
              <span>{user?.email || "email@gmail.com"}</span>
            </p>
          </div>

          <LogOutIcon className="fill-text-secondary size-2 rotate-90" />
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

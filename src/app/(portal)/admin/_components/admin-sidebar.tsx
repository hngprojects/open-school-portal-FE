"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, GraduationCap, ChevronDown, ChevronRight } from "lucide-react"
import { PiMoneyWavyBold } from "react-icons/pi"
import { FaRegUser } from "react-icons/fa6"
import { AiOutlinePieChart } from "react-icons/ai"
import NotePad from "../../../../../public/svgs/note-pad"
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Logo from "@/components/logo"
import { useLogout } from "../_hooks/use-user-data"
import { LogoutDialog } from "./logout-confirmation-dialog"

// Menu items
const items = [
  { title: "Dashboard", url: "/admin", icon: Menu, exactMatch: true },
  { title: "Fees", url: "/admin/fee-management", icon: PiMoneyWavyBold },
  { title: "Attendance", url: "/admin/attendance", icon: NotePad },
  { title: "Teachers", url: "/admin/teachers", icon: Users },
  { title: "Students", url: "/admin/students", icon: GraduationCap },
  { title: "Parents", url: "/admin/parents", icon: FaRegUser },

  {
    title: "Class Management",
    url: "/admin/class-management/class",
    icon: FaRegUser,
    subItems: [
      { title: "Class", url: "/admin/class-management/class" },
      { title: "Session", url: "/admin/class-management/session" },
      { title: "Subject", url: "#" },
      { title: "Timetable Setup", url: "#" },
      { title: "Result Management", url: "#" },
    ],
  },
  { title: "User Configuration", url: "#", icon: AiOutlinePieChart },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile, state } = useSidebar()
  const [openItems, setOpenItems] = useState<string[]>([])
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  // Close mobile sidebar when link is clicked
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const isCollapsed = state === "collapsed"

  // Check if any sub-item is active
  const isParentActive = (item: (typeof items)[number]) => {
    if ("subItems" in item && item.subItems) {
      return item.subItems.some((subItem) => pathname === subItem.url)
    }
    return false
  }

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
                const hasSubItems = "subItems" in item && item.subItems
                const isActive = item.exactMatch
                  ? pathname === item.url
                  : pathname === item.url || pathname.startsWith(item.url + "/")
                const isOpen = openItems.includes(item.title)
                const hasActiveChild = hasSubItems && isParentActive(item)

                if (hasSubItems) {
                  return (
                    <Collapsible
                      key={item.title}
                      open={isOpen}
                      onOpenChange={() => toggleItem(item.title)}
                    >
                      <SidebarMenuItem>
                        <div className="flex w-full items-center">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive}
                              className={`flex-1 ${
                                isActive
                                  ? "bg-[#DA3743]/10 text-[#DA3743]"
                                  : hasActiveChild
                                    ? ""
                                    : "text-gray-700 hover:bg-[#DA3743]/10 hover:text-[#DA3743]"
                              }`}
                            >
                              <Link
                                href={item.url || "#"}
                                className="flex items-center gap-2"
                                onClick={handleLinkClick}
                              >
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                                {isOpen ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Link>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                          <SidebarMenuSub className="mx-0 ml-4 border-l-0 px-0">
                            {item.subItems.map((subItem) => {
                              const isSubActive = pathname === subItem.url
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isSubActive}
                                    className={`my-1.5 ${
                                      isSubActive
                                        ? "bg-[#DA3743]/10 text-[#DA3743]"
                                        : "text-gray-600 hover:bg-[#DA3743]/10 hover:text-[#DA3743]"
                                    }`}
                                  >
                                    <Link href={subItem.url} onClick={handleLinkClick}>
                                      {subItem.title}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              )
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

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
        Log Out
      </SidebarFooter>
      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </Sidebar>
  )
}

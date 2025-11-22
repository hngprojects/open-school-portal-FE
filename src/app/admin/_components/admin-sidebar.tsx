"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutGrid,
  GraduationCap,
  User,
  ChevronDown,
  ChevronRight,
  NotebookPen,
  CalendarDays,
  FileBadge,
  Wallet,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Logo from "@/components/logo"

// Menu items
const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutGrid, exactMatch: true },
  { title: "Teachers", url: "/admin/teachers", icon: User },
  { title: "Students", url: "/admin/students", icon: GraduationCap },
  { title: "Parents", url: "/admin/parents", icon: User },
  { title: "Attendance", url: "/admin/attendance", icon: NotebookPen },
  { title: "Timetable", url: "/admin/timetable", icon: CalendarDays },
  { title: "Results", url: "/admin/results", icon: FileBadge },
  {
    title: "Fees Management",
    url: "/admin/fee-management",
    icon: Wallet,
    subItems: [
      { title: "Add Fee Group", url: "/admin/fee-management/add-fees" },
      { title: "Allocate Invoice", url: "/admin/fee-management/allocate-invoice" },
      { title: "Record Payment", url: "/admin/fee-management/record-payment" },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile, state } = useSidebar()
  const [openItems, setOpenItems] = useState<string[]>([])

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
    </Sidebar>
  )
}

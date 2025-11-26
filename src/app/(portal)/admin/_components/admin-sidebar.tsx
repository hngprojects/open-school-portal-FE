"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Settings,
  LogOut,
  BookIcon,
  Menu,
} from "lucide-react"
import { PiMoneyWavyBold } from "react-icons/pi"
import { FaRegUser } from "react-icons/fa6"
import { TbSettingsCog } from "react-icons/tb"
import NotePad from "../../../../../public/svgs/note-pad"
import Users from "../../../../../public/svgs/users"

import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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
import { useAuthStore } from "@/store/auth-store"
import { titleCase } from "@/lib/utils"

// Menu items
const mainItems = [
  { title: "Dashboard", url: "/admin", icon: Menu, exactMatch: true },
  { title: "Fees", url: "/admin/fee-management", icon: PiMoneyWavyBold },
  { title: "Attendance", url: "/admin/attendance", icon: NotePad },
  { title: "Teachers", url: "/admin/teachers", icon: Users },
  { title: "Students", url: "/admin/students", icon: GraduationCap },
  { title: "Parents", url: "/admin/parents", icon: FaRegUser },
  {
    title: "Class Management",
    url: "/admin/class-management",
    icon: BookIcon,
    subItems: [
      { title: "Session", url: "/admin/class-management/session" },
      { title: "Class", url: "/admin/class-management/class" },
      { title: "Subjects", url: "/admin/class-management/subjects" },
      { title: "Room", url: "/admin/class-management/classrooms" },
      // { title: "Timetable Setup", url: "/admin/class-management/timetable-setup" },
      // { title: "Result Management", url: "/admin/class-management/result-management" },
    ],
  },
  { title: "User Configuration", url: "/admin/user-configuration", icon: TbSettingsCog },
  // { title: "User Configuration", url: "/admin/user-configuration", icon: AiOutlinePieChart },
]

const bottomItems = [
  // { title: "Support", url: "/admin/support", icon: HelpCircle },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile, state } = useSidebar()
  const [openItems, setOpenItems] = useState<string[]>([])
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const user = useAuthStore((state) => state.user)
  const sendLogoutRequest = useLogout().mutateAsync

  const isCollapsed = state === "collapsed"

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-16 items-center justify-between px-4">
          <div className={isCollapsed ? "hidden" : ""}>
            <Logo />
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3">
              {mainItems.map((item) => {
                const hasSubItems = "subItems" in item && item.subItems
                const isActive = item.exactMatch
                  ? pathname === item.url
                  : pathname === item.url || pathname.startsWith(item.url + "/")
                const isOpen = openItems.includes(item.title)
                const hasActiveChild =
                  hasSubItems &&
                  item.subItems?.some((subItem) => pathname === subItem.url)

                if (hasSubItems) {
                  return (
                    <Collapsible
                      key={item.title}
                      open={isOpen}
                      onOpenChange={() => toggleItem(item.title)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 ${
                              isActive || hasActiveChild
                                ? "bg-[#DA3743] text-white hover:bg-[#DA3743] hover:text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex w-full cursor-pointer items-center justify-between">
                              <div className="flex items-center gap-3">
                                <item.icon className="h-5 w-5" />
                                <span className="text-sm font-medium">{item.title}</span>
                              </div>
                              {isOpen ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="mt-1 ml-8 space-y-1 border-l-0 px-0">
                            {item.subItems?.map((subItem) => {
                              const isSubActive = pathname === subItem.url
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={`rounded-md px-3 py-2 ${
                                      isSubActive
                                        ? "text-[#DA3743]"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                  >
                                    <Link href={subItem.url} onClick={handleLinkClick}>
                                      <span className="text-sm">{subItem.title}</span>
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
                      className={`rounded-md px-3 py-2.5 ${
                        isActive
                          ? "bg-[#DA3743] text-white hover:bg-[#DA3743] hover:text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Link
                        href={item.url || "#"}
                        className="flex items-center gap-3"
                        onClick={handleLinkClick}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Items */}
        <div className="mt-auto px-3 pb-2">
          <SidebarMenu className="space-y-1">
            {bottomItems.map((item) => {
              const isActive =
                pathname === item.url || pathname.startsWith(item.url + "/")
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`rounded-md px-3 py-2.5 ${
                      isActive
                        ? "bg-[#DA3743] text-white hover:bg-[#DA3743] hover:text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Link
                      href={item.url || "#"}
                      className="flex items-center gap-3"
                      onClick={handleLinkClick}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="/assets/images/dashboard/avatar.svg"
                alt="avatar"
                width={32}
                height={32}
                className="w-full object-cover"
              />
              <div className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  {" "}
                  {user?.first_name}{" "}
                </span>
                <span className="text-xs text-gray-500">
                  {" "}
                  {titleCase(user?.role?.[0] || "")}{" "}
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={() => setShowLogoutDialog(true)}
              className="rounded-md p-1.5 text-[#DA3743] transition-colors hover:bg-red-50"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </SidebarFooter>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </Sidebar>
  )

  function toggleItem(title: string) {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  function handleLinkClick() {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  async function handleLogout() {
    await sendLogoutRequest()
  }
}

"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutGrid,
  User,
  Users,
  NotebookPen,
  CalendarDays,
  FileBadge,
  Wallet,
  LogOut,
  Menu,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { name: "Dashboard", icon: LayoutGrid, path: "/admin" },
  { name: "Teachers", icon: User, path: "/admin/teachers" },
  { name: "Students", icon: Users, path: "/admin/students" },
  { name: "Parents", icon: User, path: "/admin/parents" },
  { name: "Attendance", icon: NotebookPen, path: "/admin/attendance" },
  { name: "Timetable", icon: CalendarDays, path: "/admin/timetable" },
  { name: "Results", icon: FileBadge, path: "/admin/results" },
  { name: "Fee Management", icon: Wallet, path: "/admin/finance" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  return (
    <>
      <div className="fixed top-3 left-2 z-10 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setOpen(!open)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <aside
        className={`absolute top-0 left-0 flex h-screen w-[260px] flex-col overflow-hidden border-r bg-white px-6 py-4 ${open ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        {/* Logo + Menu */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              width={100}
              height={100}
              src="/assets/logo.png"
              alt="StudyBridge"
              className="h-8"
            />
          </div>
        </div>

        {/* Menu List */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 rounded-md p-3 text-sm transition ${isActive ? "bg-red-100 font-medium text-red-600" : "text-gray-700"} `}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-red-600" : "text-black"}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <button className="absolute bottom-6 left-6 flex items-center gap-2 text-red-600">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </aside>
    </>
  )
}

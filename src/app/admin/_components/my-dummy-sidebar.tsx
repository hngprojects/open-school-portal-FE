"use client"

import { useState } from "react"
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

const menuItems = [
  { name: "Dashboard", icon: LayoutGrid },
  { name: "Teachers", icon: User },
  { name: "Students", icon: Users },
  { name: "Parents", icon: User },
  { name: "Attendance", icon: NotebookPen },
  { name: "Timetable", icon: CalendarDays },
  { name: "Results", icon: FileBadge },
  { name: "Finance", icon: Wallet },
]

export default function Sidebar() {
  const [active, setActive] = useState("Teachers")

  return (
    <aside className="relative flex h-screen w-0 flex-col border-r bg-white px-6 py-4 md:w-[260px]">
      {/* Logo + Menu */}
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            width={100}
            height={100}
            src="/logo.png"
            alt="StudyBridge"
            className="h-8"
          />
        </div>
        <Menu className="h-6 w-6" />
      </div>

      {/* Menu List */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.name

          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 rounded-md p-3 text-sm transition ${isActive ? "bg-red-100 font-medium text-red-600" : "text-gray-700"} `}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-red-600" : "text-black"}`} />
              {item.name}
            </button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <button className="absolute bottom-6 left-6 flex items-center gap-2 text-red-600">
        <LogOut className="h-5 w-5" />
        <span>Log Out</span>
      </button>
    </aside>
  )
}

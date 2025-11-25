"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { Home, User, Bell, Lock, FileText, Trash2 } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

const navItems = [
  { href: "/super-admin/settings", label: "School Information", icon: Home },
  { href: "/super-admin/settings/profile", label: "Profile", icon: User },
  { href: "/super-admin/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/super-admin/settings/reset-password", label: "Reset Password", icon: Lock },
  {
    href: "/super-admin/settings/legal-and-privacy",
    label: "Legal & Privacy",
    icon: FileText,
  },
  {
    href: "/super-admin/settings/delete-account",
    label: "Delete Account",
    icon: Trash2,
    danger: true,
  },
]

export function SettingsNav() {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <aside
      className={clsx(
        "fixed z-10 w-80 transition-all duration-300 ease-in-out",
        state === "expanded" ? "left-64" : "left-5"
      )}
    >
      <div className="h-full overflow-y-auto px-6 py-8">
        <div className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white shadow-lg">
          {/* Header */}
          <div className="border-gray-100 px-8 py-6">
            <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon

                // THIS IS THE PERFECT FIX
                const isActive =
                  item.href === "/super-admin/settings"
                    ? pathname === "/super-admin/settings" ||
                      pathname === "/super-admin/settings/"
                    : pathname.startsWith(item.href)

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={clsx(
                        "group relative flex items-center gap-4 border-t px-6 py-3.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-red-700 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        item.danger && !isActive && "hover:text-red-700"
                      )}
                    >
                      {/* Red Left Bar */}
                      <div
                        className={clsx(
                          "absolute top-0 bottom-0 left-0 w-1 rounded-r-full bg-red-600 transition-opacity duration-200",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                      />

                      <Icon
                        className={clsx(
                          "h-5 w-5 shrink-0 transition-colors",
                          isActive
                            ? "text-red-600"
                            : "text-gray-500 group-hover:text-gray-700"
                        )}
                      />
                      <span className="flex-1">{item.label}</span>

                      {/* Active Indicator Dot */}
                      {/* {isActive && <div className="w-2 h-2 bg-red-600 rounded-full" />} */}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  )
}

// components/settings/MobileSidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Home, User, Bell, Lock, FileText, Trash2 } from "lucide-react"

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

export default function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const pathname = usePathname()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute top-0 left-0 h-full w-80 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold">Settings</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`mb-2 flex items-center gap-4 rounded-lg px-4 py-4 transition ${
                  isActive ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-red-600" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

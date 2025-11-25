"use client"

import { Building2, User, Bell, Lock, FileText, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    id: "school-information",
    label: "School Information",
    icon: Building2,
    href: "/super-admin/settings",
  },
  { id: "profile", label: "Profile", icon: User, href: "/super-admin/settings/profile" },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    href: "/super-admin/settings/notifications",
  },
  {
    id: "reset-password",
    label: "Reset Password",
    icon: Lock,
    href: "/super-admin/settings/reset-password",
  },
  {
    id: "legal-privacy",
    label: "Legal & Privacy",
    icon: FileText,
    href: "/super-admin/settings/legal-and-privacy",
  },
  {
    id: "delete-account",
    label: "Delete Account",
    icon: Trash2,
    href: "/super-admin/settings/delete-account",
  },
]

export default function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="lg:block">
        <Card className="border-border border p-4">
          <h2 className="text-foreground mb-4 px-2 text-base font-semibold">Settings</h2>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              const isDestructive = item.id === "delete-account"

              return (
                <Link
                  key={item.id} // ← THIS WAS MISSING
                  href={item.href}
                  className={cn(
                    "flex w-full items-center gap-3 border-t-2 px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "border-l-3 border-l-red-600 pl-2.5 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50",
                    isDestructive &&
                      !isActive &&
                      "hover:bg-gray-50 dark:hover:bg-red-950/20"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isDestructive && "dark:text-red-400"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </Card>
      </div>

      {/* Mobile Bottom Bar */}
      {/* <div className="lg:hidden fixed inset-x-0 bottom-0 bg-background border-t border-border">
        <div className="flex justify-around py-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.id}                
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium",
                  isActive ? "text-red-600 dark:text-red-400" : "text-foreground/70"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>  
      </div> */}
    </>
  )
}

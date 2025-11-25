// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Home, User, Bell, Lock, FileText, Trash2, ChevronRight } from "lucide-react";

// const navItems = [
//   { href: "/super-admin/settings", label: "School Information", icon: Home },
//   { href: "/super-admin/settings/profile", label: "Profile", icon: User },
//   { href: "/super-admin/settings/notifications", label: "Notifications", icon: Bell },
//   { href: "/super-admin/settings/reset-password", label: "Reset Password", icon: Lock },
//   { href: "/super-admin/settings/legal-and-privacy", label: "Legal & Privacy", icon: FileText },
//   { href: "/super-admin/settings/delete-account", label: "Delete Account", icon: Trash2, danger: true },
// ];

// export default function MobileMoreSettings() {
//   const pathname = usePathname();

//   const isActive = (href: string) =>
//     href === "#"
//       ? pathname === "#" || pathname === "#"
//       : pathname.startsWith(href);

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//       <div className="px-6 py-4 border-b border-gray-100">
//         <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
//       </div>

//       <div className="divide-y divide-gray-100">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const active = isActive(item.href);

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center justify-between px-6 py-4 transition ${
//                 active ? "bg-red-50" : "hover:bg-gray-50"
//               }`}

//             >
//               <div className="flex items-center gap-4 ">

//                 <Icon className={`w-5 h-5 ${active ? "text-red-600" : "text-gray-500"}`} />
//                 <span className={`font-medium ${active ? "text-red-700  " : "text-gray-900"}`}>
//                   {item.label}
//                 </span>
//               </div>

//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Bell, Lock, FileText, Trash2, ChevronRight } from "lucide-react"

const navItems = [
  { href: "/super-admin/settings", label: "School Information", icon: Home },
  { href: "/super-admin/settings/profile", label: "Profile", icon: User },
  {
    href: "/super-admin/settings/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    href: "/super-admin/settings/reset-password",
    label: "Reset Password",
    icon: Lock,
  },
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

export default function MobileMoreSettings() {
  const pathname = usePathname()

  // Active only when the current path exactly matches or starts with the href
  // but for the root "/super-admin/settings" we only want exact match
  const isActive = (href: string) => {
    if (href === "/super-admin/settings") {
      return pathname === "/super-admin/settings"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
      </div>

      {/* Navigation items */}
      <div className="divide-y divide-gray-100">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center justify-between px-6 py-4 transition-colors ${
                active ? "bg-red-50 hover:bg-red-50" : "hover:bg-gray-50"
              } ${item.danger ? "text-red-600" : ""}`}
            >
              {/* Red left border for active item */}
              {active && (
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-red-600" />
              )}

              <div className="flex items-center gap-4">
                <Icon
                  className={`h-5 w-5 ${active ? "text-red-600" : "text-gray-500"}`}
                />
                <span
                  className={`font-medium ${active ? "text-red-700" : "text-gray-900"}`}
                >
                  {item.label}
                </span>
              </div>

              {/* Right chevron */}
              <ChevronRight
                className={`h-5 w-5 ${active ? "text-red-600" : "text-gray-400"}`}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { BellIcon, ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import { useAuthStore } from "@/store/auth-store"

export default function Topbar() {
  return (
    <div className="flex h-full w-full items-center justify-end gap-4 bg-white px-6">
      <Button size="icon" variant="ghost">
        <BellIcon className="h-5 w-5" />
      </Button>
      <ProfileButton />
    </div>
  )
}

function ProfileButton() {
  const { profile } = useAuthStore()

  return (
    <button className="flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-3 py-1.5 text-sm transition hover:bg-gray-50">
      <Image
        src="/assets/user.png"
        width={75}
        height={75}
        alt="profile"
        className="h-6 w-6 rounded-full object-cover"
      />

      <p className="flex items-center gap-0.5 font-medium text-gray-800">
        <span>{profile?.firstName || "User"}</span>
        <span>{profile?.lastName || "Name"}</span>
      </p>

      <ChevronDownIcon className="h-4 w-4 text-gray-600" />
    </button>
  )
}

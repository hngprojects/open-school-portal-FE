// app/admin/teachers/page.tsx
"use client"

import { UsersView } from "@/components/users/users-view"
import { useTeacherStore } from "@/store/general-auth-store"
import { User } from "@/types/user"
import { LoaderIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function TeachersPage() {
  const router = useRouter()
  const teachers = useTeacherStore((state) => state.teachers) as User[]
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Simulate a loading delay
  }, [])

  const handleAddTeacher = () => {
    router.push("/admin/teachers/new")
  }

  return isLoading ? (
    <div className="flex h-48 w-full items-center justify-center">
      <LoaderIcon className="size-16 animate-spin" />
    </div>
  ) : (
    <UsersView users={teachers} userType="teachers" onAddUser={handleAddTeacher} />
  )
}

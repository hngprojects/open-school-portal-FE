// app/admin/students/page.tsx
"use client"

import { UsersView } from "@/components/users/users-view"
import { students } from "@/data/students"
import { useRouter } from "next/navigation"

export default function StudentsPage() {
  const router = useRouter()

  const handleAddStudent = () => {
    router.push("/admin/students/new")
  }

  return <UsersView users={students} userType="students" onAddUser={handleAddStudent} />
}

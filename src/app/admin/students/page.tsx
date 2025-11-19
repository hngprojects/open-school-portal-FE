// app/admin/students/page.tsx
import { UsersView } from "@/components/users/users-view"
import { students } from "@/data/students"

export default function StudentsPage() {
  return <UsersView users={students} userType="students" />
}

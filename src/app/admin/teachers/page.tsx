// app/admin/teachers/page.tsx
import { UsersView } from "@/components/users/users-view"
import { teachers } from "@/data/teachers"

export default function TeachersPage() {
  return <UsersView users={teachers} userType="teachers" />
}

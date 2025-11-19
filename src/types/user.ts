// types/user.ts
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  status: "active" | "inactive"
  role: string
  joinDate: string
}

export type UserType = "teachers" | "students"

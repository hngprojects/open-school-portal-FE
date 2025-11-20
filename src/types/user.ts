// types/user.ts
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  status: "active" | "inactive"
  role: string
  phone: string
  employeeId?: string // Optional for teachers
  regNumber?: string // For students
  class?: string // For students
  address?: string // For students
  guardian?: string // For students
  joinDate: string
}

export type UserType = "teachers" | "students"

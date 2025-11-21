export type UserStatus = "active" | "inactive"
export type UserType = "teachers" | "students"

export interface User {
  id: string
  name: string
  title: string
  firstName: string
  lastName: string
  middleName?: string
  email: string
  role: string
  employeeId?: string
  regNumber?: string
  class?: string
  guardian?: string
  joinDate: string
  status: UserStatus
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  avatar?: string
}

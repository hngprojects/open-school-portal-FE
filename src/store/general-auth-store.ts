import { string } from "zod"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Teacher {
  id: string
  name: string
  email: string
  subject: string
  status: string
  role: string
  phone: string
  employeeId: string
  joinDate: string
}

interface TeacherStore {
  teachers: Partial<Teacher>[]
  addTeacher: (teacher: Partial<Teacher>) => Promise<void>
  removeTeacher: (id: string) => Promise<void>
}

export const useTeacherStore = create<TeacherStore>()(
  persist(
    (set) => ({
      teachers: [],
      addTeacher: async (teacher) => {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate delay
        set((state) => ({ teachers: [...state.teachers, teacher] }))
      },
      removeTeacher: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate delay
        set((state) => ({
          teachers: state.teachers.filter((teacher) => teacher.id !== id),
        }))
      },
    }),
    { name: "teacher-store" } // Key for localStorage
  )
)

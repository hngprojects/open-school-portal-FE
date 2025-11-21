// store/general-auth-store.ts

import { create } from "zustand"
import { TeachersAPI } from "@/lib/teachers"
import { User } from "@/types/user"

interface TeacherState {
  loading: boolean
  error: string | null
  teachers: User[]
  fetchTeachers: () => Promise<void>
  addTeacher: (teacher: User) => void
  deleteTeacher: (id: string) => Promise<void>
  updateTeacher: (id: string, updatedTeacher: Partial<User>) => Promise<void>
  clearError: () => void
}

export const useTeacherStore = create<TeacherState>((set, get) => ({
  teachers: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchTeachers: async () => {
    // Prevent multiple simultaneous fetches
    if (get().loading) return

    set({ loading: true, error: null })
    try {
      const data = await TeachersAPI.getAll()
      set({ teachers: data, loading: false, error: null })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch teachers"
      set({
        loading: false,
        error: errorMessage,
        teachers: [], // Clear teachers on error
      })
    }
  },

  addTeacher: (teacher) => {
    set((state) => ({ teachers: [...state.teachers, teacher] }))
  },

  deleteTeacher: async (id) => {
    set({ error: null })
    try {
      await TeachersAPI.delete(id)
      set((state) => ({
        teachers: state.teachers.filter((t) => t.id !== id),
        error: null,
      }))
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete teachers"
      set({ error: errorMessage })
    }
  },

  updateTeacher: async (id, updatedTeacher) => {
    set({ error: null })
    try {
      const updated = await TeachersAPI.update(id, updatedTeacher)
      set((state) => ({
        teachers: state.teachers.map((t) => (t.id === id ? { ...t, ...updated } : t)),
        error: null,
      }))
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update teachers"
      set({ error: errorMessage })
      throw error
    }
  },
}))

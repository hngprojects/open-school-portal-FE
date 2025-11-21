import { api } from "./api"
import { User } from "@/types/user"

export type CreateTeacherData = Omit<User, "id" | "avatar"> & {
  photo?: File
}

export type UpdateTeacherData = Partial<CreateTeacherData>

export const TeachersAPI = {
  getAll: (): Promise<User[]> => api("/teachers"),
  getOne: (id: string): Promise<User> => api(`/teachers/${id}`),
  create: (data: CreateTeacherData): Promise<User> =>
    api("/teachers", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: UpdateTeacherData): Promise<User> =>
    api(`/teachers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string): Promise<void> =>
    api(`/teachers/${id}`, {
      method: "DELETE",
    }),
}

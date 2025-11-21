import { User } from "@/types/user"
import { apiFetch } from "./api/client"

export type CreateTeacherData = Omit<User, "id" | "avatar"> & {
  photo?: File
}

export type UpdateTeacherData = Partial<CreateTeacherData>

export const TeachersAPI = {
  getAll: (): Promise<User[]> => apiFetch("/teachers", undefined, true),

  getOne: (id: string): Promise<User> => apiFetch(`/teachers/${id}`, undefined, true),

  create: (data: CreateTeacherData): Promise<User> =>
    apiFetch(
      "/teachers",
      {
        method: "POST",
        data, // Axios handles JSON automatically
      },
      true
    ),

  update: (id: string, data: UpdateTeacherData): Promise<User> =>
    apiFetch(
      `/teachers/${id}`,
      {
        method: "PATCH",
        data,
      },
      true
    ),

  delete: (id: string): Promise<void> =>
    apiFetch(
      `/teachers/${id}`,
      {
        method: "DELETE",
      },
      true
    ),
}

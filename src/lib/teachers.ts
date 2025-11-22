import { SnakeUser as User } from "@/types/user"
import { apiFetch } from "./api/client"

export type CreateTeacherData = Omit<User, "id" | "avatar" | "role" | "status"> & {
  photo?: File
}

export type UpdateTeacherData = Partial<CreateTeacherData>

type ResponsePack<T> = {
  data: T
  message: string
}

export const TeachersAPI = {
  getAll: (onlyActive?: boolean) =>
    apiFetch<ResponsePack<ResponsePack<User[]>>>(
      "/teachers",
      { params: { active: onlyActive } },
      true
    ),

  getOne: (id: string) =>
    apiFetch<ResponsePack<User>>(`/teachers/${id}`, undefined, true),

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

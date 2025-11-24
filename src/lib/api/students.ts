import { SnakeUser as User } from "@/types/user"
import { apiFetch } from "./client"

export type CreateStudentData = Omit<User, "id" | "avatar" | "role" | "is_active"> & {
  photo?: File
}

export type UpdateStudentData = Partial<CreateStudentData>

type ResponsePack<T> = {
  data: T
  message: string
}

export interface GetStudentsParams {
  is_active?: boolean
  page?: number
  search?: string
}

export const StudentsAPI = {
  getAll: (params?: GetStudentsParams) =>
    apiFetch<ResponsePack<ResponsePack<User[]>>>(
      "/students",
      {
        params,
      },
      true
    ),

  getOne: (id: string) =>
    apiFetch<ResponsePack<User>>(`/students/${id}`, undefined, true),

  create: (data: CreateStudentData): Promise<User> =>
    apiFetch(
      "/students",
      {
        method: "POST",
        data, // Axios handles JSON automatically
      },
      true
    ),

  update: (id: string, data: UpdateStudentData): Promise<User> =>
    apiFetch(
      `/students/${id}`,
      {
        method: "PATCH",
        data,
      },
      true
    ),

  delete: (id: string): Promise<void> =>
    apiFetch(
      `/students/${id}`,
      {
        method: "DELETE",
      },
      true
    ),
}

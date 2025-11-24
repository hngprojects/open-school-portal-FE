import { SnakeUser as User } from "@/types/user"
import { apiFetch } from "./api/client"

export type CreateParentData = Omit<
  User,
  "id" | "avatar" | "role" | "is_active" | "employment_id"
> & {
  photo?: File
}

export type UpdateParentData = Partial<CreateParentData>

type ResponsePack<T> = {
  data: T
  message: string
}

export interface GetParentsParams {
  is_active?: boolean
  page?: number
  search?: string
}

export const ParentsAPI = {
  getAll: (params?: GetParentsParams) =>
    apiFetch<ResponsePack<ResponsePack<User[]>>>(
      "/parents",
      {
        params,
      },
      true
    ),

  getOne: (id: string) => apiFetch<ResponsePack<User>>(`/parents/${id}`, undefined, true),

  create: (data: CreateParentData): Promise<User> =>
    apiFetch(
      "/parents",
      {
        method: "POST",
        data,
      },
      true
    ),

  update: (id: string, data: UpdateParentData): Promise<User> =>
    apiFetch(
      `/parents/${id}`,
      {
        method: "PATCH",
        data,
      },
      true
    ),

  delete: (id: string): Promise<void> =>
    apiFetch(
      `/parents/${id}`,
      {
        method: "DELETE",
      },
      true
    ),
}

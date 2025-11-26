import { apiFetch } from "./api/client"

export interface Classroom {
  id: string
  name: string
  capacity: number
  type: string
  location: string
  description: string
  is_available: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateClassroomData {
  name: string
  capacity: number
  type: string
  location: string
  description: string
}

export interface UpdateClassroomData extends Partial<CreateClassroomData> {
  is_available?: boolean
}

export interface GetClassroomsParams {
  search?: string
  type?: string
  location?: string
  is_available?: boolean
  page?: number
}

type ResponsePack<T> = {
  data: T
  message: string
}

export const ClassroomsAPI = {
  getAll: (params?: GetClassroomsParams) =>
    apiFetch<ResponsePack<ResponsePack<Classroom[]>>>(
      "/rooms",
      {
        params,
      },
      true
    ),

  getOne: (id: string) =>
    apiFetch<ResponsePack<Classroom>>(`/rooms/${id}`, undefined, true),

  create: (data: CreateClassroomData): Promise<Classroom> =>
    apiFetch(
      "/rooms",
      {
        method: "POST",
        data,
      },
      true
    ),

  update: (id: string, data: UpdateClassroomData): Promise<Classroom> =>
    apiFetch(
      `/rooms/${id}`,
      {
        method: "PATCH",
        data,
      },
      true
    ),

  delete: (id: string): Promise<void> =>
    apiFetch(
      `/rooms/${id}`,
      {
        method: "DELETE",
      },
      true
    ),
}

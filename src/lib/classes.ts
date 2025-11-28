import { apiFetch } from "./api/client"

export type CreateClassData = {
  name: string
  arm?: string
}

export type UpdateClassData = Partial<CreateClassData>

type ResponsePack<T> = {
  message: string
  data: T
}

export interface ClassItem {
  id: string
  name: string
  academicSession: {
    id: string
    name: string
  }
  classes: {
    id: string
    arm: string
  }[]
}

interface Pagination {
  total: number
  limit: number
  page: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export interface GroupedClassResponse {
  items: ClassItem[]
  pagination: Pagination
}

export const ClassesAPI = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiFetch<ResponsePack<GroupedClassResponse>>("/classes", { params }, true),

  create: (body: CreateClassData) =>
    apiFetch<ResponsePack<ClassItem>>("/classes", { method: "POST", data: body }, true),

  update: (id: string, body: UpdateClassData) =>
    apiFetch<ResponsePack<ClassItem>>(
      `/classes/${id}`,
      { method: "PATCH", data: body },
      true
    ),

  assignedTeachers: (id: string, session_id?: string) =>
    apiFetch<
      ResponsePack<
        {
          teacher_id: string
          name: string
          assignment_date: string
          streams: string
        }[]
      >
    >(`/classes/${id}/teachers`, { params: { session_id } }, true),
}

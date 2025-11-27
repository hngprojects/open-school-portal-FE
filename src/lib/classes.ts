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
  arm: string
  academicSession: {
    id: string
    name: string
  }
}

export interface GroupedClassResponse {
  status_code: number
  message: string
  data: {
    name: string
    academicSession: {
      id: string
      name: string
    }
    classes: { id: string; arm: string }[]
  }[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const ClassesAPI = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiFetch<ResponsePack<GroupedClassResponse>>("/v1/classes", { params }, true),

  create: (body: CreateClassData) =>
    apiFetch<ResponsePack<ClassItem>>(
      "/v1/classes",
      { method: "POST", data: body },
      true
    ),

  update: (id: string, body: UpdateClassData) =>
    apiFetch<ResponsePack<ClassItem>>(
      `/v1/classes/${id}`,
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
    >(`/v1/classes/${id}/teachers`, { params: { session_id } }, true),
}

import { apiFetch } from "./api/client"

export type CreateClassData = {
  name: string
  arm?: string
  teacherIds?: string[]
}

export type UpdateClassData = Partial<CreateClassData>

type ResponsePack<T> = {
  message: string
  data: T
}

export interface ClassItem {
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

export interface SingleClass {
  id: string
  name: string
  arm: string
  academicSession: {
    id: string
    name: string
  }
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

  delete: (id: string) =>
    apiFetch<ResponsePack<null>>(`/classes/${id}`, { method: "DELETE" }, true),

  getOne: (id: string) =>
    apiFetch<ResponsePack<SingleClass>>(`/classes/${id}`, { method: "GET" }, true),

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

  getSubjectsForClass: (id: string) =>
    apiFetch<ClassSubjectsResponse>(`/classes/${id}/subjects`, { method: "GET" }, true),

  count: () => apiFetch<ResponsePack<{ total: number }>>("/classes/count", {}, true),
}

export type ClassSubjectsResponse = {
  payload: ClassSubject[]
  paginationMeta: {
    total: number
  }
}

export interface ClassSubject {
  id: string
  createdAt: string
  updatedAt: string
  teacher_assignment_date: string
  subject: Subject
  teacher: Teacher
}

export interface Subject {
  id: string
  createdAt: string
  updatedAt: string
  name: string
}

export interface Teacher {
  id: string
  createdAt: string
  updatedAt: string
  user_id: string
  employment_id: string
  title: string
  photo_url: string
  is_active: boolean
}

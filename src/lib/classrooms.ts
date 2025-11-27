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
    apiFetch<ResponsePack<Classroom>>(
      "/rooms",
      {
        method: "POST",
        data,
      },
      true
    )
      .then((response) => response.data)
      .catch((error) => {
        const errorMessage = error?.message?.toLowerCase() || ""

        // Handle classroom-specific conflicts with specific messages
        if (errorMessage.includes("name") && errorMessage.includes("already exists")) {
          throw new Error(
            "A classroom with this name already exists. Please choose a different name."
          )
        }

        if (
          errorMessage.includes("location") &&
          errorMessage.includes("already exists")
        ) {
          throw new Error(
            "A classroom in this location already exists. Please choose a different location."
          )
        }

        if (error?.message?.includes("409") || errorMessage.includes("already exists")) {
          throw new Error("A classroom with these details already exists.")
        }
        throw error
      }),

  update: (id: string, data: UpdateClassroomData): Promise<Classroom> =>
    apiFetch<ResponsePack<Classroom>>(
      `/rooms/${id}`,
      {
        method: "PATCH",
        data,
      },
      true
    )
      .then((response) => response.data)
      .catch((error) => {
        const errorMessage = error?.message?.toLowerCase() || ""

        // Handle classroom-specific conflicts during update
        if (errorMessage.includes("name") && errorMessage.includes("already exists")) {
          throw new Error(
            "A classroom with this name already exists. Please choose a different name."
          )
        }

        if (error?.message?.includes("409") || errorMessage.includes("already exists")) {
          throw new Error("A classroom with these details already exists.")
        }
        throw error
      }),

  delete: (id: string): Promise<void> =>
    apiFetch(
      `/rooms/${id}`,
      {
        method: "DELETE",
      },
      true
    ),
}

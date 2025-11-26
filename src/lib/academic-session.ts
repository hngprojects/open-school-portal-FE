import { apiFetch } from "./api/client"

export type CreateAcademicSessionData = {
  name: string
  startDate: string
  endDate: string
}

// type ResponsePack<T> = {
//   data: T
//   message: string
// }

export const AcademicSessionAPI = {
  create: (data: CreateAcademicSessionData) =>
    apiFetch("/academic-session", {
      method: "POST",
      data,
    }),
}

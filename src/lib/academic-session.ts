import { apiFetch } from "./api/client"

export type CreateAcademicSessionData = {
  name: string
  startDate: string
  endDate: string
}

export const AcademicSessionAPI = {
  create: (data: CreateAcademicSessionData) =>
    apiFetch(
      "/academic-session",
      {
        method: "POST",
        data,
      },
      true
    ),
}

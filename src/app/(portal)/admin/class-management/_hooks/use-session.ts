"use client"

import { useMutation } from "@tanstack/react-query"
import { AcademicSessionAPI, CreateAcademicSessionData } from "@/lib/academic-session"

export function useCreateAcademicSession() {
  return useMutation({
    mutationFn: (data: CreateAcademicSessionData) => AcademicSessionAPI.create(data),
  })
}

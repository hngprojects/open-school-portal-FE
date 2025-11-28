import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ClassesAPI, CreateClassData, UpdateClassData } from "@/lib/classes"
import { toast } from "sonner"
import { AxiosError } from "axios"

// QUERY KEYS
export const CLASS_KEYS = {
  all: ["classes"],
  detail: (id: string) => ["class", id],
  teachers: (id: string) => ["class_teachers", id],
}

// GET ALL (GROUPED)
export const useGetClassesInfo = (params?: { page?: number; limit?: number }) =>
  useQuery({
    queryKey: CLASS_KEYS.all,
    queryFn: () => ClassesAPI.getAll(params),
    select: (data) => data.data,
  })



// CREATE CLASS
export const useCreateClass = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateClassData) => ClassesAPI.create(data),
    onSuccess: () => {
      //   toast.success(res.message)
      qc.invalidateQueries({ queryKey: CLASS_KEYS.all })
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message ?? "Failed to create class")
      }
    },
  })
}

// UPDATE CLASS
export const useUpdateClass = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & UpdateClassData) =>
      ClassesAPI.update(id, data),
    onSuccess: () => {
      //   toast.success(res.message)
      qc.invalidateQueries({ queryKey: CLASS_KEYS.all })
      //   qc.invalidateQueries({ queryKey: CLASS_KEYS.detail(res.data.id) })
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message ?? "Failed to update class")
      }
    },
  })
}

// TEACHERS FOR CLASS
export const useGetClassTeachers = (id: string, session_id?: string) =>
  useQuery({
    queryKey: CLASS_KEYS.teachers(id),
    queryFn: () => ClassesAPI.assignedTeachers(id, session_id),
    enabled: !!id,
  })

"use client"

import { useParams, useRouter } from "next/navigation"
import { UpdateStudentData } from "@/lib/students"
import { NewPersonFormBuilder } from "@/app/(portal)/admin/_components/add-new-person-form-template"
import { ArrowLeftIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useGetStudent, useUpdateStudent } from "../_hooks/use-students"
import { studentFormConfig } from "../new/components/new-student-form"

export default function EditStudentPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: student, isLoading, isError, error } = useGetStudent(id as string)
  const updateStudentMutation = useUpdateStudent(id as string)

  async function handleCancel() {
    router.push("/admin/students")
  }

  async function handleSubmit(formData: Record<string, unknown>) {
    if (!id) return

    try {
      const updateData: UpdateStudentData = {
        title: formData.title as string,
        first_name: formData.first_name as string,
        last_name: formData.last_name as string,
        middle_name: formData.middle_name as string,
        identification_number: formData.identification_number as string,
        class: formData.class as string,
        phone: formData.parent_guardian_phone as string,
        date_of_birth: formData.date_of_birth as string,
        gender: formData.gender as string,
        home_address: formData.home_address as string,
        parent_guardian_name: formData.parent_guardian_name as string,
        parent_guardian_phone: formData.parent_guardian_phone as string,
      }

      await updateStudentMutation.mutateAsync(updateData)
      // Small delay to ensure toast shows before navigation
      setTimeout(() => {
        router.push("/admin/students")
      }, 300)
    } catch (err) {
      // Error toast is handled in the hook
      throw err // Let the form handle the error
    }
  }

  if (isLoading) {
    return (
      <div className="mb-10 w-full space-y-8 bg-white p-4 md:p-10">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />
            <p className="text-gray-600">Loading student details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !student) {
    return (
      <div className="mb-10 w-full space-y-8 bg-white p-4 md:p-10">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              {error?.message || "Student Not Found"}
            </h2>
            <p className="mb-6 text-gray-600">
              {error?.message || "The student you're looking for doesn't exist."}
            </p>
            <Button asChild>
              <Link href="/admin/students">Back to Students</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Prepare initial data for the form
  const initialData = {
    title: student.title,
    first_name: student.first_name,
    last_name: student.last_name,
    middle_name: student.middle_name || "",
    identification_number: student.reg_number || "",
    class: student.class || "",
    date_of_birth: student.date_of_birth,
    gender: student.gender,
    parent_guardian_phone: student.phone,
    home_address: student.home_address,
    parent_guardian_name: student.guardian || "",
    generated_password: "", // Empty for security
  }

  return (
    <div className="mb-10 w-full space-y-8 bg-white p-4 md:p-10">
      <div>
        <div className="mb-4 md:mb-0 md:hidden">
          <Button
            asChild
            variant="ghost"
            className="bg-gray-100 hover:bg-gray-200"
            size="icon"
          >
            <Link href="/admin/students">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <h1 className="mb-2 text-xl font-bold text-gray-900">Edit Student</h1>
        <p className="text-gray-600">Update student details.</p>
      </div>
      <div className="md:px-8">
        <NewPersonFormBuilder
          config={studentFormConfig}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={initialData}
        />
      </div>
    </div>
  )
}

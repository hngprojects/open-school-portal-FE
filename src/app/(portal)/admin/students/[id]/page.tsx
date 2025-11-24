"use client"

import { useParams, useRouter } from "next/navigation"
import { UpdateStudentData } from "@/lib/api/students"
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
        first_name: formData.firstName as string,
        last_name: formData.lastName as string,
        middle_name: formData.middleName as string,
        employment_id: formData.employmentId as string,
        phone: formData.phoneNumber as string,
        date_of_birth: formData.dateOfBirth as string,
        gender: formData.gender as string,
        home_address: formData.homeAddress as string,
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
    firstName: student.first_name,
    lastName: student.last_name,
    middleName: student.middle_name || "",
    employmentId: student.employment_id,
    dateOfBirth: student.date_of_birth,
    gender: student.gender,
    phoneNumber: student.phone,
    homeAddress: student.home_address,
    generatedPassword: "", // Empty for security
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

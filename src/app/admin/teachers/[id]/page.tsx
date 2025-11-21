// app/admin/teachers/[id]/page.tsx

"use client"

import { useEffect, useState } from "react"
import { TeachersAPI, UpdateTeacherData } from "@/lib/teachers"
import { useParams, useRouter } from "next/navigation"
import {
  NewPersonFormBuilder,
  NewPersonFormConfig,
} from "@/app/(dashboard)/_components/add-new-person-form-template"
import { User } from "@/types/user"
import { ArrowLeftIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Import generatePassword function
const generatePassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  return password
}

export default function EditTeacherPage() {
  const { id } = useParams()
  const router = useRouter()
  const [teacher, setTeacher] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const loadTeacher = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await TeachersAPI.getOne(id as string)
        setTeacher(data)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Failed to load teacher")
      } finally {
        setLoading(false)
      }
    }

    loadTeacher()
  }, [id])

  // Create edit form config matching the create form
  const editTeacherConfig: NewPersonFormConfig = {
    fields: [
      {
        name: "title",
        label: "Select Title",
        type: "select",
        required: true,
        options: [
          { value: "mr", label: "Mr." },
          { value: "miss", label: "Miss" },
          { value: "mrs", label: "Mrs." },
          { value: "dr", label: "Dr." },
          { value: "prof", label: "Prof." },
        ],
      },
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter first name",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter last name",
        required: true,
      },
      {
        name: "middleName",
        label: "Middle Name",
        type: "text",
        placeholder: "Enter middle name",
      },
      {
        name: "employmentId",
        label: "Employment ID",
        type: "text",
        placeholder: "Enter employment ID",
        required: true,
      },
      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "date",
        required: true,
      },
      {
        name: "generatedPassword",
        label: "Generate Password",
        type: "password-generate",
        placeholder: "emp1234",
        required: false, // Not required for edit
        generateButton: {
          text: "Generate",
          onGenerate: generatePassword,
        },
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter phone number",
        required: true,
      },
      {
        name: "homeAddress",
        label: "Home Address",
        type: "text",
        placeholder: "Enter home address",
        required: true,
      },
      {
        name: "photo",
        label: "Upload Photo (150x150)",
        type: "file",
        accept: "image/*",
        buttonText: "Select file",
      },
    ],
    submitText: "Save Changes",
    cancelText: "Cancel",
    onCancel: () => {
      router.push("/admin/teachers")
    },
  }

  async function handleSubmit(formData: Record<string, unknown>) {
    if (!id) return

    try {
      const updateData: UpdateTeacherData = {
        title: formData.title as string,
        firstName: formData.firstName as string,
        lastName: formData.lastName as string,
        middleName: formData.middleName as string,
        name: `${formData.title} ${formData.firstName} ${formData.lastName}`,
        employeeId: formData.employmentId as string,
        phone: formData.phoneNumber as string,
        dateOfBirth: formData.dateOfBirth as string,
        gender: formData.gender as string,
        address: formData.homeAddress as string,
      }

      await TeachersAPI.update(id as string, updateData)
      router.push("/admin/teachers")
    } catch (err) {
      console.error(err)
      throw err // Let the form handle the error
    }
  }

  if (loading) {
    return (
      <div className="mb-10 w-full space-y-8 bg-white p-4 md:p-10">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />
            <p className="text-gray-600">Loading teacher details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !teacher) {
    return (
      <div className="mb-10 w-full space-y-8 bg-white p-4 md:p-10">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              {error || "Teacher Not Found"}
            </h2>
            <p className="mb-6 text-gray-600">
              {error || "The teacher you're looking for doesn't exist."}
            </p>
            <Button asChild>
              <Link href="/admin/teachers">Back to Teachers</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Prepare initial data for the form
  const initialData = {
    title: teacher.title,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    middleName: teacher.middleName || "",
    employmentId: teacher.employeeId,
    dateOfBirth: teacher.dateOfBirth,
    gender: teacher.gender,
    phoneNumber: teacher.phone,
    homeAddress: teacher.address,
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
            <Link href="/admin/teachers">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <h1 className="mb-2 text-xl font-bold text-gray-900">Edit Teacher</h1>
        <p className="text-gray-600">Update teacher details.</p>
      </div>
      <div className="md:px-8">
        <NewPersonFormBuilder
          config={editTeacherConfig}
          onSubmit={handleSubmit}
          initialData={initialData}
        />
      </div>
    </div>
  )
}

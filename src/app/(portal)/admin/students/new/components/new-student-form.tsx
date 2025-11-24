"use client"

import {
  NewPersonFormBuilder,
  NewPersonFormConfig,
} from "@/app/(portal)/admin/_components/add-new-person-form-template"
import { useRouter } from "next/navigation"
import { useCreateStudent } from "../../_hooks/use-students"
import { CreateStudentData } from "@/lib/api/students"

const generatePassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  return password
}

export const studentFormConfig: NewPersonFormConfig = {
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
        { value: "master", label: "Master" },
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
      name: "identificationNumber",
      label: "Identification Number",
      type: "text",
      placeholder: "Enter ID number",
      required: true,
    },
    {
      name: "generatedPassword",
      label: "Generate Password",
      type: "password-generate",
      placeholder: "emp1234",
      required: true,
      generateButton: {
        text: "Generate",
        onGenerate: generatePassword,
      },
    },
    {
      name: "class",
      label: "Class",
      type: "text",
      placeholder: "Enter class",
      required: true,
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
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
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
      name: "parentGuardianName",
      label: "Parent/ Guardian Name",
      type: "text",
      placeholder: "Enter parent/guardian name",
      required: true,
    },
    {
      name: "parentGuardianPhone",
      label: "Parent/Guardian Phone Number",
      type: "tel",
      placeholder: "Enter phone number",
      required: true,
    },
    {
      name: "photo",
      label: "Upload Photo (150x150)",
      type: "file",
      accept: "image/*",
      buttonText: "Select file",
      required: true,
    },
  ],
  submitText: "Save",
  cancelText: "Cancel",
}

export default function NewStudentForm() {
  const router = useRouter()
  const createNewStudent = useCreateStudent().mutateAsync

  return (
    <NewPersonFormBuilder
      key={"new-student"}
      config={studentFormConfig}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  )

  async function handleCancel() {
    router.push("/admin/students")
  }

  async function handleSubmit(formData: Record<string, unknown>) {
    const newStudent: CreateStudentData = {
      title: formData.title as string,
      first_name: formData.firstName as string,
      last_name: formData.lastName as string,
      middle_name: formData.middleName as string,
      email: formData.email as string,
      employment_id: formData.employmentId as string,
      phone: formData.phoneNumber as string,
      date_of_birth: formData.dateOfBirth as string,
      gender: formData.gender as string,
      home_address: formData.homeAddress as string,
    }

    try {
      // Log payload so we can inspect what is sent to the backend
      console.log("Creating student — payload:", newStudent)
      await createNewStudent(newStudent)
      router.push("/admin/students")
    } catch (err) {
      // Surface error details in the console for debugging
      console.error("Failed to create student:", err)
      throw err
    }
  }
}

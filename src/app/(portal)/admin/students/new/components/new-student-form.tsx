"use client"

import {
  NewPersonFormBuilder,
  NewPersonFormConfig,
} from "@/app/(portal)/admin/_components/add-new-person-form-template"
import { CreateStudentData } from "@/lib/students"
import { useRouter } from "next/navigation"
import { useCreateStudent } from "../../_hooks/use-students"

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
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      required: true,
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      required: true,
    },
    {
      name: "middle_name",
      label: "Middle Name",
      type: "text",
      placeholder: "Enter middle name",
    },
    {
      name: "identification_number",
      label: "Identification Number",
      type: "text",
      placeholder: "Enter ID number",
      required: true,
    },
    {
      name: "generated_password",
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
      name: "date_of_birth",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
    {
      name: "home_address",
      label: "Home Address",
      type: "text",
      placeholder: "Enter home address",
      required: true,
    },
    {
      name: "parent_guardian_name",
      label: "Parent/ Guardian Name",
      type: "text",
      placeholder: "Enter parent/guardian name",
      required: true,
    },
    {
      name: "parent_guardian_phone",
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
      first_name: formData.first_name as string,
      last_name: formData.last_name as string,
      middle_name: formData.middle_name as string,
      email: formData.email as string,
      identification_number: formData.identification_number as string,
      class: formData.class as string,
      phone: formData.parent_guardian_phone as string,
      date_of_birth: formData.date_of_birth as string,
      gender: formData.gender as string,
      home_address: formData.home_address as string,
      parent_guardian_name: formData.parent_guardian_name as string,
      parent_guardian_phone: formData.parent_guardian_phone as string,
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

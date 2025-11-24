"use client"

import {
  NewPersonFormBuilder,
  NewPersonFormConfig,
} from "@/app/admin/_components/add-new-person-form-template"
import { CreateParentData } from "@/lib/parents"
import { useRouter } from "next/navigation"
import { useCreateParent } from "../../_hooks/use-parents"

const generatePassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  return password
}

export const parentFormConfig: NewPersonFormConfig = {
  fields: [
    {
      name: "title",
      label: "Select Title",
      type: "select",
      required: true,
      options: [
        { value: "Mr", label: "Mr." },
        { value: "Miss", label: "Miss" },
        { value: "Mrs", label: "Mrs." },
        { value: "Dr", label: "Dr." },
        { value: "Prof", label: "Prof." },
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
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter email address",
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
      required: true,
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
  submitText: "Save",
  cancelText: "Cancel",
}

export default function NewParentForm() {
  const router = useRouter()
  const createNewParent = useCreateParent().mutateAsync

  return (
    <NewPersonFormBuilder
      key={"new-parent"}
      config={parentFormConfig}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  )

  async function handleCancel() {
    router.push("/admin/parents")
  }

  async function handleSubmit(formData: Record<string, unknown>) {
    const newParent: CreateParentData = {
      title: formData.title as string,
      first_name: formData.firstName as string,
      last_name: formData.lastName as string,
      middle_name: formData.middleName as string,
      email: formData.email as string,
      phone: formData.phoneNumber as string,
      date_of_birth: formData.dateOfBirth as string,
      gender: formData.gender as string,
      home_address: formData.homeAddress as string,
    }

    try {
      console.log("Creating parent — payload:", newParent)
      await createNewParent(newParent)
      router.push("/admin/parents")
    } catch (err) {
      console.error("Failed to create parent:", err)
      throw err
    }
  }
}

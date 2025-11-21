"use client"

import {
  NewPersonFormBuilder,
  NewPersonFormConfig,
} from "@/app/(dashboard)/_components/add-new-person-form-template"
import { useTeacherStore } from "@/store/general-auth-store"
import { User } from "@/types/user"

const generatePassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  return password
}

export const teacherFormConfig: NewPersonFormConfig = {
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
      required: true,
    },
  ],
  submitText: "Save",
  cancelText: "Cancel",
  onCancel: () => {
    console.log("Form cancelled")
  },
}

export default function NewTeacherForm() {
  const addTeacher = useTeacherStore((state) => state.addTeacher)

  return <NewPersonFormBuilder config={teacherFormConfig} onSubmit={handleSubmit} />

  async function handleSubmit(formData: Record<string, unknown>) {
    console.log("Submitting new teacher form...")
    const firstName = formData.firstName as string
    const lastName = formData.lastName as string
    const id = formData.employmentId as string
    const title = formData.title as string
    const dateOfBirth = formData.dateOfBirth as string
    const gender = formData.gender as string
    const phoneNumber = formData.phoneNumber as string
    const homeAddress = formData.homeAddress as string
    const middleName = (formData.middleName as string) || ""

    const newTeacher: User = {
      id,
      name: `${title} ${firstName} ${lastName}`,
      title,
      firstName,
      lastName,
      middleName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@school.com`,
      role: "Mathematics Teacher",
      employeeId: id,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
      phone: phoneNumber,
      dateOfBirth,
      gender,
      address: homeAddress,
    }

    await addTeacher(newTeacher)
    console.log("Teacher added successfully!")
  }
}

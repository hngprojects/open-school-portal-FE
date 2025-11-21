"use client"

import {
  NewPersonFormBuilder,
  NewPersonFormConfig,
} from "@/app/(dashboard)/_components/add-new-person-form-template"
import { TeachersAPI, CreateTeacherData } from "@/lib/teachers"
import { useRouter } from "next/navigation"
import { UserStatus } from "@/types/user"

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
    },
  ],
  submitText: "Save",
  cancelText: "Cancel",
  onCancel: () => {
    console.log("Form cancelled")
  },
}

export default function NewTeacherForm() {
  const router = useRouter()

  return <NewPersonFormBuilder config={teacherFormConfig} onSubmit={handleSubmit} />

  async function handleSubmit(formData: Record<string, unknown>) {
    const firstName = formData.firstName as string
    const lastName = formData.lastName as string
    const id = formData.employmentId as string

    const subjects = [
      "Mathematics",
      "English",
      "Science",
      "History",
      "Geography",
      "Art",
      "Physical Education",
      "Music",
      "Computer Science",
      "Biology",
    ]
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)]

    const newTeacher: CreateTeacherData = {
      name: `${formData.title} ${formData.firstName} ${formData.lastName}`,
      title: formData.title as string,
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      middleName: formData.middleName as string,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@openschoolportal.com`,
      role: randomSubject,
      employeeId: id,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active" as UserStatus,
      phone: formData.phoneNumber as string,
      dateOfBirth: formData.dateOfBirth as string,
      gender: formData.gender as string,
      address: formData.homeAddress as string,
    }

    await TeachersAPI.create(newTeacher)
    router.push("/admin/teachers")
  }
}

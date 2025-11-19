"use client"

import {
  NewPersonFormBuilder,
  NewPersonFormConfig,
} from "@/app/(dashboard)/_components/add-new-person-form-template"

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
  return <NewPersonFormBuilder config={teacherFormConfig} onSubmit={handleSubmit} />

  async function handleSubmit() {
    console.log("Submitting new teacher form...")
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}

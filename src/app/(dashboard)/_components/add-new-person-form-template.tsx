import React, { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "select"
  | "file"
  | "password-generate"

export interface FormField {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  generateButton?: {
    text: string
    onGenerate: () => string
  }
  accept?: string
  pattern?: string
  buttonText?: string
}

export interface NewPersonFormConfig {
  fields: FormField[]
  submitText: string
  cancelText?: string
  onCancel?: () => void
}

interface FormBuilderProps {
  config: NewPersonFormConfig
  onSubmit: (data: Record<string, unknown>) => Promise<void>
  initialData?: Record<string, unknown>
}

export const NewPersonFormBuilder: React.FC<FormBuilderProps> = ({
  config,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    if (initialData) return initialData

    const emptyState: Record<string, unknown> = {}
    config.fields.forEach((field) => (emptyState[field.name] = ""))
    return emptyState
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localError, setLocalError] = useState("")
  
  // show inital data
  const initialDataShape = JSON.stringify(initialData)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialDataShape]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLocalError("")
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]

    if (file) {
      const previewUrl = URL.createObjectURL(file)

      setFormData((prev) => ({
        ...prev,
        [fieldName]: {
          file,
          previewUrl,
        },
      }))
    }
  }

  const handleGenerate = (fieldName: string, generator: () => string) => {
    const generated = generator()
    setFormData((prev) => ({ ...prev, [fieldName]: generated }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLocalError("")

    try {
      await onSubmit(formData)
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    const commonInputClasses =
      "w-full rounded-lg shadow-sm border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none focus:border-transparent transition-all"

    switch (field.type) {
      case "select":
        return (
          <Select
            value={formData[field.name] as string}
            required={field.required}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, [field.name]: value }))
            }
          >
            <SelectTrigger className="w-full rounded-lg border-gray-300 shadow-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "date":
        return (
          <div className="relative">
            <input
              type="date"
              id={field.name}
              name={field.name}
              required={field.required}
              value={formData[field.name] as string}
              onChange={handleChange}
              className={cn(commonInputClasses, "before:hidden after:hidden")}
            />
            <div className="absolute top-1/2 right-px -translate-y-1/2 bg-white pr-3">
              <Calendar className="pointer-events-none h-5 w-5 text-gray-400" />
            </div>
          </div>
        )

      case "file":
        const fileData = formData[field.name] as
          | { file: File; previewUrl: string }
          | undefined
        return (
          <div>
            <input
              type="file"
              id={field.name}
              name={field.name}
              required={field.required}
              accept={field.accept}
              onChange={(e) => handleFileChange(e, field.name)}
              className="hidden"
            />

            <label
              htmlFor={field.name}
              className="inline-block cursor-pointer rounded-lg border-2 border-red-600 px-6 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              {field.buttonText || "Select file"}
            </label>

            {/* File name */}
            {fileData?.file && (
              <span className="ml-3 text-sm text-gray-600">{fileData.file.name}</span>
            )}

            {/* Image Preview */}
            {fileData?.previewUrl && (
              <div className="mt-3">
                <Image
                  src={fileData.previewUrl}
                  width={150}
                  height={150}
                  alt="Preview"
                  className="h-24 w-24 rounded-md border object-cover"
                />
              </div>
            )}
          </div>
        )

      case "password-generate":
        return (
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 pr-2 shadow-sm">
            <input
              type="text"
              id={field.name}
              name={field.name}
              required={field.required}
              value={formData[field.name] as string}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={cn(commonInputClasses, "border-none shadow-none")}
              readOnly
            />
            <Button
              type="button"
              onClick={() =>
                field.generateButton &&
                handleGenerate(field.name, field.generateButton.onGenerate)
              }
              size="sm"
              className="w-auto px-6 text-sm whitespace-nowrap"
            >
              {field.generateButton?.text || "Generate"}
            </Button>
          </div>
        )

      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            required={field.required}
            value={formData[field.name] as string}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={commonInputClasses}
            pattern={field.pattern}
          />
        )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {localError && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {localError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 gap-x-8 lg:grid-cols-2">
        {config.fields.map((field) => (
          <div key={field.name} className={field.type === "file" ? "lg:col-span-2" : ""}>
            <label
              htmlFor={field.name}
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              {field.label}{" "}
              {field.required ? <span className="text-red-600">*</span> : <></>}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 pt-4 md:justify-end">
        {config.cancelText && config.onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={config.onCancel}
            className="px-12"
          >
            {config.cancelText}
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} className="px-12">
          {isSubmitting ? (
            <>
              <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving...
            </>
          ) : (
            config.submitText
          )}
        </Button>
      </div>
    </form>
  )
}

// studentForm.config.ts
const generatePassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let password = "emp"
  for (let i = 0; i < 4; i++) {
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
  //   onSubmit: async (data) => {
  //     console.log('Student form submitted:', data);
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //   },
  onCancel: () => {
    console.log("Form cancelled")
  },
}

// staffForm.config.ts
export const staffFormConfig: NewPersonFormConfig = {
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
  //   onSubmit: async (data) => {
  //     console.log('Staff form submitted:', data);
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //   },
  onCancel: () => {
    console.log("Form cancelled")
  },
}

// Usage Example:
// import { NewPersonFormBuilder } from './NewPersonFormBuilder';
// import { studentFormConfig } from './studentForm.config';
//
// <NewPersonFormBuilder config={studentFormConfig} />
//
// import { staffFormConfig } from './staffForm.config';
// <NewPersonFormBuilder config={staffFormConfig} />

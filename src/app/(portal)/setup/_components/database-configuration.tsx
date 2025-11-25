import { FormField } from "@/components/ui/form-field"
import ProgressIndicator from "./progress-indicator"
import { Button } from "@/components/ui/button"
import { Errors, FormData } from "../_types/setup"
import { useState } from "react"
import { z } from "zod"

// Zod Schemas
const databaseSchema = z.object({
  name: z.string().min(1, "Database name is required"),
  host: z.string().min(1, "Database host is required"),
  username: z.string().min(1, "Database username is required"),
  password: z.string().min(1, "Database password is required"),
})

interface DatabaseConfigFormProps {
  formData: FormData
  updateFormData: (section: keyof FormData, field: string, value: string) => void
  onSubmit: () => void
  onCancel: () => void
}

export function DatabaseConfigForm({
  formData,
  updateFormData,
  onSubmit,
  onCancel,
}: DatabaseConfigFormProps) {
  const [errors, setErrors] = useState<Errors>({})

  return (
    <form className="p-2 md:p-12" onSubmit={handleSubmit}>
      <h1 className="mb-3 text-center text-3xl font-semibold text-gray-900">
        Database Configuration
      </h1>
      <p className="mb-8 text-center text-gray-600">
        Configure your database connection settings.
      </p>

      <ProgressIndicator currentStep={1} />

      <div className="animate-onrender mb-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Database Name"
            required
            error={errors.name}
            value={formData.database.name}
            onChange={(e) => handleChange("database", "name", e.target.value)}
            placeholder="your database name"
          />

          <FormField
            label="Database Host"
            required
            error={errors.host}
            value={formData.database.host}
            onChange={(e) => handleChange("database", "host", e.target.value)}
            placeholder="localhost"
          />
        </div>

        <FormField
          label="Database Username"
          required
          error={errors.username}
          value={formData.database.username}
          onChange={(e) => handleChange("database", "username", e.target.value)}
          placeholder="your database user"
        />

        <FormField
          label="Database Password"
          required
          type="password"
          error={errors.password}
          value={formData.database.password}
          onChange={(e) => handleChange("database", "password", e.target.value)}
          placeholder="************"
        />
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-2 md:grid-cols-2 md:gap-4">
        <Button onClick={onCancel} variant="outline" className="px-4 py-3">
          Cancel
        </Button>
        <Button type="submit" className="px-4 py-3">
          Submit & Continue
        </Button>
      </div>
    </form>
  )

  function handleChange(section: keyof FormData, field: string, value: string | File) {
    updateFormData(section, field, value as string)

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = databaseSchema.safeParse(formData.database)

    if (!result.success) {
      const newErrors: Errors = {}
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message
        }
      })
      console.log("Validation errors:", newErrors)
    } else {
      setErrors({})
      onSubmit()
    }
  }
}

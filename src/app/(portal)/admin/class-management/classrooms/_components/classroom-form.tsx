"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface ClassroomFormData {
  name: string
  capacity: string
  type: string
  location: string
  description: string
}

interface ClassroomFormProps {
  initialData?: ClassroomFormData
  onSubmit: (data: ClassroomFormData) => Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
  submitText?: string
}

const roomTypes = ["PHYSICAL", "VIRTUAL"]

export function ClassroomForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitText = "Save",
}: ClassroomFormProps) {
  const [formData, setFormData] = useState<ClassroomFormData>(
    initialData || {
      name: "",
      capacity: "",
      type: "",
      location: "",
      description: "",
    }
  )
  const [errors, setErrors] = useState<Partial<ClassroomFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ClassroomFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Classroom name is required"
    }

    if (!formData.capacity.trim()) {
      newErrors.capacity = "Capacity is required"
    } else if (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0) {
      newErrors.capacity = "Capacity must be a positive number"
    }

    if (!formData.type) {
      newErrors.type = "Room type is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Failed to create teacher:", error)
      throw error
    }
  }

  const handleChange = (field: keyof ClassroomFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Name Field - Full Width */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-gray-900"
          >
            Classroom Name <span className="text-red-600">*</span>
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter classroom name"
            className="w-full"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Capacity Field */}
          <div>
            <label
              htmlFor="capacity"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Capacity <span className="text-red-600">*</span>
            </label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => handleChange("capacity", e.target.value)}
              placeholder="Enter capacity"
              min="1"
            />
            {errors.capacity && (
              <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
            )}
          </div>

          {/* Type Field */}
          <div>
            <label
              htmlFor="type"
              className="mb-2 block text-sm font-semibold text-gray-900"
            >
              Room Type <span className="text-red-600">*</span>
            </label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
          </div>
        </div>

        {/* Location Field */}
        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-semibold text-gray-900"
          >
            Location <span className="text-red-600">*</span>
          </label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Enter location (e.g., Floor 2, Building A)"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-gray-900"
          >
            Description <span className="text-red-600">*</span>
          </label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter classroom description and features"
            rows={4}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-8"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="px-8">
          {isSubmitting ? (
            <>
              <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving...
            </>
          ) : (
            submitText
          )}
        </Button>
      </div>
    </form>
  )
}

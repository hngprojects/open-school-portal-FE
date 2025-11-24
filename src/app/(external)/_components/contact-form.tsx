"use client"

import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { z } from "zod"
import { Input } from "@/components/ui/input"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s-]{10,15}$/, "Please enter a valid phone number"),
  message: z.string().min(1, "Message cannot be empty"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = contactSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {}

      // Use result.error.issues instead of result.error.errors
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof ContactFormData
        fieldErrors[fieldName] = err.message
      })

      setErrors(fieldErrors)
      return
    }

    // No errors
    setErrors({})
    alert(`Thank you, ${formData.name}! Your message has been sent.`)

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block font-medium">
          Name
        </label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block font-medium">
          Phone
        </label>
        <Input
          id="phone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full"
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-xl border px-3 py-2"
          rows={4}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  )
}

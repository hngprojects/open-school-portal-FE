"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Zod Schema
const sessionFormSchema = z
  .object({
    academicSession: z
      .string()
      .min(1, "Academic session is required")
      .regex(/^\d{4}\/\d{4}$/, "Format must be YYYY/YYYY (e.g., 2025/2026)"),
    firstTermStart: z.string().min(1, "First term start date is required"),
    firstTermEnd: z.string().min(1, "First term end date is required"),
    secondTermStart: z.string().min(1, "Second term start date is required"),
    secondTermEnd: z.string().min(1, "Second term end date is required"),
    thirdTermStart: z.string().min(1, "Third term start date is required"),
    thirdTermEnd: z.string().min(1, "Third term end date is required"),
    description: z.string().optional(),
  })
  .refine((data) => new Date(data.firstTermStart) < new Date(data.firstTermEnd), {
    message: "First term end date must be after start date",
    path: ["firstTermEnd"],
  })
  .refine((data) => new Date(data.secondTermStart) < new Date(data.secondTermEnd), {
    message: "Second term end date must be after start date",
    path: ["secondTermEnd"],
  })
  .refine((data) => new Date(data.thirdTermStart) < new Date(data.thirdTermEnd), {
    message: "Third term end date must be after start date",
    path: ["thirdTermEnd"],
  })
  .refine((data) => new Date(data.firstTermEnd) < new Date(data.secondTermStart), {
    message: "Second term must start after first term ends",
    path: ["secondTermStart"],
  })
  .refine((data) => new Date(data.secondTermEnd) < new Date(data.thirdTermStart), {
    message: "Third term must start after second term ends",
    path: ["thirdTermStart"],
  })

export type SessionFormData = z.infer<typeof sessionFormSchema>

interface CreateSessionFormProps {
  onSubmit?: (data: SessionFormData) => void | Promise<void>
  isLoading?: boolean
  defaultValues?: Partial<SessionFormData>
}

const CreateSessionForm = ({
  onSubmit,
  isLoading,
  defaultValues,
}: CreateSessionFormProps) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      academicSession: defaultValues?.academicSession || "",
      firstTermStart: defaultValues?.firstTermStart || "",
      firstTermEnd: defaultValues?.firstTermEnd || "",
      secondTermStart: defaultValues?.secondTermStart || "",
      secondTermEnd: defaultValues?.secondTermEnd || "",
      thirdTermStart: defaultValues?.thirdTermStart || "",
      thirdTermEnd: defaultValues?.thirdTermEnd || "",
      description: defaultValues?.description || "",
    },
  })

  const handleFormSubmit = async (data: SessionFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        // Default behavior if no onSubmit prop is provided
        console.log("Form data:", data)
        // You can add your API call here
        // await createSession(data)

        // On success, navigate back
        router.push("/admin/class-management/session")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      // Handle error (you can add toast notification here)
    }
  }

  const handleCancel = () => {
    reset()
    router.push("/admin/class-management/session")
  }

  return (
    <section className="bg-[#FAFAFA] px-2 pt-4 pb-10 lg:px-4">
      <DashboardTitle heading="Create Session" description="Create academic session" />

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <section className="my-8 space-y-7">
          {/* academic year */}
          <div>
            <Label htmlFor="academicSession">
              Academic Session <span className="text-red-500">*</span>
            </Label>
            <Input
              id="academicSession"
              {...register("academicSession")}
              placeholder="e.g 2025/2026"
              className={errors.academicSession ? "border-red-500" : ""}
            />
            {errors.academicSession && (
              <p className="mt-1 text-sm text-red-500">
                {errors.academicSession.message}
              </p>
            )}
          </div>

          {/* first term start and term end */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* first term start */}
            <div>
              <Label htmlFor="firstTermStart">
                First Term Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstTermStart"
                {...register("firstTermStart")}
                placeholder="Select a date"
                type="date"
                className={errors.firstTermStart ? "border-red-500" : ""}
              />
              {errors.firstTermStart && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstTermStart.message}
                </p>
              )}
            </div>

            {/* first term end */}
            <div>
              <Label htmlFor="firstTermEnd">
                First Term End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstTermEnd"
                {...register("firstTermEnd")}
                placeholder="Select a date"
                type="date"
                className={errors.firstTermEnd ? "border-red-500" : ""}
              />
              {errors.firstTermEnd && (
                <p className="mt-1 text-sm text-red-500">{errors.firstTermEnd.message}</p>
              )}
            </div>
          </div>

          {/* second term start and term end */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* second term start */}
            <div>
              <Label htmlFor="secondTermStart">
                Second Term Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="secondTermStart"
                {...register("secondTermStart")}
                placeholder="Select a date"
                type="date"
                className={errors.secondTermStart ? "border-red-500" : ""}
              />
              {errors.secondTermStart && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.secondTermStart.message}
                </p>
              )}
            </div>

            {/* second term end */}
            <div>
              <Label htmlFor="secondTermEnd">
                Second Term End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="secondTermEnd"
                {...register("secondTermEnd")}
                placeholder="Select a date"
                type="date"
                className={errors.secondTermEnd ? "border-red-500" : ""}
              />
              {errors.secondTermEnd && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.secondTermEnd.message}
                </p>
              )}
            </div>
          </div>

          {/* third term start and term end */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* third term start */}
            <div>
              <Label htmlFor="thirdTermStart">
                Third Term Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="thirdTermStart"
                {...register("thirdTermStart")}
                placeholder="Select a date"
                type="date"
                className={errors.thirdTermStart ? "border-red-500" : ""}
              />
              {errors.thirdTermStart && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.thirdTermStart.message}
                </p>
              )}
            </div>

            {/* third term end */}
            <div>
              <Label htmlFor="thirdTermEnd">
                Third Term End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="thirdTermEnd"
                {...register("thirdTermEnd")}
                placeholder="Select a date"
                type="date"
                className={errors.thirdTermEnd ? "border-red-500" : ""}
              />
              {errors.thirdTermEnd && (
                <p className="mt-1 text-sm text-red-500">{errors.thirdTermEnd.message}</p>
              )}
            </div>
          </div>

          {/* description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="e.g Details about this academic year"
              className="min-h-[124px]"
            />
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting || isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </section>
  )
}

export default CreateSessionForm

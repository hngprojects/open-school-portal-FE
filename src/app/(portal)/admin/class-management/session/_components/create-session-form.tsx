"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleAlert } from "lucide-react"

import DashboardTitle from "@/components/dashboard/dashboard-title"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import DateField from "./date-field"

import { sessionFormSchema, SessionFormData } from "../_schemas/session-form-schema"
import { parseDate } from "../_utils/date"
import { useCreateAcademicSession } from "../_hooks/use-session"

const CreateSessionForm = () => {
  const router = useRouter()
  const { mutate, isPending } = useCreateAcademicSession()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      firstTermStartDate: "",
      firstTermEndDate: "",
      secondTermStartDate: "",
      secondTermEndDate: "",
      thirdTermStartDate: "",
      thirdTermEndDate: "",
      description: "",
      acknowledge: false,
    },
    mode: "onChange",
  })

  const [start, end] = watch(["firstTermStartDate", "thirdTermEndDate"])

  const academicSession =
    start && end
      ? `${parseDate(start).getFullYear()} / ${parseDate(end).getFullYear()}`
      : "_ _ _ _ / _ _ _ _"

  const onSubmit = (data: SessionFormData) => {
    mutate(
      {
        name: academicSession,
        startDate: data.firstTermStartDate,
        endDate: data.thirdTermEndDate,
      },
      {
        onSuccess: () => {
          toast.success("Academic session created successfully!")
          router.push("/admin/class-management/session")
        },
        onError: (error) => {
          toast.error(
            error instanceof Error ? error.message : "Failed to create session."
          )
        },
      }
    )
  }

  return (
    <div className="animate-onrender min-h-[calc(100vh-70px)] p-4 pb-10 lg:p-10">
      <DashboardTitle heading="Create Session" description="Create academic session" />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-8">
        <div>
          <label className="text-sm font-medium">Academic Year</label>
          <div className="mt-1 flex h-10 items-center rounded-md border bg-[#EEEEEE] px-3 text-[#666]">
            {academicSession}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <DateField
            name="firstTermStartDate"
            label="First Term Start Date"
            register={register}
            error={errors.firstTermStartDate}
          />
          <DateField
            name="firstTermEndDate"
            label="First Term End Date"
            register={register}
            error={errors.firstTermEndDate}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <DateField
            name="secondTermStartDate"
            label="Second Term Start Date"
            register={register}
            error={errors.secondTermStartDate}
          />
          <DateField
            name="secondTermEndDate"
            label="Second Term End Date"
            register={register}
            error={errors.secondTermEndDate}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <DateField
            name="thirdTermStartDate"
            label="Third Term Start Date"
            register={register}
            error={errors.thirdTermStartDate}
          />
          <DateField
            name="thirdTermEndDate"
            label="Third Term End Date"
            register={register}
            error={errors.thirdTermEndDate}
          />
        </div>

        <div>
          <label>Description</label>
          <Textarea {...register("description")} className="min-h-[120px]" />
        </div>

        <div className="flex gap-3 rounded-md border border-amber-300 bg-amber-50 p-4">
          <CircleAlert className="h-5 w-5 text-amber-600" />
          <p className="text-sm text-amber-900">
            <strong>Warning: </strong> Activating a new session will archive the current
            one.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Input
              type="checkbox"
              {...register("acknowledge")}
              className="h-4 w-4 accent-green-600"
            />
            <label className="cursor-pointer">
              I acknowledge the effect of activating a new academic session.
            </label>
          </div>

          {errors.acknowledge && (
            <p className="flex items-center gap-1 text-sm text-red-600">
              <CircleAlert className="h-4 w-4" />
              {errors.acknowledge.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              router.push("/admin/class-management/session")
              reset()
            }}
            disabled={isSubmitting || isPending}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={!watch("acknowledge") || isSubmitting || isPending}
          >
            {isSubmitting || isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateSessionForm

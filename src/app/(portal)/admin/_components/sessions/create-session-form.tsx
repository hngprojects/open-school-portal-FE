"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CircleAlert } from "lucide-react"

import DashboardTitle from "@/components/dashboard/dashboard-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateAcademicSession } from "../../class-management/_hooks/use-session"
import { Textarea } from "@/components/ui/textarea"

// ===============================
// UTILITY FUNCTIONS
// ===============================

const parseDate = (dateStr: string): Date => {
  return new Date(`${dateStr}T00:00:00`)
}

const isValidFutureDate = (dateStr: string): boolean => {
  if (!dateStr) return false
  const date = parseDate(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return !isNaN(date.getTime()) && date >= today
}

const isDateAfter = (laterDate: string, earlierDate: string): boolean => {
  if (!laterDate || !earlierDate) return false
  return parseDate(laterDate) > parseDate(earlierDate)
}

// ===============================
// ZOD SCHEMA
// ===============================

const sessionFormSchema = z
  .object({
    firstTermStartDate: z.string().min(1, "First term start date is required"),
    firstTermEndDate: z.string().min(1, "First term end date is required"),
    secondTermStartDate: z.string().min(1, "Second term start date is required"),
    secondTermEndDate: z.string().min(1, "Second term end date is required"),
    thirdTermStartDate: z.string().min(1, "Third term start date is required"),
    thirdTermEndDate: z.string().min(1, "Third term end date is required"),
    description: z.string().optional(),
    acknowledge: z.boolean().refine((v) => v === true, {
      message: "You must acknowledge to continue",
    }),
  })
  .superRefine((data, ctx) => {
    const fields = [
      { key: "firstTermStartDate" as const, label: "First term start date" },
      { key: "firstTermEndDate" as const, label: "First term end date" },
      { key: "secondTermStartDate" as const, label: "Second term start date" },
      { key: "secondTermEndDate" as const, label: "Second term end date" },
      { key: "thirdTermStartDate" as const, label: "Third term start date" },
      { key: "thirdTermEndDate" as const, label: "Third term end date" },
    ]

    // Validate all dates are future or today
    fields.forEach(({ key, label }) => {
      if (!isValidFutureDate(data[key])) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: `${label} must be today or in the future`,
        })
      }
    })

    // First term validation
    if (!isDateAfter(data.firstTermEndDate, data.firstTermStartDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["firstTermEndDate"],
        message: "First term end date must be after the start date",
      })
    }

    // Second term validation
    if (!isDateAfter(data.secondTermStartDate, data.firstTermEndDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["secondTermStartDate"],
        message: "Second term cannot start before first term ends",
      })
    }

    if (!isDateAfter(data.secondTermEndDate, data.secondTermStartDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["secondTermEndDate"],
        message: "Second term end date must be after the start date",
      })
    }

    // Third term validation
    if (!isDateAfter(data.thirdTermStartDate, data.secondTermEndDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["thirdTermStartDate"],
        message: "Third term cannot start before second term ends",
      })
    }

    if (!isDateAfter(data.thirdTermEndDate, data.thirdTermStartDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["thirdTermEndDate"],
        message: "Third term end date must be after the start date",
      })
    }
  })

type SessionFormData = z.infer<typeof sessionFormSchema>

// ===============================
// COMPONENT
// ===============================

const CreateSessionForm = () => {
  const router = useRouter()
  const { mutate, isPending } = useCreateAcademicSession()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    trigger,
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

  const [firstTermStart, thirdTermEnd] = watch(["firstTermStartDate", "thirdTermEndDate"])

  const academicSession =
    firstTermStart && thirdTermEnd
      ? `${parseDate(firstTermStart).getFullYear()} / ${parseDate(thirdTermEnd).getFullYear()}`
      : "_ _ _ _ / _ _ _ _"

  const handleDateChange =
    (field: keyof SessionFormData) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      const revalidationMap: Record<string, (keyof SessionFormData)[]> = {
        firstTermStartDate: ["firstTermEndDate", "secondTermStartDate"],
        firstTermEndDate: ["firstTermStartDate", "secondTermStartDate"],
        secondTermStartDate: ["secondTermEndDate", "thirdTermStartDate"],
        secondTermEndDate: ["secondTermStartDate", "thirdTermStartDate"],
        thirdTermStartDate: ["secondTermEndDate", "thirdTermEndDate"],
        thirdTermEndDate: ["thirdTermStartDate"],
      }

      if (value && revalidationMap[field]) {
        setTimeout(() => {
          const formValues = getValues()
          revalidationMap[field].forEach((relatedField) => {
            if (formValues[relatedField]) trigger(relatedField)
          })
        }, 0)
      }
    }

  const onSubmit = (data: SessionFormData) => {
    const { acknowledge, description, ...rest } = data

    mutate(
      {
        name: academicSession,
        startDate: rest.firstTermStartDate,
        endDate: rest.thirdTermEndDate,
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

  const handleCancel = () => {
    reset()
    router.push("/admin/class-management/session")
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(onSubmit)(e)
  }

  const DateField = ({
    name,
    label,
    error,
  }: {
    name: keyof SessionFormData
    label: string
    error?: { message?: string }
  }) => (
    <div className="space-y-1">
      <Label htmlFor={name}>
        {label} <span className="text-red-500">*</span>
      </Label>
      <Input
        id={name}
        type="date"
        {...register(name, {
          onChange: handleDateChange(name),
        })}
        className={`w-full ${error ? "border-red-500" : ""}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        placeholder="Select a date"
      />
      {error && (
        <p
          id={`${name}-error`}
          className="flex items-center gap-1 text-sm text-red-600"
          role="alert"
        >
          <CircleAlert className="h-4 w-4" />
          {error.message}
        </p>
      )}
    </div>
  )

  return (
    <div className="animate-onrender min-h-[calc(100vh-70px)] p-4 px-2 pt-4 pb-10 lg:p-10">
      <DashboardTitle heading="Create Session" description="Create academic session" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="my-4 space-y-7">
          <div>
            <Label htmlFor="academicSession">Academic Year</Label>
            <div className="flex h-10 items-end-safe rounded-md border border-[#6666664D] bg-[#EEEEEE] px-3 py-2.5 text-[#666666]">
              {academicSession}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <DateField
              name="firstTermStartDate"
              label="First Term Start Date"
              error={errors.firstTermStartDate}
            />
            <DateField
              name="firstTermEndDate"
              label="First Term End Date"
              error={errors.firstTermEndDate}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <DateField
              name="secondTermStartDate"
              label="Second Term Start Date"
              error={errors.secondTermStartDate}
            />
            <DateField
              name="secondTermEndDate"
              label="Second Term End Date"
              error={errors.secondTermEndDate}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <DateField
              name="thirdTermStartDate"
              label="Third Term Start Date"
              error={errors.thirdTermStartDate}
            />
            <DateField
              name="thirdTermEndDate"
              label="Third Term End Date"
              error={errors.thirdTermEndDate}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="e.g Details about this academic year"
              className="min-h-[124px]"
              {...register("description")}
            />
          </div>
        </section>

        <div className="my-5 flex gap-3 rounded-md border border-amber-300 bg-amber-50 p-4">
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div className="text-sm text-amber-900">
            <strong>Warning:</strong> Activating a new session will archive the current
            one. Archived sessions cannot be edited.
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Input
              type="checkbox"
              id="acknowledge"
              {...register("acknowledge")}
              className="mb-2 h-4 w-4 accent-green-600"
              aria-invalid={errors.acknowledge ? "true" : "false"}
              aria-describedby={errors.acknowledge ? "acknowledge-error" : undefined}
            />
            <Label htmlFor="acknowledge" className="cursor-pointer">
              I acknowledge the effect of activating a new academic session.
            </Label>
          </div>

          {errors.acknowledge && (
            <p
              id="acknowledge-error"
              className="flex items-center gap-1 text-sm text-red-600"
            >
              <CircleAlert className="h-4 w-4" />
              {errors.acknowledge.message}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting || isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleFormSubmit}
            disabled={isSubmitting || isPending || !watch("acknowledge")}
            className="disabled:cursor-not-allowed"
          >
            {isSubmitting || isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateSessionForm

// "use client"

// import { useRouter } from "next/navigation"
// import { toast } from "sonner"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { CircleAlert } from "lucide-react"

// import DashboardTitle from "@/components/dashboard/dashboard-title"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useCreateAcademicSession } from "../../class-management/_hooks/use-session"
// import { Textarea } from "@/components/ui/textarea"

// // ===============================
// // IMPROVED UTILITY FUNCTIONS
// // ===============================

// const parseDate = (dateStr: string): Date => {
//   return new Date(`${dateStr}T00:00:00`)
// }

// const isValidFutureDate = (dateStr: string): boolean => {
//   if (!dateStr) return false
//   const date = parseDate(dateStr)
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)
//   return !isNaN(date.getTime()) && date >= today
// }

// const isDateAfter = (laterDate: string, earlierDate: string): boolean => {
//   if (!laterDate || !earlierDate) return false
//   return parseDate(laterDate) > parseDate(earlierDate)
// }

// // ===============================
// // IMPROVED ZOD SCHEMA
// // ===============================

// const sessionFormSchema = z
//   .object({
//     firstTermStartDate: z.string().min(1, "First term start date is required"),
//     firstTermEndDate: z.string().min(1, "First term end date is required"),
//     secondTermStartDate: z.string().min(1, "Second term start date is required"),
//     secondTermEndDate: z.string().min(1, "Second term end date is required"),
//     thirdTermStartDate: z.string().min(1, "Third term start date is required"),
//     thirdTermEndDate: z.string().min(1, "Third term end date is required"),
//     acknowledge: z.boolean().refine((v) => v === true, {
//       message: "You must acknowledge to continue",
//     }),
//   })
//   // Future date validations
//   .superRefine((data, ctx) => {
//     const fields = [
//       { key: "firstTermStartDate" as const, label: "First term start date" },
//       { key: "firstTermEndDate" as const, label: "First term end date" },
//       { key: "secondTermStartDate" as const, label: "Second term start date" },
//       { key: "secondTermEndDate" as const, label: "Second term end date" },
//       { key: "thirdTermStartDate" as const, label: "Third term start date" },
//       { key: "thirdTermEndDate" as const, label: "Third term end date" },
//     ]

//     // Validate all dates are today or in the future
//     fields.forEach(({ key, label }) => {
//       if (!isValidFutureDate(data[key])) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: [key],
//           message: `${label} must be today or in the future`,
//         })
//       }
//     })

//     // FIRST TERM VALIDATIONS
//     if (data.firstTermStartDate && data.firstTermEndDate) {
//       if (!isDateAfter(data.firstTermEndDate, data.firstTermStartDate)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["firstTermEndDate"],
//           message: "First term end date must be after the start date",
//         })
//       }
//     }

//     // SECOND TERM VALIDATIONS
//     // Second term start must be after first term end
//     if (data.secondTermStartDate && data.firstTermEndDate) {
//       if (!isDateAfter(data.secondTermStartDate, data.firstTermEndDate)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["secondTermStartDate"],
//           message: "Second term cannot start before first term ends",
//         })
//       }
//     }

//     // Second term start must also be after first term start (redundant check but explicit)
//     if (data.secondTermStartDate && data.firstTermStartDate) {
//       if (!isDateAfter(data.secondTermStartDate, data.firstTermStartDate)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["secondTermStartDate"],
//           message: "Second term cannot start before first term starts",
//         })
//       }
//     }

//     // Second term end must be after second term start
//     if (data.secondTermStartDate && data.secondTermEndDate) {
//       if (!isDateAfter(data.secondTermEndDate, data.secondTermStartDate)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["secondTermEndDate"],
//           message: "Second term end date must be after the start date",
//         })
//       }
//     }

//     // THIRD TERM VALIDATIONS
//     // Third term start must be after second term end
//     if (data.thirdTermStartDate && data.secondTermEndDate) {
//       if (!isDateAfter(data.thirdTermStartDate, data.secondTermEndDate)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["thirdTermStartDate"],
//           message: "Third term cannot start before second term ends",
//         })
//       }
//     }

//     // Third term start must also be after second term start
//     if (data.thirdTermStartDate && data.secondTermStartDate) {
//       if (!isDateAfter(data.thirdTermStartDate, data.secondTermStartDate)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["thirdTermStartDate"],
//           message: "Third term cannot start before second term starts",
//         })
//       }
//     }

//     // Third term start must be after first term end
//     if (data.thirdTermStartDate && data.firstTermEndDate) {
//       if (!isDateAfter(data.thirdTermStartDate, data.firstTermEndDate)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["thirdTermStartDate"],
//           message: "Third term cannot start before first term ends",
//         })
//       }
//     }

//     // Third term end must be after third term start
//     if (data.thirdTermStartDate && data.thirdTermEndDate) {
//       if (!isDateAfter(data.thirdTermEndDate, data.thirdTermStartDate)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["thirdTermEndDate"],
//           message: "Third term end date must be after the start date",
//         })
//       }
//     }
//   })

// type SessionFormData = z.infer<typeof sessionFormSchema>

// // ===============================
// // IMPROVED FORM COMPONENT
// // ===============================

// const CreateSessionForm = () => {
//   const router = useRouter()
//   // Mock mutation hoo
//   // const mutate = (data: any, callbacks: any) => {
//   //   setTimeout(() => callbacks.onSuccess(), 1000)
//   // }
//   const { mutate, isPending } = useCreateAcademicSession()

//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     getValues,
//     trigger,
//   } = useForm<SessionFormData>({
//     resolver: zodResolver(sessionFormSchema),
//     defaultValues: {
//       firstTermStartDate: "",
//       firstTermEndDate: "",
//       secondTermStartDate: "",
//       secondTermEndDate: "",
//       thirdTermStartDate: "",
//       thirdTermEndDate: "",
//       acknowledge: false,
//     },
//     mode: "onChange", // Validate on change for immediate feedback
//   })

//   const watchedFields = watch(["firstTermStartDate", "thirdTermEndDate"])
//   const [firstTermStart, thirdTermEnd] = watchedFields

//   // Trigger validation when related dates change
//   const handleDateChange =
//     (field: keyof SessionFormData) => async (e: React.ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.value

//       // Define which fields should trigger revalidation of other fields
//       const revalidationMap: Record<string, (keyof SessionFormData)[]> = {
//         firstTermStartDate: [
//           "firstTermEndDate",
//           "secondTermStartDate",
//           "thirdTermStartDate",
//         ],
//         firstTermEndDate: [
//           "firstTermStartDate",
//           "secondTermStartDate",
//           "thirdTermStartDate",
//         ],
//         secondTermStartDate: [
//           "firstTermEndDate",
//           "secondTermEndDate",
//           "thirdTermStartDate",
//         ],
//         secondTermEndDate: ["secondTermStartDate", "thirdTermStartDate"],
//         thirdTermStartDate: ["secondTermEndDate", "thirdTermEndDate"],
//         thirdTermEndDate: ["thirdTermStartDate"],
//       }

//       // Trigger validation for related fields
//       if (value && revalidationMap[field]) {
//         setTimeout(() => {
//           const formValues = getValues()
//           revalidationMap[field].forEach((relatedField) => {
//             if (formValues[relatedField]) {
//               trigger(relatedField)
//             }
//           })
//         }, 0)
//       }
//     }

//   // Generate academic session label
//   const academicSession =
//     firstTermStart && thirdTermEnd
//       ? `${parseDate(firstTermStart).getFullYear()} / ${parseDate(thirdTermEnd).getFullYear()}`
//       : "_ _ _ _ / _ _ _ _"

//   const onSubmit = (data: SessionFormData) => {
//     mutate(
//       {
//         name: academicSession,
//         startDate: data.firstTermStartDate,
//         endDate: data.thirdTermEndDate,
//       },
//       {
//         onSuccess: () => {
//           toast.success("Academic session created successfully!")
//           router.push("/admin/class-management/session")
//         },
//         onError: (error: Error | unknown) => {
//           toast.error(
//             error instanceof Error ? error.message : "Failed to create session."
//           )
//         },
//       }
//     )
//   }

//   const handleCancel = () => {
//     reset()
//     router.push("/admin/class-management/session")
//   }

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     handleSubmit(onSubmit)(e)
//   }

//   // Reusable date field component
//   const DateField = ({
//     name,
//     label,
//     error,
//   }: {
//     name: keyof SessionFormData
//     label: string
//     error?: { message?: string }
//   }) => (
//     <div className="space-y-1">
//       <Label htmlFor={name}>
//         {label} <span className="text-red-500">*</span>
//       </Label>
//       <Input
//         id={name}
//         type="date"
//         {...register(name, {
//           onChange: handleDateChange(name),
//         })}
//         className={`w-full ${error ? "border-red-500" : ""}`}
//         aria-invalid={error ? "true" : "false"}
//         aria-describedby={error ? `${name}-error` : undefined}
//         placeholder="Select a date"
//       />
//       {error && (
//         <p
//           id={`${name}-error`}
//           className="flex items-center gap-1 text-sm text-red-600"
//           role="alert"
//         >
//           <CircleAlert className="h-4 w-4" />
//           {error.message}
//         </p>
//       )}
//     </div>
//   )

//   return (
//     <div className="animate-onrender min-h-[calc(100vh-70px)] p-4 px-2 pt-4 pb-10 lg:p-10">
//       <DashboardTitle heading="Create Session" description="Create academic session" />

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <section className="my-4 space-y-7">
//           {/* Academic Year Display */}
//           <div>
//             <Label htmlFor="academicSession">Academic Year</Label>
//             <div className="flex h-10 items-end-safe rounded-md border border-[#6666664D] bg-[#EEEEEE] px-3 py-2.5 text-[#666666]">
//               {academicSession}
//             </div>
//           </div>

//           {/* First Term */}
//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
//             <DateField
//               name="firstTermStartDate"
//               label="First Term Start Date"
//               error={errors.firstTermStartDate}
//             />
//             <DateField
//               name="firstTermEndDate"
//               label="First Term End Date"
//               error={errors.firstTermEndDate}
//             />
//           </div>

//           {/* Second Term */}
//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
//             <DateField
//               name="secondTermStartDate"
//               label="Second Term Start Date"
//               error={errors.secondTermStartDate}
//             />
//             <DateField
//               name="secondTermEndDate"
//               label="Second Term End Date"
//               error={errors.secondTermEndDate}
//             />
//           </div>

//           {/* Third Term */}
//           <div className="grid gap-4 md:grid-cols-2">
//             <DateField
//               name="thirdTermStartDate"
//               label="Third Term Start Date"
//               error={errors.thirdTermStartDate}
//             />
//             <DateField
//               name="thirdTermEndDate"
//               label="Third Term End Date"
//               error={errors.thirdTermEndDate}
//             />
//           </div>

//           <div>
//             <Label>Description</Label>
//             <Textarea
//               placeholder="e.g Details about this academic year"
//               className="min-h-[124px]"
//             />
//           </div>
//         </section>

//         {/* Warning Alert */}
//         <div className="my-5 flex gap-3 rounded-md border border-amber-300 bg-amber-50 p-4">
//           <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
//           <div className="text-sm text-amber-900">
//             <strong>Warning:</strong> Activating a new session will archive the current
//             one. Archived sessions cannot be edited.
//           </div>
//         </div>

//         {/* Acknowledgment Checkbox */}
//         <div className="space-y-2">
//           <div className="flex items-center gap-3">
//             <Input
//               type="checkbox"
//               id="acknowledge"
//               {...register("acknowledge")}
//               className="mb-2 h-4 w-4 accent-green-600"
//               aria-invalid={errors.acknowledge ? "true" : "false"}
//               aria-describedby={errors.acknowledge ? "acknowledge-error" : undefined}
//             />
//             <Label htmlFor="acknowledge" className="cursor-pointer">
//               I acknowledge the effect of activating a new academic session.
//             </Label>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-6 flex justify-end gap-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={handleCancel}
//             disabled={isSubmitting || isPending}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="button"
//             onClick={handleFormSubmit}
//             disabled={isSubmitting || isPending || !watch("acknowledge")}
//             className="disabled:cursor-not-allowed"
//           >
//             {isSubmitting || isPending ? "Saving..." : "Save"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default CreateSessionForm

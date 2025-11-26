"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import DashboardTitle from "@/components/dashboard/dashboard-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useCreateAcademicSession } from "../../class-management/_hooks/use-session"

const sessionFormSchema = z.object({
  academicSession: z
    .string()
    .min(1, "Academic session is required")
    .regex(/^\d{4}\/\d{4}$/, "Format must be YYYY/YYYY (e.g., 2025/2026)"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
})

export type SessionFormData = z.infer<typeof sessionFormSchema>

interface CreateSessionFormProps {
  defaultValues?: Partial<SessionFormData>
}

const CreateSessionForm = ({ defaultValues }: CreateSessionFormProps) => {
  const router = useRouter()
  const { mutate, isPending } = useCreateAcademicSession()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      academicSession: defaultValues?.academicSession || "",
      startDate: defaultValues?.startDate || "",
      endDate: defaultValues?.endDate || "",
    },
  })

  const handleCreateSession = (data: SessionFormData) => {
    mutate(
      {
        name: data.academicSession,
        startDate: data.startDate,
        endDate: data.endDate,
      },
      {
        onSuccess: () => {
          // onSuccess: (response) => {
          toast.success("Academic session created successfully!")
          router.push("/admin/class-management/session")
          // console.log("Created session:", response)
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create academic session.")
        },
      }
    )
  }

  const handleCancel = () => {
    reset()
    router.push("/admin/class-management/session")
  }

  return (
    <section className="min-h-[calc(100vh-70px)] bg-[#FAFAFA] px-2 pt-4 pb-10 lg:px-4">
      <DashboardTitle heading="Create Session" description="Create academic session" />

      <form onSubmit={handleSubmit(handleCreateSession)}>
        <section className="my-8 space-y-7">
          {/* Academic Year */}
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

          {/* Start + End Date */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <Label htmlFor="startDate">
                Session Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
                className={errors.startDate ? "border-red-500" : ""}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="endDate">
                Session End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
                className={errors.endDate ? "border-red-500" : ""}
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting || isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || isPending}>
            {isSubmitting || isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </section>
  )
}

export default CreateSessionForm

// "use client"

// import React from "react"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"

// import DashboardTitle from "@/components/dashboard/dashboard-title"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// import { useCreateAcademicSession } from "../../class-management/_hooks/use-session"
// // -------------------------
// // Zod validation schema
// // -------------------------
// const sessionFormSchema = z.object({
//   academicSession: z
//     .string()
//     .min(1, "Academic session is required")
//     .regex(/^\d{4}\/\d{4}$/, "Format must be YYYY/YYYY (e.g., 2025/2026)"),
//   startDate: z.string().min(1, "Start date is required"),
//   endDate: z.string().min(1, "End date is required"),
// })

// export type SessionFormData = z.infer<typeof sessionFormSchema>

// interface CreateSessionFormProps {
//   onSubmit?: (data: SessionFormData) => void | Promise<void>
//   isLoading?: boolean
//   defaultValues?: Partial<SessionFormData>
// }

// // -------------------------
// // Component
// // -------------------------
// const CreateSessionForm = ({
//   // onSubmit,
//   // isLoading = false,
//   defaultValues,
// }: CreateSessionFormProps) => {
//   const router = useRouter()

//   const { mutate, isPending } = useCreateAcademicSession()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<SessionFormData>({
//     resolver: zodResolver(sessionFormSchema),
//     defaultValues: {
//       academicSession: defaultValues?.academicSession || "",
//       startDate: defaultValues?.startDate || "",
//       endDate: defaultValues?.endDate || "",
//     },
//   })

//   const handleFormSubmit = async (data: SessionFormData) => {
//     if (onSubmit) {
//       await onSubmit(data)
//       return
//     }

//     // If no onSubmit is passed (fallback)
//     router.push("/admin/class-management/session")
//   }

//   const handleCancel = () => {
//     reset()
//     router.push("/admin/class-management/session")
//   }

//   const handleCreateSession = (data: SessionFormData) => {
//     mutate(
//       {
//         name: data.academicSession,
//         startDate: data.startDate,
//         endDate: data.endDate,
//       },
//       {
//         onSuccess: (data: any) => {
//           toast.success("Academic session created successfully!")
//           router.push("/admin/class-management/session")
//           console.log("session", data)
//         },
//         onError: (error: Error) => {
//           toast.error(error.message || "Failed to create academic session.")
//         },
//       }
//     )
//   }

//   return (
//     <section className="min-h-[calc(100vh-70px)] bg-[#FAFAFA] px-2 pt-4 pb-10 lg:px-4">
//       <DashboardTitle heading="Create Session" description="Create academic session" />

//       <form onSubmit={handleSubmit(handleFormSubmit)}>
//         <section className="my-8 space-y-7">
//           {/* Academic Year */}
//           <div>
//             <Label htmlFor="academicSession">
//               Academic Session <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="academicSession"
//               {...register("academicSession")}
//               placeholder="e.g 2025/2026"
//               className={errors.academicSession ? "border-red-500" : ""}
//             />
//             {errors.academicSession && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.academicSession.message}
//               </p>
//             )}
//           </div>

//           {/* Start + End Date */}
//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
//             <div>
//               <Label>
//                 Session Start Date <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 type="date"
//                 {...register("startDate")}
//                 className={errors.startDate ? "border-red-500" : ""}
//               />
//               {errors.startDate && (
//                 <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>
//               )}
//             </div>

//             <div>
//               <Label>
//                 Session End Date <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 type="date"
//                 {...register("endDate")}
//                 className={errors.endDate ? "border-red-500" : ""}
//               />
//               {errors.endDate && (
//                 <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={handleCancel}
//             disabled={isSubmitting || isLoading}
//           >
//             Cancel
//           </Button>

//           <Button type="submit" disabled={isSubmitting || isPending}>
//             {isSubmitting || isPending ? "Saving..." : "Save"}
//           </Button>
//         </div>
//       </form>
//     </section>
//   )
// }

// export default CreateSessionForm

// // "use client"

// // import React from "react"
// // import { useRouter } from "next/navigation"
// // import { useForm } from "react-hook-form"
// // import { zodResolver } from "@hookform/resolvers/zod"
// // import * as z from "zod"
// // import DashboardTitle from "@/components/dashboard/dashboard-title"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"

// // import { Label } from "@/components/ui/label"

// // // Zod Schema
// // const sessionFormSchema = z.object({
// //   academicSession: z
// //     .string()
// //     .min(1, "Academic session is required")
// //     .regex(/^\d{4}\/\d{4}$/, "Format must be YYYY/YYYY (e.g., 2025/2026)"),
// //   startDate: z.string().min(1, "Start date is required"),
// //   endDate: z.string().min(1, "End date is required"),
// // })

// // export type SessionFormData = z.infer<typeof sessionFormSchema>

// // interface CreateSessionFormProps {
// //   onSubmit?: (data: SessionFormData) => void | Promise<void>
// //   isLoading?: boolean
// //   defaultValues?: Partial<SessionFormData>
// // }

// // const CreateSessionForm = ({
// //   onSubmit,
// //   isLoading,
// //   defaultValues,
// // }: CreateSessionFormProps) => {
// //   const router = useRouter()

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors, isSubmitting },
// //     reset,
// //   } = useForm<SessionFormData>({
// //     resolver: zodResolver(sessionFormSchema),
// //     defaultValues: {
// //       academicSession: defaultValues?.academicSession || "",
// //       startDate: defaultValues?.startDate || "",
// //       endDate: defaultValues?.endDate || "",
// //     },
// //   })

// //   const handleFormSubmit = async (data: SessionFormData) => {
// //     try {
// //       if (onSubmit) {
// //         await onSubmit(data)
// //       } else {
// //         // Default behavior if no onSubmit prop is provided
// //         console.log("Form data:", data)
// //         // You can add your API call here
// //         // await createSession(data)

// //         // On success, navigate back
// //         router.push("/admin/class-management/session")
// //       }
// //     } catch (error) {
// //       console.error("Error submitting form:", error)
// //       // Handle error (you can add toast notification here)
// //     }
// //   }

// //   const handleCancel = () => {
// //     reset()
// //     router.push("/admin/class-management/session")
// //   }

// //   return (
// //     <section className="min-h-[calc(100vh-70px)] bg-[#FAFAFA] px-2 pt-4 pb-10 lg:px-4">
// //       <DashboardTitle heading="Create Session" description="Create academic session" />

// //       <form onSubmit={handleSubmit(handleFormSubmit)}>
// //         <section className="my-8 space-y-7">
// //           {/* academic year */}
// //           <div>
// //             <Label htmlFor="academicSession">
// //               Academic Session <span className="text-red-500">*</span>
// //             </Label>
// //             <Input
// //               id="academicSession"
// //               {...register("academicSession")}
// //               placeholder="e.g 2025/2026"
// //               className={errors.academicSession ? "border-red-500" : ""}
// //             />
// //             {errors.academicSession && (
// //               <p className="mt-1 text-sm text-red-500">
// //                 {errors.academicSession.message}
// //               </p>
// //             )}
// //           </div>

// //           {/* first term start and term end */}
// //           <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
// //             {/* first term start */}
// //             <div>
// //               <Label htmlFor="firstTermStart">
// //                 Session Start Date <span className="text-red-500">*</span>
// //               </Label>
// //               <Input
// //                 id="firstTermStart"
// //                 {...register("startDate")}
// //                 placeholder="Select a date"
// //                 type="date"
// //                 className={errors.startDate ? "border-red-500" : ""}
// //               />
// //               {errors.startDate && (
// //                 <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>
// //               )}
// //             </div>

// //             {/* first term end */}
// //             <div>
// //               <Label htmlFor="firstTermEnd">
// //                 Session End Date <span className="text-red-500">*</span>
// //               </Label>
// //               <Input
// //                 id="firstTermEnd"
// //                 {...register("endDate")}
// //                 placeholder="Select a date"
// //                 type="date"
// //                 className={errors.endDate ? "border-red-500" : ""}
// //               />
// //               {errors.endDate && (
// //                 <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>
// //               )}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Buttons */}
// //         <div className="flex justify-end gap-4">
// //           <Button
// //             type="button"
// //             variant="outline"
// //             onClick={handleCancel}
// //             disabled={isSubmitting || isLoading}
// //           >
// //             Cancel
// //           </Button>
// //           <Button type="submit" disabled={isSubmitting || isLoading}>
// //             {isSubmitting || isLoading ? "Saving..." : "Save"}
// //           </Button>
// //         </div>
// //       </form>
// //     </section>
// //   )
// // }

// // export default CreateSessionForm

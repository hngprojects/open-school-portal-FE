"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { SuccessModal } from "@/components/dashboard/success-modal"
import { toast } from "sonner"

// Zod Schema
const classFormSchema = z.object({
  academicSession: z
    .string()
    .min(1, "Academic session is required")
    .regex(/^\d{4}\/\d{4}$/, "Format must be YYYY/YYYY (e.g., 2025/2026)"),
  className: z.string().min(1, "Class name is required").min(2),
  arm: z.string().optional(),
  classTeacher: z.string().optional(),
})

export type ClassFormData = z.infer<typeof classFormSchema>

interface AddClassFormProps {
  onSubmit?: (data: ClassFormData) => void | Promise<void>
  isLoading?: boolean
  defaultValues?: Partial<ClassFormData>
}

const AddClassForm = ({ onSubmit, isLoading, defaultValues }: AddClassFormProps) => {
  const router = useRouter()
  const [openSuccess, setOpenSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ClassFormData>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      academicSession: defaultValues?.academicSession || "",
      className: defaultValues?.className || "",
      arm: defaultValues?.arm || "",
      classTeacher: defaultValues?.classTeacher || "",
    },
  })

  const handleFormSubmit = async (data: ClassFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        console.log("Form data:", data)
      }
      // ❗ Show success modal after form submission
      setOpenSuccess(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      if (error instanceof Error)
        toast.error(error.message)
    }
  }

  const handleCancel = () => {
    reset()
    router.push("/admin/class-management/class")
  }

  return (
    <>
      {/* SUCCESS MODAL */}
      <SuccessModal
        open={openSuccess}
        onOpenChange={setOpenSuccess}
        title="Class Added"
        message="This class is now active in the session"
        actionLabel="Continue"
        onAction={() => {
          setOpenSuccess(false)
          router.push("/admin/class-management/class")
        }}
      />

      {/* FORM */}
      <div className="mt-7">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <section className="my-8 grid grid-cols-1 gap-6 space-y-7 lg:grid-cols-2">
            {/* academic year */}
            <div>
              <Label htmlFor="academicSession">
                Academic Session
                <span className="ml-1 rounded-2xl bg-[#ECFDF3] px-1.5 py-0.5 text-xs text-green-600">
                  Active
                </span>
              </Label>
              <Input
                id="academicSession"
                {...register("academicSession")}
                placeholder="2025/2026"
                className={errors.academicSession ? "border-red-500" : ""}
              />
              {errors.academicSession && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.academicSession.message}
                </p>
              )}
            </div>

            {/* class */}
            <div>
              <Label htmlFor="className">Class</Label>
              <Input
                id="className"
                {...register("className")}
                placeholder="Enter class e.g, JSS 3"
                type="text"
                className={errors.className ? "border-red-500" : ""}
              />
              {errors.className && (
                <p className="mt-1 text-sm text-red-500">{errors.className.message}</p>
              )}
            </div>

            {/* arm */}
            <div>
              <Label htmlFor="arm">Arms</Label>
              <Input
                id="arm"
                {...register("arm")}
                placeholder="Enter class name e.g, JSS 3A"
                type="text"
                className={errors.arm ? "border-red-500" : ""}
              />
              {errors.arm && (
                <p className="mt-1 text-sm text-red-500">{errors.arm.message}</p>
              )}
            </div>

            {/* class teacher */}
            <div>
              <div>
                <Label htmlFor="classTeacher">
                  Class Teacher{" "}
                  <span className="ml-2 text-xs text-gray-500">Optional</span>
                </Label>
              </div>
              <Input
                id="classTeacher"
                {...register("classTeacher")}
                placeholder="Enter Teacher name"
                type="text"
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
              {isSubmitting || isLoading ? "Adding..." : "Add Class"}
            </Button>
          </div>

          {/* <SuccessModal
            open={openSuccess}
            onOpenChange={setOpenSuccess}
            title="Class Added"
            message="This class is now active in the session"
            actionLabel="Continue"
            onAction={() => {
              setOpenSuccess(false)
              router.push("/admin/class-management/class")
            }}
          /> */}
        </form>
      </div>
    </>
  )
}

export default AddClassForm

// "use client"

// import React from "react"
// import { useRouter } from "next/navigation"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// // Zod Schema
// const classFormSchema = z.object({
//   academicSession: z
//     .string()
//     .min(1, "Academic session is required")
//     .regex(/^\d{4}\/\d{4}$/, "Format must be YYYY/YYYY (e.g., 2025/2026)"),
//   className: z
//     .string()
//     .min(1, "Class name is required")
//     .min(2, "Class name must be at least 2 characters"),
//   arms: z
//     .string()
//     .min(1, "Arms is required")
//     .min(2, "Arms must be at least 2 characters"),
//   classTeacher: z.string().optional(),
// })

// export type ClassFormData = z.infer<typeof classFormSchema>

// interface AddClassFormProps {
//   onSubmit?: (data: ClassFormData) => void | Promise<void>
//   isLoading?: boolean
//   defaultValues?: Partial<ClassFormData>
// }

// const AddClassForm = ({ onSubmit, isLoading, defaultValues }: AddClassFormProps) => {
//   const router = useRouter()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<ClassFormData>({
//     resolver: zodResolver(classFormSchema),
//     defaultValues: {
//       academicSession: defaultValues?.academicSession || "",
//       className: defaultValues?.className || "",
//       arms: defaultValues?.arms || "",
//       classTeacher: defaultValues?.classTeacher || "",
//     },
//   })

//   const handleFormSubmit = async (data: ClassFormData) => {
//     try {
//       if (onSubmit) {
//         await onSubmit(data)
//       } else {
//         // Default behavior if no onSubmit prop is provided
//         console.log("Form data:", data)
//         // You can add your API call here
//         // await createClass(data)

//         // On success, navigate back
//         router.push("/admin/class-management/class")
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error)
//       // Handle error (you can add toast notification here)
//     }
//   }

//   const handleCancel = () => {
//     reset()
//     router.push("/admin/class-management/class")
//   }

//   return (
//     <div className="mt-7">
//       <form onSubmit={handleSubmit(handleFormSubmit)}>
//         <section className="my-8 grid grid-cols-1 gap-6 space-y-7 lg:grid-cols-2">
//           {/* academic year */}
//           <div>
//             <Label htmlFor="academicSession">
//               Academic Session
//               <span className="ml-1 rounded-2xl bg-[#ECFDF3] px-1.5 py-0.5 text-xs text-green-600">
//                 Active
//               </span>
//             </Label>
//             <Input
//               id="academicSession"
//               {...register("academicSession")}
//               placeholder="2025/2026"
//               className={errors.academicSession ? "border-red-500" : ""}
//             />
//             {errors.academicSession && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.academicSession.message}
//               </p>
//             )}
//           </div>

//           {/* class */}
//           <div>
//             <Label htmlFor="className">Class</Label>
//             <Input
//               id="className"
//               {...register("className")}
//               placeholder="Enter class e.g, JSS 3"
//               type="text"
//               className={errors.className ? "border-red-500" : ""}
//             />
//             {errors.className && (
//               <p className="mt-1 text-sm text-red-500">{errors.className.message}</p>
//             )}
//           </div>

//           {/* arms */}
//           <div>
//             <Label htmlFor="arms">Arms</Label>
//             <Input
//               id="arms"
//               {...register("arms")}
//               placeholder="Enter class name e.g, JSS 3A"
//               type="text"
//               className={errors.arms ? "border-red-500" : ""}
//             />
//             {errors.arms && (
//               <p className="mt-1 text-sm text-red-500">{errors.arms.message}</p>
//             )}
//           </div>

//           {/* class teacher */}
//           <div>
//             <div>
//               <Label htmlFor="classTeacher">
//                 Class Teacher <span className="ml-2 text-xs text-gray-500">Optional</span>
//               </Label>
//             </div>
//             <Input
//               id="classTeacher"
//               {...register("classTeacher")}
//               placeholder="Enter Teacher name"
//               type="text"
//             />
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
//           <Button type="submit" disabled={isSubmitting || isLoading}>
//             {isSubmitting || isLoading ? "Adding..." : "Add Class"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default AddClassForm

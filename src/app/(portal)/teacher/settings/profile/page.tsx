// components/settings/SchoolInformationForm.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { Upload, X, CheckCircle } from "lucide-react"
// import { apiFetch } from "@/lib/api/client"
// import { toast } from "sonner"

// Zod Schema (unchanged)
const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone number too short")
    .max(15, "Phone number too long")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  // const [avatar, setAvatar] = useState("/faith-avatar.jpg");
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [logoPreview, setLogoPreview] = useState("/studbridge-logo.png")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      address: "",
    },
  })

  const handleImageUpload = (file: File | null) => {
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be under 5MB")
      return
    }

    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setAvatar(reader.result as string);
    //     setUploadError(null);
    //   };
    //   reader.readAsDataURL(file);
    // };

    const reader = new FileReader()
    reader.onloadend = () => {
      setLogoPreview(reader.result as string) // ← THIS WAS THE FIX
    }
    reader.readAsDataURL(file)
  }

  // const onSubmit = async (_data: ProfileFormData) => {
  //   await new Promise((resolve) => setTimeout(resolve, 1200))
  //   setShowSuccess(true)
  //   setTimeout(() => setShowSuccess(false), 2000)
  // }
  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-16 lg:pt-0">
        {/* School Logo Card */}
        <div className="overflow-hidde rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-6 py-5 lg:px-8 lg:py-6">
            <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage your school & personal Informations
            </p>
          </div>

          <div className="p-6 lg:p-10">
            <div className="flex flex-col items-center gap-8 lg:flex-row">
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
                <Image
                  src={logoPreview}
                  alt="School Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full lg:w-auto">
                <label
                  htmlFor="logo-upload"
                  className="inline-block cursor-pointer"
                  onDrop={(e) => {
                    e.preventDefault()
                    handleImageUpload(e.dataTransfer.files[0])
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-4 transition hover:bg-gray-50 lg:justify-start">
                    <Upload className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Change photo
                    </span>
                  </div>
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                />
                {uploadError && (
                  <p className="mt-3 flex items-center gap-1 text-xs text-red-600">
                    <X className="h-4 w-4" /> {uploadError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-6 py-5 lg:px-8 lg:py-6">
            <h2 className="mb-2 text-lg font-medium text-gray-900">
              Personal Information
            </h2>
            {/* <p className="text-gray-600 text-sm mb-6 lg:mb-8">Manage your personal information</p> */}

            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
                  placeholder="Enter First Name"
                />
                {errors.firstName && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <X className="h-4 w-4" />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Middle Name
                </label>
                <input
                  {...register("middleName")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
                  placeholder="Enter Middle Name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
                  placeholder="Enter Last Name"
                />
                {errors.lastName && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <X className="h-4 w-4" />
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  value=""
                  placeholder="admin@schoolbase.com"
                  className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone No.
                </label>
                <div className="flex">
                  <select className="rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-700">
                    <option>+234</option>
                  </select>
                  <input
                    {...register("phone")}
                    className="w-10 flex-1 rounded-r-lg border border-l-0 border-gray-300 px-4 py-3 transition outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    placeholder="Enter Phone Number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <X className="h-4 w-4" />
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="mt-8">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                {...register("address")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
                placeholder="Enter Address"
              />
              {errors.address && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <X className="h-4 w-4" />
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-8 lg:justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-10 py-4 text-lg font-medium text-white shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl disabled:bg-red-400 lg:w-auto"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <>
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="animate-in fade-in zoom-in w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl duration-300">
              <div className="space-y-6 text-center">
                <div className="relative mx-auto h-20 w-20">
                  <div className="absolute inset-0 animate-ping">
                    <CheckCircle className="h-20 w-20 text-green-500 opacity-70" />
                  </div>
                  <CheckCircle className="relative h-20 w-20 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Saved Successfully!
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Your school information has been updated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

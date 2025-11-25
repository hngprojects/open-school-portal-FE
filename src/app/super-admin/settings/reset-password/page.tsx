"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Upload, X, CheckCircle } from "lucide-react"

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type PasswordFormData = z.infer<typeof passwordSchema>

export default function ResetPasswordPage() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async (data: PasswordFormData) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    console.log("Password updated:", data)
    setShowSuccess(true)
    reset()
    setTimeout(() => setShowSuccess(false), 4000)
  }

  return (
    <>
      <div className="max-w- rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-red-600">Reset Password</h1>
        <p className="mb-10 text-gray-600">
          Manage your account security and authentication methods.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Change Password Section */}
          <section>
            <h2 className="mb-3 text-lg font-medium text-gray-900">Change Password</h2>
            <p className="mb-8 text-sm text-gray-600">Update your account password</p>

            <div className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    {...register("currentPassword")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 transition outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrent ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    {...register("newPassword")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 transition outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNew ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 transition outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Password Requirements */}
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Password must contain:
            </p>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• At least 8 characters</li>
              <li>• One uppercase letter</li>
              <li>• One lowercase letter</li>
              <li>• One number</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && (
                <div className="relative mx-auto h-20 w-20">
                  <div className="absolute inset-0 animate-ping">
                    <CheckCircle className="h-20 w-20 text-green-500 opacity-70" />
                  </div>
                  <CheckCircle className="relative h-20 w-20 text-green-500" />
                </div>
              )}
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          />
          <div className="animate-in fade-in zoom-in relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl duration-300">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <i className="fas fa-check text-3xl text-green-600"></i>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-gray-900">Password Updated!</h3>
              <p className="mt-3 text-gray-600">
                Your password has been changed successfully.
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowSuccess(false)}
                className="rounded-lg bg-red-600 px-8 py-3 font-medium text-white transition hover:bg-red-700"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

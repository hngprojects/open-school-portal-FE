"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { sendResetPasswordRequest } from "@/lib/api/auth"

interface FormErrors {
  newPassword?: string
  confirmPassword?: string
}

interface TouchedFields {
  newPassword: boolean
  confirmPassword: boolean
}

interface FormData {
  newPassword: string
  confirmPassword: string
}

const PasswordReset = () => {
  const [formData, setFormData] = useState<FormData>({
    newPassword: "",
    confirmPassword: "",
  })
  // get reset token from url
  const resetToken =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token")
      : null

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({
    newPassword: false,
    confirmPassword: false,
  })

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  /* ----------------------------- VALIDATION ----------------------------- */
  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required"
    if (password.length < 6) return "Password must be at least 6 characters"
    if (password.length > 20) return "Password must not exceed 20 characters"
    if (!/(?=.*[a-zA-Z])/.test(password)) return "Password must contain a letter"
    if (!/(?=.*\d)/.test(password)) return "Password must contain a number"
    if (!/(?=.*[#?!@$%^&*-])/.test(password))
      return "Password must contain special character"
    return undefined
    // if (password === formData.oldPassword)
    //   return "Your new password cannot be the same as your old password";
    // return undefined;
  }

  const validateConfirmPassword = (
    confirmPassword: string,
    newPassword: string
  ): string | undefined => {
    if (!confirmPassword) return "Please confirm your password"
    if (confirmPassword !== newPassword) return "Passwords do not match"
    return undefined
  }

  /* ----------------------------- HANDLERS ----------------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name as keyof TouchedFields]) {
      const newErrors: FormErrors = { ...errors }

      if (name === "newPassword") {
        newErrors.newPassword = validatePassword(value)

        if (touched.confirmPassword) {
          newErrors.confirmPassword = validateConfirmPassword(
            formData.confirmPassword,
            value
          )
        }
      }

      if (name === "confirmPassword") {
        newErrors.confirmPassword = validateConfirmPassword(value, formData.newPassword)
      }

      setErrors(newErrors)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    const newErrors: FormErrors = { ...errors }

    if (name === "newPassword") {
      newErrors.newPassword = validatePassword(formData.newPassword)
    }

    if (name === "confirmPassword") {
      newErrors.confirmPassword = validateConfirmPassword(
        formData.confirmPassword,
        formData.newPassword
      )
    }

    setErrors(newErrors)
  }

  const hasErrors = () => {
    return (
      !formData.newPassword ||
      !formData.confirmPassword ||
      !!errors.newPassword ||
      !!errors.confirmPassword
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newPasswordError = validatePassword(formData.newPassword)
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.newPassword
    )

    if (newPasswordError || confirmPasswordError) {
      setErrors({
        newPassword: newPasswordError,
        confirmPassword: confirmPasswordError,
      })
      setTouched({ newPassword: true, confirmPassword: true })
      return
    }
    try {
      await sendResetPasswordRequest({
        token: resetToken || "",
        newPassword: formData.newPassword,
      })
      router.push("/login")
    } catch (error) {
      console.error("Password reset failed:", error)
    }
  }

  /* ----------------------------- UI ----------------------------- */
  return (
    <section className="flex min-h-screen w-full justify-center overflow-x-hidden bg-white">
      {/* Right content */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-8 lg:px-12 xl:px-20">
        {/* Logo */}
        <div className="mb-8 sm:mb-12">
          <Image
            src="/assets/images/auth/desktop-school-logo.png"
            alt="School Logo"
            width={130}
            height={130}
            className="h-20 w-20 sm:h-[100px] sm:w-[100px] lg:h-40 lg:w-40"
          />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[464px]">
          <h1 className="mb-8 text-center text-[24px] font-bold text-[#2D2D2D] sm:text-[28px] lg:text-[32px]">
            Reset Password
          </h1>

          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
                Enter New Password
              </label>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="••••••"
                  className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm transition-colors focus:outline-none ${
                    touched.newPassword && errors.newPassword
                      ? "border-[#DA3743]"
                      : "border-[#E0E0E0] focus:border-[#2D2D2D]"
                  }`}
                  value={formData.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2"
                >
                  <Image
                    src={
                      showNewPassword
                        ? "/assets/images/auth/show-password-icon.png"
                        : "/assets/images/auth/hide-password-icon.png"
                    }
                    alt="Toggle Password Visibility"
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {touched.newPassword && errors.newPassword && (
                <p className="mt-2 flex items-start gap-2 text-xs text-[#DA3743]">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[#DA3743] text-[10px] font-bold text-[#DA3743]">
                    !
                  </span>
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
                Confirm New Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••"
                  className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm transition-colors focus:outline-none ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-[#DA3743]"
                      : "border-[#E0E0E0] focus:border-[#2D2D2D]"
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2"
                >
                  <Image
                    src={
                      showConfirmPassword
                        ? "/assets/images/auth/show-password-icon.png"
                        : "/assets/images/auth/hide-password-icon.png"
                    }
                    alt="Toggle Password Visibility"
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {touched.confirmPassword && errors.confirmPassword && (
                <p className="mt-2 flex items-start gap-2 text-xs text-[#DA3743]">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[#DA3743] text-[10px] font-bold text-[#DA3743]">
                    !
                  </span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <ul className="mb-6 list-inside list-disc space-y-2.5 text-xs text-[#6B6B6B] sm:mb-8">
              <li>6 characters (20 max)</li>
              <li>1 letter, 1 number, 1 special character (# ? ! @ $)</li>
              <li>Strong password</li>
            </ul>

            {/* Submit */}
            <button
              type="submit"
              disabled={hasErrors()}
              className={`w-full rounded-lg py-3 text-[16px] font-semibold text-white transition ${
                hasErrors()
                  ? "cursor-not-allowed bg-[#F5A6AC]"
                  : "bg-[#DA3743] hover:bg-[#C32F3A]"
              }`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PasswordReset

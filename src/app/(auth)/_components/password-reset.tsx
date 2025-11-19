"use client"

import React, { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PasswordResetSuccess from "./password-reset-success"
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/schemas/auth"
import { useAuthStore } from "@/store/auth-store"

type ResetPasswordField = keyof ResetPasswordFormValues

const AUTH_SECTION_STYLES =
  "flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8"
const BUTTON_STYLES =
  "w-full bg-[#DA3743] py-3 text-white hover:bg-[#C32F3A] disabled:bg-[#DA3743] disabled:text-white disabled:opacity-100"

const initialValues: ResetPasswordFormValues = {
  newPassword: "",
  confirmPassword: "",
}

const PasswordResetForm = () => {
  const searchParams = useSearchParams()
  const token = useMemo(() => {
    const tokenParam = searchParams.get("token")
    return tokenParam && tokenParam.trim().length > 0 ? tokenParam : undefined
  }, [searchParams])
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState<Partial<Record<ResetPasswordField, string>>>({})
  const [touched, setTouched] = useState<Record<ResetPasswordField, boolean>>({
    newPassword: false,
    confirmPassword: false,
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tokenError, setTokenError] = useState<string | null>(null)
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const pendingEmail = useAuthStore((state) => state.pendingEmail)
  const setPendingEmail = useAuthStore((state) => state.setPendingEmail)

  const getFieldError = (
    field: ResetPasswordField,
    candidate: ResetPasswordFormValues
  ) => {
    const validation = resetPasswordSchema.safeParse(candidate)
    if (validation.success) {
      return undefined
    }
    return validation.error.flatten().fieldErrors[field]?.[0]
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const field = name as ResetPasswordField
    const nextValues = { ...formData, [field]: value }
    setFormData(nextValues)

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: getFieldError(field, nextValues),
      }))
    }

    if (field === "newPassword" && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: getFieldError("confirmPassword", nextValues),
      }))
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const field = event.target.name as ResetPasswordField
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }))
    }

    setErrors((prev) => ({
      ...prev,
      [field]: getFieldError(field, formData),
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched({
      newPassword: true,
      confirmPassword: true,
    })

    const validation = resetPasswordSchema.safeParse(formData)
    if (!validation.success) {
      const { fieldErrors } = validation.error.flatten()
      setErrors({
        newPassword: fieldErrors.newPassword?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      })
      return
    }

    if (!token) {
      setTokenError("The reset link is invalid or has expired. Please request a new one.")
      return
    }

    setIsSubmitting(true)
    setTokenError(null)
    // TODO: integrate API call
    setSubmittedEmail(pendingEmail ?? null)
    setIsSuccess(true)
    setIsSubmitting(false)
    setPendingEmail(null)
    setFormData(initialValues)
    setTouched({
      newPassword: false,
      confirmPassword: false,
    })
    setErrors({})
  }

  const renderFieldError = (field: ResetPasswordField) => {
    if (!touched[field] || !errors[field]) return null
    return (
      <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
        <AlertCircle className="h-4 w-4" />
        <span>{errors[field]}</span>
      </p>
    )
  }

  if (isSuccess) {
    return (
      <section className={AUTH_SECTION_STYLES}>
        <div className="mb-8">
          <Image
            src="/assets/images/auth/desktop-school-logo.png"
            alt="StudyBridge Online School Logo"
            width={100}
            height={100}
            className="h-40 w-40"
          />
        </div>

        <div className="w-full max-w-md">
          <PasswordResetSuccess email={submittedEmail ?? pendingEmail ?? undefined} />
          <Button asChild className={`${BUTTON_STYLES} mt-8`}>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className={AUTH_SECTION_STYLES}>
      <div className="mb-8">
        <Image
          src="/assets/images/auth/desktop-school-logo.png"
          alt="StudyBridge Online School Logo"
          width={100}
          height={100}
          className="h-40 w-40"
        />
      </div>

      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">Reset Password</h1>
          <p className="text-sm text-gray-600">
            {pendingEmail
              ? `Reset the password for ${pendingEmail}.`
              : "Create a new password for your StudyBridge account."}
          </p>
        </header>

        {tokenError ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {tokenError}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="mt-2">
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter a strong password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(touched.newPassword && errors.newPassword)}
                  className={`w-full pr-12 ${
                    touched.newPassword && errors.newPassword
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Image
                    src={
                      showNewPassword
                        ? "/assets/images/auth/show-password-icon.png"
                        : "/assets/images/auth/hide-password-icon.png"
                    }
                    alt="Toggle password visibility"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
              {renderFieldError("newPassword")}
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  className={`w-full pr-12 ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Image
                    src={
                      showConfirmPassword
                        ? "/assets/images/auth/show-password-icon.png"
                        : "/assets/images/auth/hide-password-icon.png"
                    }
                    alt="Toggle password visibility"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
              {renderFieldError("confirmPassword")}
            </div>
          </div>

          <ul className="space-y-2 text-sm text-gray-600">
            <li>6 characters minimum and 20 maximum</li>
            <li>At least 1 letter, 1 number, and 1 special character (#?!@$%^&*-)</li>
            <li>Use a password you haven&apos;t used elsewhere</li>
          </ul>

          <Button
            type="submit"
            disabled={!token || isSubmitting}
            className={BUTTON_STYLES}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Return to{" "}
          <Link href="/login" className="font-medium text-[#DA3743] hover:text-[#C32F3A]">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}

export default PasswordResetForm

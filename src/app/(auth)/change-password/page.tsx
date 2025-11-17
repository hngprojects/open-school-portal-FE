"use client"
import React, { useState } from "react"
import Image from "next/image"

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

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({
    newPassword: false,
    confirmPassword: false,
  })

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return "Password is required"
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain lowercase letter"
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain uppercase letter"
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain a number"
    }
    return undefined
  }

  const validateConfirmPassword = (
    confirmPassword: string,
    newPassword: string
  ): string | undefined => {
    if (!confirmPassword) {
      return "Please confirm your password"
    }
    if (confirmPassword !== newPassword) {
      return "Passwords do not match"
    }
    return undefined
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Real-time validation
    if (touched[name as keyof TouchedFields]) {
      const newErrors: FormErrors = { ...errors }

      if (name === "newPassword") {
        newErrors.newPassword = validatePassword(value)
        // Also re-validate confirm password if it's been touched
        if (touched.confirmPassword) {
          newErrors.confirmPassword = validateConfirmPassword(
            formData.confirmPassword,
            value
          )
        }
      } else if (name === "confirmPassword") {
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
    } else if (name === "confirmPassword") {
      newErrors.confirmPassword = validateConfirmPassword(
        formData.confirmPassword,
        formData.newPassword
      )
    }

    setErrors(newErrors)
  }

  const hasErrors = (): boolean => {
    return (
      !formData.newPassword ||
      !formData.confirmPassword ||
      !!errors.newPassword ||
      !!errors.confirmPassword
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
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

    // Submit form
    console.log("Password reset submitted:", formData)
  }

  return (
    <section className="flex flex-1 flex-col px-4 max-[1400px]:items-center max-sm:gap-10 max-sm:pt-[60px] min-[1400px]:gap-1 sm:pt-6 sm:max-[1400px]:gap-[43px]">
      {/* school logo */}
      <div className="flex items-center">
        <picture>
          <source
            media="(min-width: 641px)"
            srcSet="/assets/images/auth/desktop-school-logo.png"
          />
          <Image
            className="min-[1400px]:h-[250px] min-[1400px]:w-[250px] sm:max-[1400px]:h-[152px] sm:max-[1400px]:w-[152px]"
            src={"/assets/images/auth/school-logo.png"}
            alt="School Logo"
            width={56}
            height={56}
          />
        </picture>
      </div>

      {/* main content */}
      <div className="w-full max-w-[488px] md:max-lg:flex md:max-lg:flex-col md:max-lg:items-center">
        {/* Password Reset Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* New Password Field */}
          <div className="mb-6">
            <div className="flex max-w-[488px] items-start justify-between">
              <label
                className="block font-sans text-[16px] leading-5 font-medium"
                htmlFor="new-password"
              >
                New Password
                <span className="ml-1 text-[#DA3743]">*</span>
              </label>
              {errors.newPassword && touched.newPassword && (
                <span className="max-w-[200px] text-right text-[12px] font-medium text-[#DA3743]">
                  {errors.newPassword}
                </span>
              )}
            </div>
            <div className="relative mt-2 max-w-[488px]">
              <input
                className={`w-full rounded-xl border px-4 py-3.5 pr-12 font-sans text-[14px] leading-5 font-normal text-[#535353] min-[1400px]:max-w-[488px] ${
                  errors.newPassword && touched.newPassword
                    ? "border-[#DA3743] bg-[#FFF5F5]"
                    : "border-[#2D2D2D4D] hover:border-[#2D2D2D]"
                } transition-colors focus:border-transparent focus:ring-2 focus:ring-[#DA3743] focus:outline-none`}
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="new-password"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#2D2D2D80] transition-colors hover:text-[#2D2D2D]"
              >
                {showNewPassword ? (
                  <Image
                    src={"/assets/images/auth/show-password-icon.png"}
                    alt="show password Icon"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src={"/assets/images/auth/hide-password-icon.png"}
                    alt="show password Icon"
                    width={16}
                    height={16}
                  />
                )}
              </button>
            </div>
            <p className="mt-2 font-sans text-[12px] text-[#2D2D2D80]">
              Must be 8+ characters with uppercase, lowercase & number
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6 max-w-[488px]">
            <div className="flex items-start justify-between">
              <label
                className="block font-sans text-[16px] leading-5 font-medium"
                htmlFor="confirm-password"
              >
                Confirm Password
                <span className="ml-1 text-[#DA3743]">*</span>
              </label>
              {errors.confirmPassword && touched.confirmPassword && (
                <span className="max-w-[200px] text-right text-[12px] font-medium text-[#DA3743]">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <div className="relative mt-2">
              <input
                className={`w-full rounded-xl border px-4 py-3.5 pr-12 font-sans text-[14px] leading-5 font-normal text-[#535353] min-[1400px]:max-w-[488px] ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-[#DA3743] bg-[#FFF5F5]"
                    : "border-[#2D2D2D4D] hover:border-[#2D2D2D]"
                } transition-colors focus:border-transparent focus:ring-2 focus:ring-[#DA3743] focus:outline-none`}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirm-password"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#2D2D2D80] transition-colors hover:text-[#2D2D2D]"
              >
                {showConfirmPassword ? (
                  <Image
                    src={"/assets/images/auth/show-password-icon.png"}
                    alt="show password Icon"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src={"/assets/images/auth/hide-password-icon.png"}
                    alt="show password Icon"
                    width={16}
                    height={16}
                  />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 flex w-full max-w-[488px] items-center justify-center gap-2 rounded-xl bg-[#DA3743] px-8 py-4 font-medium text-white transition-colors hover:bg-[#c53030] disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={hasErrors()}
          >
            Reset Password →
          </button>
        </form>
      </div>
    </section>
  )
}

export default PasswordReset

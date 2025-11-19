"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ApiError } from "@/lib/api/error"
import { loginWithPortal, refreshPortalSession } from "@/lib/auth"

// Type definitions
interface FormData {
  registrationNumber: string
  password: string
}

interface FormErrors {
  registrationNumber?: string
  password?: string
}

interface TouchedFields {
  registrationNumber: boolean
  password: boolean
}
interface Form_input_Props {
  label: string
  input_placeholder: string
}
const FormInput = ({ label, input_placeholder }: Form_input_Props) => {
  const [formData, setFormData] = useState<FormData>({
    registrationNumber: "",
    password: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({
    registrationNumber: false,
    password: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [serverMessage, setServerMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }

    if (serverError) setServerError(null)
    if (serverMessage) setServerMessage(null)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
    validateField(name as keyof FormData, formData[name as keyof FormData])
  }

  const validateField = (name: keyof FormData, value: string): void => {
    let error = ""

    switch (name) {
      case "registrationNumber":
        if (!value.trim()) {
          error = "Registration number is required"
        } else if (value.trim().length < 3) {
          error = "Registration number must be at least 3 characters"
        }
        break
      case "password":
        if (!value) {
          error = "Password is required"
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters"
        }
        break
      default:
        break
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Registration number is required"
    } else if (formData.registrationNumber.trim().length < 3) {
      newErrors.registrationNumber = "Registration number must be at least 3 characters"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({
      registrationNumber: true,
      password: true,
    })

    if (!validateForm()) {
      return
    }

    setServerError(null)
    setServerMessage(null)
    setIsSubmitting(true)

    try {
      const { response } = await loginWithPortal({
        registrationNumber: formData.registrationNumber,
        password: formData.password,
      })

      const successMessage =
        typeof response?.message === "string" && response.message.length > 0
          ? response.message
          : "Login successful. Redirecting..."

      setServerMessage(successMessage)
    } catch (error) {
      if (error instanceof ApiError) {
        setServerError(error.message)
      } else if (error instanceof Error) {
        setServerError(error.message)
      } else {
        setServerError("Login failed. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasErrors = (): boolean => {
    return Object.values(errors).some((error) => error !== undefined && error !== "")
  }

  useEffect(() => {
    let isMounted = true

    refreshPortalSession()
      .then(({ response }) => {
        if (!isMounted) return
        const message =
          typeof response?.message === "string" && response.message.length > 0
            ? response.message
            : "Session refreshed successfully."
        setServerMessage(message)
      })
      .catch((error) => {
        if (!isMounted) return
        if (error instanceof ApiError && error.status >= 500) {
          setServerError("Unable to refresh your session. Please sign in.")
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const isBusy = isSubmitting

  return (
    <section className="flex w-full flex-1 flex-col items-center gap-8 px-4 py-10 max-sm:pt-[60px] sm:px-6 sm:pt-6 lg:px-0">
      {/* school logo */}
      <div className="flex items-center justify-center">
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
      <div className="w-full">
        <header className="mb-10 text-center">
          {/* Login Header */}
          <h3 className="font-sans font-semibold max-sm:mb-2 max-sm:text-[24px] max-sm:leading-8 min-[1400px]:text-[42px] sm:mb-3 sm:leading-[38px] sm:max-[1400px]:text-[36px]">
            Welcome Back
          </h3>
          <p className="font-sans leading-6 font-normal text-[#2D2D2DB2] max-sm:text-[14px] sm:text-[16px]">
            Sign in your account to continue
          </p>
        </header>

        {/* Login Form */}
        <form className="mx-auto w-full max-w-[488px]" onSubmit={handleSubmit}>
          {serverError && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-[#DA3743] bg-[#FFF5F5] px-4 py-3 text-sm font-medium text-[#B42318]"
            >
              {serverError}
            </div>
          )}

          {serverMessage && (
            <div
              role="status"
              className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
            >
              {serverMessage}
            </div>
          )}

          {/* Registration Number Field */}
          <div className="mb-6 w-full">
            <div className="flex items-start justify-between">
              <label
                className="block font-sans text-[16px] leading-5 font-medium"
                htmlFor="registration-number"
              >
                {label}
                <span className="ml-1 text-[#DA3743]">*</span>
              </label>
              {errors.registrationNumber && touched.registrationNumber && (
                <span className="max-w-[200px] text-right text-[12px] font-medium text-[#DA3743]">
                  {errors.registrationNumber}
                </span>
              )}
            </div>
            <Input
              type="text"
              name="registrationNumber"
              id="registration-number"
              placeholder={input_placeholder}
              value={formData.registrationNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-2 ${
                errors.registrationNumber && touched.registrationNumber
                  ? "border-[#DA3743] bg-[#FFF5F5]"
                  : "border-[#2D2D2D4D] hover:border-[#2D2D2D]"
              }`}
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 w-full">
            <div className="flex items-start justify-between">
              <label
                className="block font-sans text-[16px] leading-5 font-medium"
                htmlFor="password"
              >
                Password
                <span className="ml-1 text-[#DA3743]">*</span>
              </label>
              {errors.password && touched.password && (
                <span className="max-w-[200px] text-right text-[12px] font-medium text-[#DA3743]">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="relative mt-2 w-full">
              <Input
                className={`pr-12 min-[1400px]:max-w-[488px] ${
                  errors.password && touched.password
                    ? "border-[#DA3743] bg-[#FFF5F5]"
                    : "border-[#2D2D2D4D] hover:border-[#2D2D2D]"
                } transition-colors focus:border-transparent focus:ring-2 focus:ring-[#DA3743] focus:outline-none`}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#2D2D2D80] transition-colors hover:text-[#2D2D2D]"
              >
                {showPassword ? (
                  <Image
                    src={"/assets/images/auth/show-password-icon.png"}
                    alt="Hide password"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src={"/assets/images/auth/hide-password-icon.png"}
                    alt="Show password"
                    width={16}
                    height={16}
                  />
                )}
              </button>
            </div>
            <p className="mt-2 cursor-pointer text-right font-sans text-[14px] leading-5 font-normal text-[#DA3743] transition-colors hover:text-[#c53030]">
              Forgot Password?
            </p>
          </div>

          <Button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={hasErrors() || isBusy}
          >
            {isBusy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Signing in...
              </>
            ) : (
              <>
                <Image
                  src={"/assets/images/auth/user-icon.png"}
                  alt="user icon"
                  width={16}
                  height={16}
                />
                Login &rarr;
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}

export default FormInput

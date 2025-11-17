"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoveRight, UserRound } from "lucide-react"

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
const Form_input = ({ label, input_placeholder }: Form_input_Props) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({
      registrationNumber: true,
      password: true,
    })

    if (validateForm()) {
      // Form is valid, proceed with login
      console.log("Form submitted:", formData)
      // Add your login logic here
    }
  }

  const hasErrors = (): boolean => {
    return Object.values(errors).some((error) => error !== undefined && error !== "")
  }
  return (
    <section className="mx-auto flex h-full w-full max-w-[488px] flex-col px-4 max-[1400px]:items-center max-sm:gap-10 max-sm:pt-[60px] min-[1400px]:gap-1 sm:pt-20 sm:max-[1400px]:gap-[43px] lg:pt-0 2xl:max-w-[65%] 2xl:pt-60">
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
      <div className="w-full pb-10">
        <header className="mb-10">
          {/* Login Header */}
          <h3 className="font-sans font-semibold max-sm:mb-2 max-sm:text-[24px] max-sm:leading-8 min-[1400px]:text-[42px] sm:mb-3 sm:leading-[38px] sm:max-[1400px]:text-[36px]">
            Welcome Back
          </h3>
          <p className="font-sans leading-6 font-normal text-[#2D2D2DB2] max-sm:text-[14px] sm:text-[16px]">
            Sign in your account to continue
          </p>
        </header>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Registration Number Field */}
          <div className="mb-6">
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
          <div className="mb-4">
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
            <div className="relative mt-2">
              <Input
                className={`pr-12 ${
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
            <Link
              href="/change-password"
              className="mt-2 flex cursor-pointer justify-end text-right font-sans text-[14px] leading-5 font-normal text-[#DA3743] transition-colors hover:text-[#c53030]"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="mt-4 w-full disabled:cursor-not-allowed"
            disabled={hasErrors()}
          >
            {/* <Image
              src={"/assets/images/auth/user-icon.png"}
              alt="user icon"
              width={16}
              height={16}
            /> */}
            <UserRound className="" />
            Login
            <MoveRight />
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Form_input

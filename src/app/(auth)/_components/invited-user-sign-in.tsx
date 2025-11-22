"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/schemas/auth"
import SchoolLogo from "./school-logo"

type ResetField = keyof ResetPasswordFormValues

const initialValues: ResetPasswordFormValues = {
  newPassword: "",
  confirmPassword: "",
}

const InvitedUserSignIn = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState("")
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState<Partial<Record<ResetField, string>>>({})
  const [touched, setTouched] = useState<Record<ResetField, boolean>>({
    newPassword: false,
    confirmPassword: false,
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateField = (field: ResetField, candidate: ResetPasswordFormValues) => {
    const result = resetPasswordSchema.safeParse(candidate)
    if (result.success) return undefined
    return result.error.flatten().fieldErrors[field]?.[0]
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const field = name as ResetField
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    if (touched[field])
      setErrors((prev) => ({ ...prev, [field]: validateField(field, updated) }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name as ResetField
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData) }))
  }

  const hasErrors =
    !formData.newPassword ||
    !formData.confirmPassword ||
    !!errors.newPassword ||
    !!errors.confirmPassword

  const handleSubmitStep2 = (e: React.FormEvent) => {
    e.preventDefault()
    // Directly go to success page
    setStep(3)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-8 lg:px-12 xl:px-20">
      <SchoolLogo />
      {/* <div className="mb-8 sm:mb-12">
        <Image
          src="/assets/images/auth/desktop-school-logo.png"
          alt="School Logo"
          width={130}
          height={130}
          className="h-20 w-20 sm:h-[100px] sm:w-[100px] lg:h-40 lg:w-40"
        />
      </div> */}

      <AnimatePresence mode="wait">
        {/* STEP 1: Email */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[464px]"
          >
            <h1 className="mb-2 text-center text-[28px] font-bold text-[#2D2D2D]">
              Welcome!
            </h1>
            <p className="mb-8 text-center text-sm text-[#6B6B6B]">
              You&apos;ve been invited as a teacher.
            </p>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jamesjackendfornd@gmail.com"
              />
            </div>

            <Button
              disabled={!email}
              onClick={() => setStep(2)}
              className="w-full py-3 text-[16px] font-semibold"
            >
              Continue <MoveRight />
            </Button>
          </motion.div>
        )}

        {/* STEP 2: Password */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[464px]"
          >
            <h1 className="mb-2 text-center text-[28px] font-bold text-[#2D2D2D]">
              Set your password
            </h1>

            <form onSubmit={handleSubmitStep2}>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  readOnly
                  className="border-[#E0E0E0] bg-[#F5F5F5] text-[#6B6B6B]"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
                  Enter New Password
                </label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="••••••"
                    value={formData.newPassword}
                    onChange={handlePasswordChange}
                    onBlur={handleBlur}
                    className={`pr-12 ${touched.newPassword && errors.newPassword ? "border-[#DA3743]" : "border-[#E0E0E0] focus:border-[#2D2D2D]"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((s) => !s)}
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                  >
                    <Image
                      src={
                        showNewPassword
                          ? "/assets/images/auth/show-password-icon.png"
                          : "/assets/images/auth/hide-password-icon.png"
                      }
                      alt="Toggle"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••"
                    value={formData.confirmPassword}
                    onChange={handlePasswordChange}
                    onBlur={handleBlur}
                    className={`pr-12 ${touched.confirmPassword && errors.confirmPassword ? "border-[#DA3743]" : "border-[#E0E0E0] focus:border-[#2D2D2D]"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                  >
                    <Image
                      src={
                        showConfirmPassword
                          ? "/assets/images/auth/show-password-icon.png"
                          : "/assets/images/auth/hide-password-icon.png"
                      }
                      alt="Toggle"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={hasErrors}
                className="w-full py-3 text-[16px] font-semibold"
              >
                Create Account <MoveRight />
              </Button>
            </form>
          </motion.div>
        )}

        {/* STEP 3: Success */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className="flex w-full max-w-[464px] flex-col items-center text-center"
          >
            <h1 className="mb-4 text-2xl font-bold text-[#2D2D2D]">Account Created!</h1>
            <p className="mb-8 text-sm text-[#6B6B6B]">
              Your account has been successfully created. You can now log in to continue.
            </p>

            <div className="mb-8">
              <Image
                src="/assets/images/invited-user/vector.png"
                alt="Success"
                width={150}
                height={150}
              />
            </div>

            <Button asChild className="w-full py-3 text-[16px] font-semibold">
              <Link href="/login">Go to Login</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InvitedUserSignIn

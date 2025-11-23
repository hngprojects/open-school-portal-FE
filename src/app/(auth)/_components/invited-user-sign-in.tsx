"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/schemas/auth"

type ResetField = keyof ResetPasswordFormValues

const initialValues: ResetPasswordFormValues = {
  newPassword: "",
  confirmPassword: "",
}

const InvitedUserSignIn = () => {
  const [step, setStep] = useState<1 | 2>(1)

  // 👇 Added email state back
  const [email, setEmail] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const isValidEmail = /^\S+@\S+\.\S+$/.test(email)

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

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, updated),
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name as ResetField
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData),
    }))
  }

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault()

    // validate passwords
    const result = resetPasswordSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        newPassword: fieldErrors.newPassword?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      })
      setTouched({ newPassword: true, confirmPassword: true })
      return
    }

    // validate email first
    if (!isValidEmail) {
      setEmailTouched(true)
      return
    }

    setStep(2)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto px-4 sm:px-8 lg:px-12 xl:px-20">
      <Link href="/">
        <div className="-gap-1.5 mb-8 flex flex-col items-center justify-center">
          <Image src="/assets/logo.svg" alt="School Base Logo" width={50} height={50} />
          <span className="text-accent text-sm font-bold tracking-wider uppercase">
            school base
          </span>
        </div>
      </Link>

      <AnimatePresence mode="wait">
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
              {" "}
              Welcome!{" "}
            </h1>
            <p className="mb-1 text-center text-sm text-[#6B6B6B]">
              You&apos;ve been invited as a teacher.
            </p>
            <p className="mb-8 text-center text-sm text-[#6B6B6B]">
              Finish setup to enter your school portal.
            </p>

            <form onSubmit={handleSubmitStep1}>
              {/* EMAIL */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#2D2D2D]">
                  Email Address
                </label>

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder="jamesjackendfornd@gmail.com"
                  className={`bg-[#FBEBEC] ${
                    emailTouched && !isValidEmail
                      ? "border-[#DA3743]"
                      : "border-[#E0E0E0] focus:border-[#2D2D2D]"
                  }`}
                />

                {emailTouched && !isValidEmail && (
                  <p className="mt-1 text-sm text-[#DA3743]">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              {/* NEW PASSWORD */}
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
                    className={`pr-12 ${
                      touched.newPassword && errors.newPassword
                        ? "border-[#DA3743]"
                        : "border-[#E0E0E0]"
                    }`}
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
                {touched.newPassword && errors.newPassword && (
                  <p className="mt-1 text-sm text-[#DA3743]">{errors.newPassword}</p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
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
                    className={`pr-12 ${
                      touched.confirmPassword && errors.confirmPassword
                        ? "border-[#DA3743]"
                        : "border-[#E0E0E0]"
                    }`}
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
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-1 text-sm text-[#DA3743]">{errors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" className="w-full py-3 text-[16px] font-semibold">
                Create Account <MoveRight />
              </Button>
            </form>
          </motion.div>
        )}

        {/* STEP 2 SUCCESS */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className="flex w-full max-w-[464px] flex-col items-center text-center"
          >
            {/* MOBILE: vector above, LARGE: vector below */}
            <div className="order-1 mb-8 md:order-3">
              <Image
                src="/assets/images/invited-user/vector.png"
                alt="Success"
                width={150}
                height={150}
              />
            </div>

            <h1 className="order-2 mb-4 text-2xl font-bold text-[#2D2D2D] md:order-1">
              Your Account Has Been Created Successfully!
            </h1>

            <p className="order-3 mb-8 text-sm text-[#6B6B6B] md:order-2">
              Account has been activated successfully.
            </p>

            <Button
              asChild
              className="order-4 w-full py-3 text-[16px] font-semibold md:order-4"
            >
              <Link href="/login">Go to Login</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InvitedUserSignIn

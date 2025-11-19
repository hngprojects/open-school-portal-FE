"use client"
import React, { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

// Type definitions
interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

interface TouchedFields {
  email: boolean
  password: boolean
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  // const [loginAttempts, setLoginAttempts] = useState(0)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [showLockedModal, setShowLockedModal] = useState(false)
  const [isLocked, _setIsLocked] = useState(false)

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
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    // Check if account is locked
    if (isLocked) {
      setShowLockedModal(true)
      return
    }

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    })

    // Basic format validation only
    const newErrors: FormErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is not valid"
      setErrors(newErrors)
      return
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is not valid"
      setErrors(newErrors)
      return
    }

    if (!formData.password) {
      newErrors.password = "Wrong password. Try again"
      setErrors(newErrors)
      return
    }

    // ============================================================
    // TODO: API INTEGRATION REQUIRED
    // ============================================================
    // Replace this section with actual API call to your authentication endpoint
    //
    // Example API call structure:
    //
    // try {
    //   const response = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       email: formData.email,
    //       password: formData.password
    //     })
    //   })
    //
    //   const data = await response.json()
    //
    //   if (response.ok) {
    //     // Successful login
    //     console.log("Login successful:", data)
    //     setLoginAttempts(0)
    //     // Redirect user to dashboard or store auth token
    //     // Example: router.push('/dashboard')
    //   } else {
    //     // Failed login - increment attempts
    //     const newAttempts = loginAttempts + 1
    //     setLoginAttempts(newAttempts)
    //
    //     // Set error messages based on API response
    //     const authErrors: FormErrors = {}
    //     if (data.field === 'email') {
    //       authErrors.email = data.message || "Email is not valid"
    //     } else {
    //       authErrors.password = data.message || "Wrong password. Try again"
    //     }
    //     setErrors(authErrors)
    //
    //     // Show warning modal after 3 failed attempts
    //     if (newAttempts === 3) {
    //       setShowWarningModal(true)
    //     }
    //     // Lock account after 5 failed attempts
    //     else if (newAttempts >= 5) {
    //       setIsLocked(true)
    //       setShowLockedModal(true)
    //     }
    //   }
    // } catch (error) {
    //   console.error("Login error:", error)
    //   setErrors({ password: "An error occurred. Please try again." })
    // }
    // ============================================================
  }

  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
        {/* School Logo */}
        <div className="mb-8">
          <Image
            src="/assets/images/auth/desktop-school-logo.png"
            alt="StudyBridge Online School Logo"
            width={100}
            height={100}
            className="h-40 w-40"
          />
        </div>

        {/* Main Content */}
        <div className="w-full max-w-md">
          <header className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-semibold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-600">Sign in your account to continue</p>
          </header>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email Address
              </label>
              <div className="mt-2">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="admin@school.edu"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLocked}
                  className={`w-full ${
                    errors.email && touched.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  } ${isLocked ? "cursor-not-allowed opacity-50" : ""}`}
                />
                {errors.email && touched.email && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative mt-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLocked}
                  className={`w-full pr-10 ${
                    errors.password && touched.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  } ${isLocked ? "cursor-not-allowed opacity-50" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <Image
                      src="/assets/images/auth/show-password-icon.png"
                      alt="Hide password"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <Image
                      src="/assets/images/auth/hide-password-icon.png"
                      alt="Show password"
                      width={16}
                      height={16}
                    />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  disabled={isLocked}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 disabled:cursor-not-allowed"
                />
                <label
                  htmlFor="remember-me"
                  className={`ml-2 block text-sm text-gray-900 ${
                    isLocked ? "opacity-50" : ""
                  }`}
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className={`font-medium text-black hover:text-gray-800 ${
                    isLocked ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!formData.email || !formData.password || isLocked}
              className="w-full bg-red-600 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isLocked ? "Account Locked" : "Sign In"}
            </Button>
          </form>
        </div>
      </section>

      {/* Warning Modal - After 3 attempts */}
      <Dialog open={showWarningModal} onOpenChange={setShowWarningModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              <Image
                src="/assets/images/auth/desktop-school-logo.png"
                alt="School Logo"
                width={60}
                height={60}
              />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              Attention
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              You have 5 attempts to enter a correct password before your account is
              locked.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              onClick={() => setShowWarningModal(false)}
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              Try again
            </Button>
            <Button
              onClick={() => {
                setShowWarningModal(false)
                // Navigate to forgot password
              }}
              variant="outline"
              className="w-full border border-red-600 bg-white text-red-600 hover:bg-red-50"
            >
              Forgot Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Locked Out Modal - After 5 attempts */}
      <Dialog open={showLockedModal} onOpenChange={setShowLockedModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              <Image
                src="/assets/images/auth/desktop-school-logo.png"
                alt="School Logo"
                width={60}
                height={60}
              />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              Locked out
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Your account has been locked due to multiple incorrect password attempts.
              You can reset your password now or try again in 01:59:59 hours
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              onClick={() => {
                setShowLockedModal(false)
                // Navigate to forgot password
              }}
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              Forgot Password
            </Button>
            <Button
              onClick={() => setShowLockedModal(false)}
              variant="outline"
              className="w-full border border-red-600 bg-white text-red-600 hover:bg-red-50"
            >
              Sign in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginForm

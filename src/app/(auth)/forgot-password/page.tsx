"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// interface FormData {
//   email: string;
// }

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Email address is required")
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsSubmitted(true)

    // TODO: Call your API to send reset link
    console.log("Sending reset link to:", email)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className=""></div>

      {/* Right Side - Form */}
      <div className="pt-[] flex w-full flex-col items-center justify-center bg-white px-8 sm:px-16 md:pt-0 lg:px-0">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10 flex justify-center lg:justify-center">
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
          </div>

          {/* Title & Description */}

          <h1 className="mb-2 text-center text-3xl font-bold text-[#1A1A1A] md:text-4xl">
            Forgot Password?
          </h1>
          <p className="mb-10 p-2 text-center text-[#1A1A1A]/70">
            Enter your email and we would send you reset
            <br />
            instructions
          </p>

          {/* Success Message */}
          {isSubmitted ? (
            <div className="rounded-lg border border-green-200 bg-green-50 px-6 py-8 text-center text-green-800">
              <p className="text-lg font-medium">Check your email</p>
              <p className="mt-2 text-sm">
                We have sent password reset instructions to <strong>{email}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@school.edu"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError("")
                  }}
                  className={`h-12 text-base ${
                    error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#A3132C] focus:ring-[#A3132C]"
                  }`}
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              {/* Submit Button */}
              {/* this button should go straight to email before redirecting to reset-password, but for the demo, I'm redirecting it straight to reset-password*/}
              <Link href={"/reset-password"}>
                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-[#DA3743] text-lg font-medium text-white transition-all hover:bg-[#8B1126] hover:text-white"
                >
                  Send Reset Link
                </Button>
              </Link>
            </form>
          )}

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

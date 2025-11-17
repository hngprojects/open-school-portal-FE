import React, { useState } from "react"
import { ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCheckWaitlist, useJoinWaitlist } from "../_hooks/use-waitlist"

const WaitlistFormModal: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const email = formData.email
  const fullName = formData.fullName

  // Check if email exists in waitlist
  const {
    data: existsData,
    isLoading: checking,
    error: checkError,
  } = useCheckWaitlist(email)

  // Mutation: Join waitlist
  const joinMutation = useJoinWaitlist()

  // Controlled input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalError(null) // clear local errors
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLocalError(null)

    if (existsData?.exists) {
      setLocalError("This email is already on the waitlist.")
      return
    }

    setIsSubmitting(true)

    try {
      await joinMutation.mutateAsync({ email, fullName })
      setSubmitted(true)

    } catch (err) {
        if (err instanceof Error){
            setLocalError(err?.message || "Something went wrong.")
        }
    }

    setIsSubmitting(false)

    // Reset UI after 2 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ email: "", fullName: "" })
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl p-8 sm:max-w-md">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900">You&apos;re on the list!</h3>
            <p className="text-gray-600">We’ll notify you when we launch.</p>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Secure Your Spot Now
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Get monthly updates, early access to beta testing, and be the first to
                know when we launch.
              </DialogDescription>
            </DialogHeader>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              {/* 🔴 ERROR MESSAGE BEFORE FIRST INPUT */}
              {(localError || checkError) && (
                <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {localError || checkError?.message || "Something went wrong."}
                </p>
              )}

              {checking && <p className="text-sm text-gray-500">Checking email...</p>}

              {existsData?.exists && (
                <p className="text-sm text-red-600">
                  This email is already on the waitlist.
                </p>
              )}

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !email || !fullName || checking}
                className="mt-6 w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Joining...
                  </>
                ) : (
                  <>
                    Join The Waitlist
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default WaitlistFormModal

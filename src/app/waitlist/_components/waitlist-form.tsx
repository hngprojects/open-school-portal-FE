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

const WaitlistFormModal: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
            <h3 className="mb-2 text-2xl font-bold text-gray-900">
              You&apos;re on the list!
            </h3>
            <p className="text-gray-600">We&apos;ll notify you when we launch.</p>
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

            <form className="mt-6 space-y-5">
              {/* Full Name Field */}
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
                  value={formData.fullName}
                  required
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Email Field */}
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.fullName || !formData.email}
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

  async function handleSubmit() {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset after 2 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ fullName: "", email: "" })
      onClose()
    }, 2000)
  }
}

// Demo component to show usage
export default WaitlistFormModal

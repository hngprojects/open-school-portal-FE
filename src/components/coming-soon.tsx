"use client"

import React from "react"
import { Clock, Bell, ArrowLeft } from "lucide-react"

interface ComingSoonProps {
  pageTitle?: string
  message?: string
  showNotifyButton?: boolean
  onBackClick?: (() => void) | null
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  pageTitle = "Coming Soon",
  message = "We're working hard to bring you this feature. Stay tuned!",
  showNotifyButton = true,
  onBackClick = null,
}) => {
  const [email, setEmail] = React.useState<string>("")
  const [subscribed, setSubscribed] = React.useState<boolean>(false)

  const handleNotify = () => {
    if (!email) alert("Please enter your email address.")

    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setEmail("")
        setSubscribed(false)
      }, 3000)
    }
  }

  return (
    <div className="animate-onrender flex min-h-[85vh] items-center justify-center bg-linear-to-b from-gray-50 to-white px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Back Button */}
        {onBackClick && (
          <button
            onClick={onBackClick}
            className="mb-8 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        )}

        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-red-100 opacity-60 blur-2xl"></div>
            <div className="relative rounded-full bg-white p-6 shadow-lg">
              <Clock className="h-16 w-16 text-red-600" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-5xl font-bold text-gray-900">{pageTitle}</h1>

        {/* Message */}
        <p className="mx-auto mb-12 max-w-xl text-xl text-gray-600">{message}</p>

        {/* Notify Form */}
        {showNotifyButton && !subscribed && (
          <div className="mx-auto mb-8 max-w-md">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="flex-1 rounded-full border-2 border-gray-200 px-6 py-3 transition-colors focus:border-red-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={handleNotify}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-red-700"
              >
                <Bell className="h-5 w-5" />
                Notify Me
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {subscribed && (
          <div className="mx-auto mb-8 max-w-md rounded-full border-2 border-green-200 bg-green-50 px-6 py-3">
            <p className="font-semibold text-green-700">
              ✓ Thanks! We&apos;ll notify you when it&apos;s ready.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ComingSoon

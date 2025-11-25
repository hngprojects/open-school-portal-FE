"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DeleteAccountPage() {
  const [confirmed, setConfirmed] = useState(false)
  const [showFinalModal, setShowFinalModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)

    // Simulate API call to delete account
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsDeleting(false)
    setShowFinalModal(false)
    setShowSuccess(true)

    // Optional: Redirect after 3 seconds
    setTimeout(() => {
      //   // In real app: router.push("/logout") or signOut()
      //   console.log("Account deleted. Redirecting to login...");
      router.push("/super-admin/settings")
    }, 1000)
    // }, );
  }

  return (
    <>
      <div className="mx-auto max-w-full rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Delete Account</h1>
        <p className="mb-10 text-gray-600">
          This action will permanently remove the account and all associated data
        </p>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-red-900">Delete Account</h3>
              <p className="text-sm leading-relaxed text-red-700">
                This action will permanently remove the account and all associated data.
                This cannot be undone. Please confirm to proceed.
              </p>

              <div className="mt-6">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-red-900">
                    I understand that this action is permanent and cannot be undone
                  </span>
                </label>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowFinalModal(true)}
                  disabled={!confirmed}
                  className={`flex items-center gap-2 rounded-lg px-8 py-3 font-medium transition ${
                    confirmed
                      ? "bg-red-600 text-white shadow-sm hover:bg-red-700"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-3">What happens when you delete your account?</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Your profile and personal information will be permanently removed</li>
            <li>• All school data, students, and records will be deleted</li>
            <li>• You will lose access to all SchoolBase features</li>
            <li>• This action cannot be reversed</li>
          </ul>
        </div> */}
      </div>

      {/* Final Confirmation Modal */}
      {showFinalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isDeleting && setShowFinalModal(false)}
          />
          <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Delete your account permanently?
              </h3>
              <p className="mb-8 text-gray-600">
                This action <strong>cannot be undone</strong>. All your data will be
                permanently deleted.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowFinalModal(false)}
                disabled={isDeleting}
                className="rounded-lg bg-gray-100 px-8 py-3 font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-70"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-red-700 disabled:opacity-70"
              >
                {isDeleting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete My Account"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL - Account Successfully Deleted */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="animate-in fade-in zoom-in relative mx-4 w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl duration-500">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-gray-900">
                Account Successfully Deleted
              </h3>
              <p className="mb-8 text-lg text-gray-600">
                Your account and all associated data have been permanently removed.
              </p>
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="text-sm text-gray-600">
                  You will be redirected to the login page shortly...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

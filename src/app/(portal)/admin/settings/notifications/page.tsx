"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"

interface Settings {
  inviteNotifications: boolean
  attendanceNotifications: boolean
}

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    inviteNotifications: true,
    attendanceNotifications: false,
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleToggle = (key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsSaving(false)
    setShowSuccessModal(true)
  }

  return (
    <>
      <div className="max-w-full">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Main Content */}
          <main className="flex-1 rounded-xl bg-white p-8 shadow-sm">
            <div className="max-w-full">
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Notification Settings
              </h1>
              <p className="mb-8 text-gray-600">
                Choose how you want to be notified about account activity.
              </p>

              <div className="space-y-10">
                <section className="rounded-xl border border-gray-200 p-6">
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    Email Notifications
                  </h2>
                  <p className="mb-6 text-sm text-gray-600">
                    Receive notifications via email
                  </p>

                  <div className="space-y-8">
                    {/* Invite Notification */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Invite Notification</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Get notified when invites are accepted
                        </p>
                      </div>
                      <Toggle
                        enabled={settings.inviteNotifications}
                        onToggle={() => handleToggle("inviteNotifications")}
                      />
                    </div>

                    {/* Attendance Notification */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Attendance Notification
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Get notified when staff/student marks attendance
                        </p>
                      </div>
                      <Toggle
                        enabled={settings.attendanceNotifications}
                        onToggle={() => handleToggle("attendanceNotifications")}
                      />
                    </div>
                  </div>
                </section>
              </div>

              {/* Save Button */}
              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving && <i className="fas fa-spinner fa-spin"></i>}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Success Modal - Same as Profile Page */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          />
          <div className="animate-in fade-in zoom-in relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl duration-300">
            <div className="text-center">
              <div className="relative mx-auto h-20 w-20">
                <div className="absolute inset-0 animate-ping">
                  <CheckCircle className="h-20 w-20 text-green-500 opacity-70" />
                </div>
                <CheckCircle className="relative h-20 w-20 text-green-500" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-gray-900">Success!</h3>
              <p className="mt-3 text-gray-600">
                Your notification settings have been saved.
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="rounded-lg bg-red-600 px-8 py-3 font-medium text-white transition hover:bg-red-700"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Beautiful Toggle Switch Component
function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${
        enabled ? "bg-red-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  )
}

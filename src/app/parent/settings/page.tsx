"use client"

import { Upload } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function SchoolInformationForm() {
  const [logo, setLogo] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const [errors, setErrors] = useState<FormErrors>({})

  type FormErrors = {
    logo?: string
    schoolName?: string
    phone?: string
    color?: string
    address?: string
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // -------------------------
  // VALIDATION + SUBMIT
  // -------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const schoolName = (
      form.elements.namedItem("schoolName") as HTMLInputElement
    ).value.trim()
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim()
    const color = (form.elements.namedItem("brandColor") as HTMLInputElement).value.trim()
    const address = (form.elements.namedItem("address") as HTMLInputElement).value.trim()

    const newErrors: FormErrors = {}

    if (!logo) newErrors.logo = "School logo is required."
    if (!schoolName) newErrors.schoolName = "School name is required."
    if (!phone) newErrors.phone = "Phone number is required."
    if (!color) newErrors.color = "Brand color is required."
    if (!address) newErrors.address = "Address is required."

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setShowModal(true)
    }
  }

  return (
    <>
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-sm rounded-xl bg-white p-8 text-center shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Success!</h3>
            <p className="mt-2 text-sm text-gray-600">
              School information has been successfully saved.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full rounded-lg bg-[#D33F45] px-4 py-2.5 font-medium text-white hover:bg-[#c02d3f]"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-5xl rounded-2xl bg-white"
      >
        <div className="">
          <div className="border-gray-200 pb-8">
            <h2 className="text-2xl font-semibold text-gray-900">School Information</h2>
            <p className="mt-2 text-sm text-gray-600">Manage your School information.</p>
          </div>

          <div className="rounded-xl p-8 shadow lg:p-8">
            <div className="">
              <h3 className="text-lg font-medium text-gray-900">School Logo</h3>
              <p className="mt-1 text-sm text-gray-600">Update your School logo</p>

              <div className="mt-6 flex flex-col items-start gap-10 sm:flex-row sm:items-center">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
                  {logo ? (
                    <Image
                      src={logo}
                      alt="School logo"
                      width={112}
                      height={112}
                      className="object-contain"
                    />
                  ) : (
                    <svg
                      className="h-12 w-12 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5C3.89 3 3 3.9 3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-8-3 3.5L9 12l-4 5h14l6-6z" />
                    </svg>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-400 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 rounded-full" />
                    Change photo
                  </label>
                  <input
                    id="logo-upload"
                    placeholder="upload photo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />

                  {errors.logo && (
                    <p className="mt-2 text-xs text-red-600">{errors.logo}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl p-8 shadow lg:p-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-600">
                Manage your personal information
              </p>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* School Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School Name
                  </label>
                  <input
                    name="schoolName"
                    placeholder="Enter School name"
                    type="text"
                    defaultValue=""
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  {errors.schoolName && (
                    <p className="mt-1 text-xs text-red-600">{errors.schoolName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School Phone NO.
                  </label>
                  <div className="mt-2 flex rounded-lg shadow-sm">
                    <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-4 text-sm text-gray-500">
                      +234
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Enter Phone Number"
                      defaultValue=""
                      className="block flex-1 rounded-r-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Primary Brand Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Brand Color <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="relative flex-1">
                      <div className="flex gap-5">
                        <input
                          type="color"
                          name="brandColor"
                          placeholder="Enter Brand Color (#D33F45)"
                          defaultValue="#D33F45"
                          className="h-11 w-20 cursor-pointer rounded-lg border border-gray-300"
                        />
                        <input
                          type="text"
                          placeholder=" #D33F45"
                          defaultValue=""
                          className="block w-[200px] rounded-lg border border-gray-300 px-4 py-2.5 pr-14 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  {errors.color && (
                    <p className="mt-1 text-xs text-red-600">{errors.color}</p>
                  )}

                  <p className="mt-2 text-xs text-gray-500">
                    This color will be used throughout your portal interface
                  </p>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School Address
                  </label>
                  <input
                    name="address"
                    placeholder="Enter School Address"
                    type="text"
                    defaultValue=""
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-12 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-[#D33F45] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c02d3f]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

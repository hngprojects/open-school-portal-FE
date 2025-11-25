"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function ProfileSettings() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profileImage, setProfileImage] = useState<string>("/diverse-profile-avatars.png")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    countryCode: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result
        if (typeof result === "string") {
          setProfileImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSave = () => {
    console.log("Saving profile:", formData)
  }

  return (
    <div className="flex-1">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground text-2xl font-bold md:text-3xl">
            Profile Settings
          </h1>
          <p className="text-foreground/70 mt-2">
            Manage your School and personal information.
          </p>
        </div>

        {/* Profile Photo Section */}
        <Card className="mb-8 p-6">
          <h2 className="text-foreground mb-2 text-lg font-semibold">Profile Photo</h2>
          <p className="text-foreground/70 mb-6 text-sm">Update your profile picture</p>

          <div className="flex flex-col items-center gap-6 md:flex-row">
            <Avatar className="h-24 w-24 shrink-0">
              <AvatarImage src={profileImage || "/placeholder.svg"} />
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Upload profile image"
              />
              <Button
                onClick={triggerFileInput}
                className="text-foreground border bg-transparent"
              >
                Change photo
              </Button>
            </div>
          </div>
        </Card>

        {/* Personal Information Section */}
        <Card className="p-6">
          <h2 className="text-foreground mb-2 text-lg font-semibold">
            Personal Information
          </h2>
          <p className="text-foreground/70 mb-6 text-sm">
            Manage your personal information
          </p>

          <form className="space-y-6">
            {/* Name Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-muted"
                  placeholder="Enter First Name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-muted"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>

            {/* Email and Phone Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-muted"
                  placeholder="Enter Email"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  Phone NO.
                </label>
                <div className="flex gap-2">
                  <div className="relative shrink-0">
                    <select
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, countryCode: e.target.value }))
                      }
                      className="border-input bg-muted text-foreground h-10 appearance-none rounded-md border px-3 py-2 pr-8 text-sm"
                    >
                      <option value="+234">+234</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+91">+91</option>
                    </select>
                    <div className="text-foreground/70 pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
                      ▼
                    </div>
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-muted flex-1"
                    placeholder="Enter Phone Number"
                  />
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div>
              <label
                htmlFor="address"
                className="text-foreground mb-2 block text-sm font-medium"
              >
                Address
              </label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="bg-muted"
                placeholder="Enter Address"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSave}
                className="bg-red-600 px-8 font-medium text-white hover:bg-red-700"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

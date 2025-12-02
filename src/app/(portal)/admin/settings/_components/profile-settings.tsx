"use client"

import { useState, useEffect } from "react"
import { useGetUser } from "@/hooks/use-user-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { UserProfileResponse } from "@/types/auth"

interface ExtendedUser extends UserProfileResponse {
  address?: string
  avatar_url?: string
}

export const ProfileSettings = () => {
  const { data: user, isLoading } = useGetUser()
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    if (user) {
      const extendedUser = user as ExtendedUser
      setFormData({
        firstName: user.first_name || "",
        middleName: user.middle_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: extendedUser.address || "",
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Profile updated successfully")
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    )
  }

  const extendedUser = user as ExtendedUser | undefined

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your School and personal information.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="border-border h-20 w-20 border-2">
              <AvatarImage src={extendedUser?.avatar_url} />
              <AvatarFallback className="bg-muted text-xl">
                {user?.first_name?.[0]}
                {user?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="bg-white">
              Change photo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="bg-muted text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone NO.</Label>
                <div className="flex">
                  <span className="border-input bg-muted text-muted-foreground inline-flex items-center rounded-l-md border border-r-0 px-3 text-sm">
                    +234
                  </span>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-l-none"
                    placeholder="8123456789"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="5 Ajayi Close Ikeja, Lagos."
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 min-w-[150px] text-white"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

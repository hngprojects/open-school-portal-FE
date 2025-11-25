"use client"

import { useParams, useRouter } from "next/navigation"
import { UpdateParentData } from "@/lib/parents"
import { NewPersonFormBuilder } from "@/app/(portal)/admin/_components/add-new-person-form-template"
import { ArrowLeftIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useGetParent, useUpdateParent } from "../_hooks/use-parents"
import { parentFormConfig } from "../new/components/new-parent-form"

export default function EditParentPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: parent, isLoading, isError, error } = useGetParent(id as string)
  const updateParentMutation = useUpdateParent(id as string)

  async function handleCancel() {
    router.push("/admin/parents")
  }

  async function handleSubmit(formData: Record<string, unknown>) {
    if (!id) return

    try {
      const updateData: UpdateParentData = {
        first_name: formData.first_name as string,
        last_name: formData.last_name as string,
        middle_name: formData.middle_name as string,
        email: formData.email as string,
        gender: formData.gender as string,
        phone: formData.phone as string,
        date_of_birth: formData.date_of_birth as string,
        home_address: formData.home_address as string,
        photo_url: formData.photo_url as string,
      }

      await updateParentMutation.mutateAsync(updateData)
      setTimeout(() => {
        router.push("/admin/parents")
      }, 300)
    } catch (err) {
      throw err
    }
  }

  if (isLoading) {
    return (
      <div className="mb-10 w-full space-y-8 bg-white p-4 md:p-10">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />
            <p className="text-gray-600">Loading parent details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !parent) {
    return (
      <div className="mb-10 w-full space-y-8 bg-white p-4 md:p-10">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              {error?.message || "Parent Not Found"}
            </h2>
            <p className="mb-6 text-gray-600">
              {error?.message || "The parent you're looking for doesn't exist."}
            </p>
            <Button asChild>
              <Link href="/admin/parents">Back to Parents</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const initialData = {
    first_name: parent.first_name,
    last_name: parent.last_name,
    middle_name: parent.middle_name || "",
    email: parent.email,
    gender: parent.gender,
    phone: parent.phone,
    date_of_birth: parent.date_of_birth,
    home_address: parent.home_address,
    photo_url: parent.photo_url || "",
  }

  return (
    <div className="mb-10 w-full space-y-8 bg-white p-4 md:p-10">
      <div>
        <div className="mb-4 md:mb-0 md:hidden">
          <Button
            asChild
            variant="ghost"
            className="bg-gray-100 hover:bg-gray-200"
            size="icon"
          >
            <Link href="/admin/parents">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <h1 className="mb-2 text-xl font-bold text-gray-900">Edit Parent</h1>
        <p className="text-gray-600">Update parent details.</p>
      </div>
      <div className="md:px-8">
        <NewPersonFormBuilder
          config={parentFormConfig}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={initialData}
        />
      </div>
    </div>
  )
}

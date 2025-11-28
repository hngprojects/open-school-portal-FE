"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
})

type FormData = z.infer<typeof schema>

export default function SqueezePage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    localStorage.setItem("contactData", JSON.stringify(data))
    toast.success("Access granted!")
    router.push("/resources/thank-you") // or wherever you want
  }

  return (
    <div className="w-full bg-[#faf7f2]">
      {/* top bar */}
      <div className="bg-accent w-full py-2 text-center text-sm text-white">
        Thanking you! Here’s a <span className="font-semibold">freebie</span> to make
        running your school smarter.
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2">
        {/* TEXT SECTION */}
        <div>
          <h1 className="text-4xl leading-tight font-bold md:text-5xl">
            How Would You Like to <span className="text-yellow-600">Manage</span>
            <br />
            Your School Smarter?
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Learn a system that helps schools cut chaos, reduce admin overload, and
            finally run operations with clarity and ease.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-sm space-y-4">
            <div>
              <Label htmlFor="fullName">Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your name"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-accent/80 w-full py-6 text-lg"
              disabled={isSubmitting}
            >
              YES, I WANT ACCESS NOW!
            </Button>
          </form>

          <div className="mt-5 flex gap-4 text-sm font-medium text-gray-700">
            <span>Parent Communication, Simplified </span>

            <span>Attendance That Just Works Fast</span>
            <span>Foolproof Grading</span>
          </div>
        </div>

        {/* IMAGES SECTION */}
        <div className="flex justify-center">
          <Image
            src="/assets/phone-x-phone.png"
            alt="Squeeze preview"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

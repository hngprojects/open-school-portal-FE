"use client"

import React from "react"
import { useRouter } from "next/navigation"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const CreateSessionForm = () => {
  const router = useRouter()

  return (
    <section className="bg-[#FAFAFA] px-2 pt-4 pb-10 lg:px-4">
      <DashboardTitle heading="Create Session" description="Create academic session" />

      <form>
        <section className="my-8 space-y-7">
          {/* academic year */}
          <div>
            <Label>Academic Session</Label>
            <Input placeholder="e.g 2025/2026" />
          </div>

          {/* first term start and term end */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* first term start */}
            <div>
              <Label htmlFor="firstTermStart">
                First Term Start Date <span>*</span>
              </Label>
              <Input
                id="firstTermStart"
                name="firstTermStart"
                placeholder="Select a date"
                type="date"
              />
            </div>

            {/* first term end */}
            <div>
              <Label htmlFor="firstTermEnd">
                First Term End Date <span>*</span>
              </Label>
              <Input
                id="firstTermEnd"
                name="firstTermEnd"
                placeholder="Select a date"
                type="date"
              />
            </div>
          </div>

          {/* second term start and term end */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* second term start */}
            <div>
              <Label htmlFor="secondTermStart">
                Second Term Start Date <span>*</span>
              </Label>
              <Input
                id="secondTermStart"
                name="secondTermStart"
                placeholder="Select a date"
                type="date"
              />
            </div>

            {/* second term end */}
            <div>
              <Label htmlFor="secondTermEnd">
                Second Term End Date <span>*</span>
              </Label>
              <Input
                id="secondTermEnd"
                name="secondTermEnd"
                placeholder="Select a date"
                type="date"
              />
            </div>
          </div>

          {/* third term start and term end */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* third term start */}
            <div>
              <Label htmlFor="thirdTermStart">
                Third Term Start Date <span>*</span>
              </Label>
              <Input
                id="thirdTermStart"
                name="thirdTermStart"
                placeholder="Select a date"
                type="date"
              />
            </div>

            {/* third term end */}
            <div>
              <Label htmlFor="thirdTermEnd">
                Third Term End Date <span>*</span>
              </Label>
              <Input
                id="thirdTermEnd"
                name="thirdTermEnd"
                placeholder="Select a date"
                type="date"
              />
            </div>
          </div>

          {/* description */}
          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="e.g Details about this academic year"
              className="min-h-[124px]"
            />
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/class-management/session")}
          >
            Cancel
          </Button>
          <Button type="button">Save</Button>
        </div>
      </form>
    </section>
  )
}

export default CreateSessionForm

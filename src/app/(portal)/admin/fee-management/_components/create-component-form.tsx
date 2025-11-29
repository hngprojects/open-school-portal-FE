"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useState } from "react"

const CreateComponentForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // TODO: hook up API request
    setTimeout(() => {
      setLoading(false)
      onSuccess()
    }, 800)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col justify-between gap-[11px]"
    >
      <section className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="componentName" className="text-sm leading-none text-[#3E3E3E]">
            Component Name
          </Label>
          <Input
            id="componentName"
            placeholder="E.g Lab Fee"
            className="text-sm placeholder:text-[#737373]"
          />
        </div>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first">First Term</SelectItem>
            <SelectItem value="second">Second Term</SelectItem>
            <SelectItem value="third">Third Term</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jss1">JSS1</SelectItem>
            <SelectItem value="jss2">JSS2</SelectItem>
            <SelectItem value="sss1">SSS1</SelectItem>
          </SelectContent>
        </Select>

        <div className="space-y-2">
          <Label
            htmlFor="componentAmount"
            className="text-sm leading-none text-[#3E3E3E]"
          >
            Amount
          </Label>
          <Input id="componentAmount" placeholder="Amount" />
        </div>
      </section>
      <div className="grid grid-cols-2 gap-2">
        <Button
          size="lg"
          variant="outline"
          type="button"
          onClick={onSuccess}
          className="border-primary/30 text-primary bg-[#F3F4F6]text-sm"
        >
          Cancel
        </Button>
        <Button size="lg" type="submit" disabled={loading} className="text-sm">
          {loading ? "Saving..." : "Create Component"}
        </Button>
      </div>
    </form>
  )
}

export default CreateComponentForm

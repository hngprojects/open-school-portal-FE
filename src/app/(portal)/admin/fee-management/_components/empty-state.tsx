import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { RiFolderOpenLine } from "react-icons/ri"

const EmptyState = () => {
  return (
    <section className="flex min-h-[500px] flex-col items-center justify-center gap-6">
      <div className="bg-accent/10 flex h-[140px] w-[140px] items-center justify-center rounded-full">
        <RiFolderOpenLine className="text-accent size-16" />
      </div>
      <div className="space-y-2">
        <h4 className="text-center text-xl font-semibold text-[#101828]">
          Your Fee Component Will Appear Here
        </h4>
        <p className="text-text-secondary max-w-[55ch] text-center leading-6">
          Get Started by creating a new fee component to organize your school’s fee
          structure
        </p>
      </div>
      <Button asChild>
        <Link
          href="/admin/fee-management/create-component"
          className="flex items-center gap-2"
        >
          <Plus className="size-4" />
          <span>Create Your First Component</span>
        </Link>
      </Button>
    </section>
  )
}

export default EmptyState

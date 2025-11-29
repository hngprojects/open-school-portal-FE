"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import CreateComponentDrawer from "./create-component-drawer"

const CreateComponentButton = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <Plus className="size-4" />
        {children ?? "Create Component"}
      </Button>

      <CreateComponentDrawer open={open} onOpenChange={setOpen} />
    </>
  )
}

export default CreateComponentButton

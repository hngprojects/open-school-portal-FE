"use client"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

import CreateComponentForm from "./create-component-form"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CreateComponentDrawer = ({ open, onOpenChange }: Props) => {
  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="">
        <DrawerHeader className="px-0!">
          <DrawerTitle className="border-b px-5 pb-5 text-2xl font-normal text-[#313131]">
            Add Fee Component
          </DrawerTitle>
        </DrawerHeader>

        <div className="h-full px-4 pb-6">
          <CreateComponentForm onSuccess={() => onOpenChange(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CreateComponentDrawer

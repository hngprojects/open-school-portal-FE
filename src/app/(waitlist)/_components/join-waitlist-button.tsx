"use client"

import { useState } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import WaitlistFormModal from "./waitlist-form"
import { ArrowRightIcon } from "lucide-react"

const queryClient = new QueryClient()

interface JoinWaitlistButtonProps {
  label?: string
  showArrow?: boolean
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive"
}

const JoinWaitlistButton = ({
  label = "Join the Waitlist",
  showArrow = false,
  className = "",
  variant = "default",
}: JoinWaitlistButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <Button variant={variant} className={className} onClick={() => setIsOpen(true)}>
        {label}
        {showArrow && <ArrowRightIcon className="ml-2 h-5 w-5" />}
      </Button>

      <WaitlistFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </QueryClientProvider>
  )
}

export default JoinWaitlistButton

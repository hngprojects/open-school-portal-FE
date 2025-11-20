import React from "react"
import { Loader } from "lucide-react"

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Loader className="size-16 animate-spin" />
    </div>
  )
}

export default Loading

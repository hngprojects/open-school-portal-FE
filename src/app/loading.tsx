import React from "react"
import { Loader } from "lucide-react"
import { GeneralQueryProvider } from "@/providers/general-query-provider"

const Loading = () => {
  return (
    <GeneralQueryProvider>
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FEF9FA]/70">
      <Loader className="size-16 animate-spin" />
    </div>
    </GeneralQueryProvider>
  )
}

export default Loading

import React from "react"
import { GeneralQueryProvider } from "@/providers/general-query-provider"

export default function Parentlayout({ children }: { children: React.ReactNode }) {
  return <GeneralQueryProvider>{children} </GeneralQueryProvider>
}

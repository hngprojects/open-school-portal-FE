import React from "react"
import { GeneralQueryProvider } from "@/providers/general-query-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TeacherSidebar } from "@/components/dashboard/teacher-sidebar"
import DashboardHeader from "@/components/dashboard/dashboard-header"

export default function Teacherlayout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralQueryProvider>
      <SidebarProvider>
        <TeacherSidebar />
        <main className="w-full pt-16">
          <DashboardHeader />
          {children}
        </main>
      </SidebarProvider>
    </GeneralQueryProvider>
  )
}

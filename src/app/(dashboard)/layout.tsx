import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/app-sidebar"
import DashboardHeader from "./_components/dashboard-header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="mt-[72px] h-full w-full">
        <DashboardHeader />

        {children}
      </main>
    </SidebarProvider>
  )
}

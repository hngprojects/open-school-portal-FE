import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ParentSidebar } from "@/components/dashboard/parent-sidebar"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { GeneralQueryProvider } from "@/providers/general-query-provider"

export const metadata: Metadata = {
  title: "Parent Dashboard | School Base",
  description:
    "Track student progress, attendance, payments, and communication in School Base.",
}

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralQueryProvider>
      <SidebarProvider>
        <ParentSidebar />
        <main className="mt-[72px] h-full w-full">
          <DashboardHeader />
          {children}
        </main>
      </SidebarProvider>
    </GeneralQueryProvider>
  )
}

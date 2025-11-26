import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SuperAdminSidebar } from "./_components/super-admin-sidebar"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { GeneralQueryProvider } from "@/providers/general-query-provider"

export const metadata: Metadata = {
  title: "Super Admin Dashboard | School Base",
  description:
    "Oversee multiple schools, onboard teams, and manage platform-wide settings within School Base.",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralQueryProvider>
      <SidebarProvider>
        <SuperAdminSidebar />
        <main className="mt-[72px] h-full w-full">
          <DashboardHeader />
          {children}
        </main>
      </SidebarProvider>
    </GeneralQueryProvider>
  )
}

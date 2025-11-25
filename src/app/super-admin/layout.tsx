import { SidebarProvider } from "@/components/ui/sidebar"
import { SuperAdminSidebar } from "../../components/dashboard/super-admin-sidebar"
import DashboardHeader from "../../components/dashboard/dashboard-header"
import { GeneralQueryProvider } from "@/providers/general-query-provider"

export const metadata = {
  title: " Super Admin Dashboard",
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

import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "./_components/admin-sidebar"
import DashboardHeader from "./_components/dashboard-header"
import { GeneralQueryProvider } from "@/providers/general-query-provider"

export const metadata = {
  title: "Admin Dashboard",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralQueryProvider>
      <SidebarProvider>
        <AdminSidebar />
        <main className="mt-[72px] h-full w-full">
          <DashboardHeader />
          {children}
        </main>
      </SidebarProvider>
    </GeneralQueryProvider>
  )
}
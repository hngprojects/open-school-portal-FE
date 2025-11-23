import { SidebarProvider } from "@/components/ui/sidebar"
import { ParentSidebar } from "./_components/parent-sidebar"
import DashboardHeader from "../../components/dashboard/dashboard-header"
import { GeneralQueryProvider } from "@/providers/general-query-provider"

export const metadata = {
  title: "Parent Dashboard",
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

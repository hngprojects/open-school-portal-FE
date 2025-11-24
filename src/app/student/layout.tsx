import { SidebarProvider } from "@/components/ui/sidebar"
import { StudentSidebar } from "@/components/dashboard/student-sidebar"
import DashboardHeader from "../../components/dashboard/dashboard-header"
import { GeneralQueryProvider } from "@/providers/general-query-provider"

export const metadata = {
  title: "Student Dashboard",
}

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralQueryProvider>
      <SidebarProvider>
        <StudentSidebar />
        <main className="mt-[72px] h-full w-full">
          <DashboardHeader />
          {children}
        </main>
      </SidebarProvider>
    </GeneralQueryProvider>
  )
}

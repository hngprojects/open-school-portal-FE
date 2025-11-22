import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "./_components/admin-sidebar"
// import Topbar from "./_components/my-top-bar"
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

// import { AdminQueryProvider } from "@/providers/admin-query-provider"
// // import Sidebar from "./_components/my-dummy-sidebar"
// import { AppSidebar } from "./_components/app-sidebar"
// import Topbar from "./_components/my-top-bar"

// export const metadata = {
//   title: "Admin Dashboard",
// }

// export default function WaitlistLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <AdminQueryProvider>
//       <div className="grid h-screen w-screen grid-cols-[0fr_5fr] grid-rows-[64px_auto] overflow-hidden md:grid-cols-[1fr_5fr]">
//         <div className="relative row-span-2 border-r bg-white">
//           <AppSidebar />
//         </div>
//         <header className="border-b bg-white">
//           <Topbar />
//         </header>

//         {/* Main content */}
//         <main className="h-full overflow-y-auto bg-gray-50">{children}</main>
//       </div>
//     </AdminQueryProvider>
//   )
// }

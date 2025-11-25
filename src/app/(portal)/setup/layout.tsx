import { GeneralQueryProvider } from "@/providers/general-query-provider"

export const metadata = {
  title: "Super Admin Setup",
}

export default function SuperAdminSetuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GeneralQueryProvider>
      <div className="h-screen w-screen overflow-x-hidden bg-white">{children}</div>
    </GeneralQueryProvider>
  )
}

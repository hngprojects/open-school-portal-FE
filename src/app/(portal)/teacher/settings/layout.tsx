// app/super-admin/settings/layout.tsx
import SettingsSidebar from "./settings-sidebar"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7x mx-auto px-5 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar – stays forever */}
          <div className="lg:col-span-1">
            <SettingsSidebar />
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}

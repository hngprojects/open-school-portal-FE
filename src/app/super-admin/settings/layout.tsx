// // app/dashboard/settings/layout.tsx
// import { SettingsNav } from "./settingsNav";

// export default function SettingsLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex">
//       <SettingsNav />

//       {/* Main content starts after fixed sidebar */}
//       <div className="flex-1 ml-80 min-h-screen bg-white">
//         <div className="p-8">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// // app/dashboard/settings/layout.tsx
// import { SettingsNav } from "./settingsNav";

// export default function SettingsLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-gray-50">

//       <div className="flex">
//         {/* Desktop Sidebar */}
//         <div className="hidden lg:block">
//           <SettingsNav />
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 lg:ml-70">
//           <div className="p-6 lg:p-8 max-w-5xl mx-auto w-full">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { SettingsNav } from "./settingsNav"
import MobileMoreSettings from "./MobileMoreSettings"
export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="fixed left-0 z-10 hidden lg:block">
        <SettingsNav />
      </div>

      {/* Main Content */}
      <main className="lg:ml-70">
        <div className="mx-auto w-full max-w-5xl p-6 lg:p-8">
          {/* Mobile: Show "More Settings" card at the top */}
          <div className="mb-8 lg:hidden">
            <MobileMoreSettings />
          </div>

          {children}
        </div>
      </main>
    </div>
  )
}

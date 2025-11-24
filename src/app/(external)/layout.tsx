// app/(external)/layout.tsx

import FooterWrapper from "@/components/footer-wrapper"
import NavBarWrapper from "@/components/navbar-wrapper"
export default function ExternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarWrapper />
      <main className="pt-16 md:pt-22 lg:pt-24">{children}</main>
      <FooterWrapper /> {/* Handles client-side detection */}
    </>
  )
}

// import Footer from "@/components/Footer"
// import Navbar from "@/components/Navbar"

// export default function ExternalLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <>
//       <Navbar />
//       <main className="pt-16 md:pt-22 lg:pt-24">{children}</main>
//       <Footer />
//     </>
//   )
// }

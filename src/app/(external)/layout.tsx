// app/(external)/layout.tsx

import Footer from "@/components/Footer"
import FooterWrapper from "@/components/footer-wrapper"
import NavBarWrapper from "@/components/navbar-wrapper"
export default function ExternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarWrapper />
      <main className="pt-16 md:pt-22 lg:pt-26">{children}</main>
      <Footer />
    </>
  )
}

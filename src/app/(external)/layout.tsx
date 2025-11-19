import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function ExternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-22 lg:pt-28">{children}</main>
      <Footer />
    </>
  )
}

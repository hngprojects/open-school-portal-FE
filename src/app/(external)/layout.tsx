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
      <main className="pt-16 md:pt-22 lg:pt-24">{children}</main>
      <Footer />
    </>
  )
}

import { WaitlistProvider } from "@/providers/waitlist-provider"
import Footer from "./_components/waitlist-footer"
import Navbar from "./_components/waitlist-navbar"

export const metadata = {
  title: "Waitlist",
}

export default function WaitlistLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <WaitlistProvider>
      <Navbar />
      <main className="bg-[#F5F5F5] px-0 pt-20 md:pt-22 lg:pt-28">{children}</main>
      <Footer />
    </WaitlistProvider>
  )
}

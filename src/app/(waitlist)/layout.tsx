import { WaitlistProvider } from "@/providers/waitlist-provider"
import WaitListFooter from "./_components/waitlist-footer"
import WaitlistNavbar from "./_components/waitlist-navbar"

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
      <WaitlistNavbar />
      <main className="bg-[#F5F5F5] px-0 pt-20 md:pt-22">{children}</main>
      <WaitListFooter />
    </WaitlistProvider>
  )
}

import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar"

export const metadata = {
  title: "Waitlist",
};

export default function ExternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-22 lg:pt-28 bg-[#F5F5F5]">{children}</main>
      <Footer />
    </>
  )
}

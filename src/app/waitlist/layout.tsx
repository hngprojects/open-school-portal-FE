import Footer from "./_components/waitlist-footer";

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
      <main className="pt-20 md:pt-22 lg:pt-28 bg-[#F5F5F5] px-0">{children}</main>
      <Footer />
    </>
  )
}

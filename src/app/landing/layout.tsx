
export default function ExternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <main className="pt-20 md:pt-22 lg:pt-28">{children}</main>
    </>
  )
}
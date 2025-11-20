import Image from "next/image"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="h-screen w-full overflow-hidden lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full w-full lg:top-0 lg:flex">
        <Image
          src={"/assets/images/auth/sign-up-image.png"}
          alt="A science teacher guiding a group of students in maroon school uniforms as they examine samples using a microscope and test tubes in a well-lit laboratory."
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="scrollbar-hide overflow-y-auto">{children}</div>
    </main>
  )
}

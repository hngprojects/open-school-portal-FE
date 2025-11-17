import Image from "next/image"
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <main className="flex gap-4 overflow-y-hidden">
        <div className="flex flex-1 max-lg:hidden lg:sticky lg:top-0 lg:h-screen">
          <Image
            className="max-h-[913px] w-full max-w-[723px] items-end object-cover"
            src={"/assets/images/auth/sign-up-image.png"}
            alt=""
            width={723}
            height={919}
          />
        </div>
        {children}
      </main>
    </>
  )
}

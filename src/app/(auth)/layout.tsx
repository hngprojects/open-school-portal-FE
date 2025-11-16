import Image from "next/image"
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <>
       <main className="flex gap-4 overflow-y-hidden">
       <div className="max-lg:hidden flex-1 flex lg:sticky lg:top-0 lg:h-screen">
              <Image 
                className="w-full max-w-[723px] object-cover max-h-[913px] items-end" 
                src={'/assets/images/auth/sign-up-image.png'} 
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

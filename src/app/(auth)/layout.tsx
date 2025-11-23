import { AuthQueryProvider } from "@/providers/auth-query-provider"
import Image from "next/image"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthQueryProvider>
      <div className="relative h-screen w-full lg:hidden">
        <Image
          src="/assets/images/auth/sign-up-image.png"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <main className="absolute inset-0 h-screen w-full overflow-hidden lg:grid lg:grid-cols-2">
        <div className="relative hidden h-full w-full lg:flex">
          <Image
            src="/assets/images/auth/sign-up-image.png"
            alt="A science teacher guiding students"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="scrollbar-hide flex h-full w-full overflow-y-auto px-4 py-8 sm:px-8 lg:items-center lg:justify-center lg:px-16">
          <div className="w-full rounded-xl bg-white p-6 shadow-sm lg:max-w-[556px] lg:shadow-none">
            {children}
          </div>
        </div>
      </main>
    </AuthQueryProvider>
  )
}

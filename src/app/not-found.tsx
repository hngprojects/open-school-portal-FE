import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FEF9FA] px-4">
      <div className="container flex max-w-2xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-text-primary text-6xl font-bold md:text-8xl">404</h1>
          <h2 className="text-text-primary text-2xl font-semibold md:text-3xl">
            Page Not Found
          </h2>
          <p className="text-text-secondary text-lg md:text-xl">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 size-5" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

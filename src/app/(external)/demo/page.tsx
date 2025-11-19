import React from "react"
import Link from "next/link"

const page = () => {
  return (
    <div className="animate-onrender flex min-h-[85vh] items-center justify-center bg-gray-50 p-8">
      <div className="text-center">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          This Demo is coming Soon
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/feature"
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            View Feature Page
          </Link>
          <Link
            href="/modules"
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            View Modules Page
          </Link>
          <Link
            href="/about"
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            View About Page
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page

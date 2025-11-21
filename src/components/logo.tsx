import React from "react"
import Image from "next/image"

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative h-8 w-12 overflow-hidden">
        <Image
          src="/assets/school-folio.svg"
          alt="Open School Portal Logo"
          // fill
          width={80}
          height={80}
          priority
          // sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
          className="-mt-2 size-12 object-cover md:size-14 lg:size-16"
        />
      </div>
      <span className="text-accent -mt-2 -ml-2.5 text-sm font-bold tracking-wider uppercase md:text-base lg:mt-2">
        schoolfolio
      </span>
    </div>
  )
}

export default Logo

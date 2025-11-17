import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from "react"

const HomeHero = () => {
  return (
    <section className="w-full bg-[radial-gradient(111.43%_483.25%_at_21.75%_50.07%,#FEFBFB_0%,#FFF4F4_30%,#FDECED_100%)] pt-16 pb-10 sm:pt-20 sm:pb-14 md:pt-32 md:pb-0">
      <div className="container flex flex-col items-center gap-6 text-center sm:gap-8 md:gap-10">
        <div className="flex w-full max-w-xl flex-col gap-3 sm:gap-4 md:max-w-4xl md:gap-6">
          <h1 className="text-text-primary text-4xl leading-tight font-bold sm:text-5xl md:text-6xl md:leading-tight">
            The Modern Way Schools Run in Nigeria
          </h1>
          <p className="text-text-secondary text-base leading-7 sm:text-lg sm:leading-8 md:text-xl md:leading-8">
            Manage attendance, results, timetables, fees, and NFC, all in one place
          </p>
        </div>

        <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-3 sm:max-w-lg sm:gap-6 md:max-w-2xl">
          <Button className="min-w-[140px] flex-1 sm:min-w-[180px] lg:w-auto lg:flex-none">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="min-w-[140px] flex-1 sm:min-w-[180px] lg:w-auto lg:flex-none"
          >
            Watch Demo
          </Button>
        </div>

        <div className="w-full px-4 sm:px-0">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white shadow-none sm:max-w-3xl sm:shadow-none md:max-w-5xl md:rounded-[32px] md:border-0 md:shadow-none lg:max-w-6xl lg:rounded-[36px]">
            <Image
              src="/assets/Hero-img (2).png"
              alt="Open School Portal dashboard preview"
              width={1440}
              height={820}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero

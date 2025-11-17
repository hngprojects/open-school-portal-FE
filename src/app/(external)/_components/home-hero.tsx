import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from "react"

const HomeHero = () => {
  return (
    <div
      className="flex w-full py-6 md:py-8 lg:py-10"
      style={{
        background:
          "radial-gradient(111.43% 483.25% at 21.75% 50.07%, #FEFBFB 0%, #FFF4F4 30%,  #FDECED 100%)",
      }}
    >
      <div className="container flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
        <section className="flex w-full max-w-139 flex-col gap-6 py-4 text-center md:gap-8 md:py-6 md:text-left lg:gap-11 lg:py-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="text-text-primary text-3xl leading-tight font-bold md:text-4xl md:leading-tight lg:text-6xl lg:leading-21">
              The Modern Way Schools Run in Nigeria
            </h1>
            <p className="text-text-secondary text-base leading-7 md:text-xl md:leading-8 lg:max-w-132 lg:text-2xl lg:leading-9.5">
              Manage attendance, results, timetables, fees, and NFC, all in one place
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6 md:justify-start">
            <Button className="w-full sm:w-auto">Get Started</Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </section>
        <div className="flex justify-center lg:flex-1 lg:justify-end">
          <Image
            src="/assets/desktop-x-phone.png"
            alt="Hero Image"
            width={744}
            height={744}
            priority
            sizes="(max-width: 640px) 320px, (max-width: 768px) 448px, (max-width: 1024px) 500px, (max-width: 1280px) 600px, 744px"
            className="w-full max-w-xs md:max-w-md lg:h-auto lg:max-w-full"
            style={{ maxWidth: "clamp(320px, 40vw, 744px)" }}
          />
        </div>
      </div>
    </div>
  )
}

export default HomeHero

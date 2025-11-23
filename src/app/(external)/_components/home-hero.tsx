"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DemoVideo from "./demo-video"
import { playVideoAndScroll } from "../_utils/watchdemo"

const HomeHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleWatchDemo = () => {
    playVideoAndScroll(videoRef, "demo-video", 130)
  }

  return (
    <section className="w-full bg-[#f5f5f5] pt-16 pb-10 sm:pt-20 sm:pb-14 md:pt-32 md:pb-0">
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
          <Link href={"/login"}>
            <Button className="min-w-[140px] flex-1 sm:min-w-[180px] lg:w-auto lg:flex-none">
              Get Started
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={handleWatchDemo}
            className="min-w-[140px] flex-1 sm:min-w-[180px] lg:w-auto lg:flex-none"
          >
            Watch Demo
          </Button>
        </div>

        <div className="w-full px-4 pt-6 sm:px-0">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-t-3xl rounded-b-none border border-white/70 bg-white sm:max-w-3xl md:max-w-5xl lg:max-w-6xl">
            <DemoVideo ref={videoRef} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero

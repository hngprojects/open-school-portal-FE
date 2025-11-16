import React from "react"
import Image from "next/image"
import { Outfit } from "next/font/google"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

const HomeDemo: React.FC = () => {
  return (
    <section className={`${outfit.className} w-full bg-white py-16 lg:py-24`}>
      <div className="mx-auto max-w-[1285px] px-4">
        <div className="relative mx-auto h-[319px] max-w-[1259px] rounded-2xl bg-[#DA3743]">
          <div className="absolute inset-0 overflow-hidden rounded-2xl hidden md:block">
            <div className="absolute top-0 right-0 bottom-0 flex w-1/3">
              <div className="relative h-full w-full">
                {/* Vector 1 - Main wave */}
                <div className="absolute top-0 right-0 h-full">
                  <Image
                    src="/demo/Vector 1.png"
                    alt="Wave pattern"
                    width={353}
                    height={334}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute top-0 -right-1 h-full">
                  <Image
                    src="/demo/Vector 2.png"
                    alt="Wave pattern"
                    width={353}
                    height={334}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute top-0 right-1 h-full">
                  <Image
                    src="/demo/Vector 3.png"
                    alt="Wave pattern"
                    width={353}
                    height={334}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex h-full items-center justify-between px-8 lg:px-16">
            <div className="absolute -top-34 -left-8 hidden lg:block">
              <div
                className="h-[490px] w-[445px] overflow-hidden"
                style={{
                  transform: "rotate(5.28deg)",
                }}
              >
                <Image
                  src="/demo/demo-mobile.png"
                  alt="Open School Portal Dashboard"
                  width={445}
                  height={490}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="ml-auto max-w-xl text-center text-white sm:ml-[5px] md:ml-[130px] lg:ml-[400px]">
              <h5 className="mb-4 text-3xl leading-tight font-bold lg:text-4xl">
                Ready to Modernize Your School
              </h5>
              <p className="mb-8 text-lg opacity-90 lg:text-xl">
                It&apos;s just getting started
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button className="rounded-lg bg-white px-8 py-3 text-lg font-semibold whitespace-nowrap text-[#DA3743] transition-colors duration-300 hover:bg-gray-100">
                  Get Started
                </button>
                <button className="hover:bg-opacity-10 rounded-lg border border-white px-8 py-3 text-lg font-semibold whitespace-nowrap text-white transition-colors duration-300 hover:bg-white">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex justify-center">
            <div
              className="h-[308px] w-full max-w-[280px] overflow-hidden"
              style={{
                transform: "rotate(-5.28deg)",
              }}
            >
              <Image
                src="/demo/demo-mobile.png"
                alt="Open School Portal Dashboard"
                width={280}
                height={308}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeDemo

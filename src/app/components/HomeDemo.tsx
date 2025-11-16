import React from "react"
import Image from "next/image"

const HomeDemo: React.FC = () => {
  return (
    <section className="font-outfit w-full bg-white py-8 sm:py-12 lg:py-24">
      <div className="mx-auto max-w-[1285px] px-4 sm:px-6">
        <div className="relative mx-auto h-auto min-h-[280px] w-full overflow-visible rounded-2xl bg-[#DA3743] sm:min-h-[300px] md:h-[319px] md:max-w-[1259px]">
          <div className="absolute inset-0 hidden overflow-hidden rounded-2xl md:block">
            <div className="absolute top-0 right-0 bottom-0 flex w-1/3">
              <div className="relative h-full w-full">
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

          <div className="relative z-10 hidden h-full items-center justify-between lg:flex lg:px-16">
            <div className="absolute -left-8 -top-20 lg:-left-8 lg:-top-32">
              <div
                className="h-[450px] w-[400px] overflow-visible"
                style={{
                  transform: "rotate(5.28deg)",
                }}
              >
                <Image
                  src="/demo/demo-mobile.png"
                  alt="Open School Portal Dashboard"
                  width={500}
                  height={550}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>

            <div className="ml-auto max-w-xl text-center text-white md:ml-[120px] lg:ml-[450px]">
              <h5
                className="mb-4 font-bold leading-tight lg:text-4xl"
                style={{ fontSize: "clamp(20px, 4vw, 24px)" }}
              >
                Ready to Modernize Your School
              </h5>
              <p
                className="mb-6 opacity-90 lg:mb-8 lg:text-xl"
                style={{ fontSize: "clamp(16px, 3vw, 18px)" }}
              >
                It&apos;s just getting started
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <button
                  className="rounded-lg bg-white px-6 py-3 font-semibold whitespace-nowrap text-[#DA3743] transition-colors duration-300 hover:bg-gray-100 sm:px-8"
                  style={{ fontSize: "clamp(14px, 3vw, 16px)" }}
                >
                  Get Started
                </button>
                <button
                  className="rounded-lg border border-white px-6 py-3 font-semibold whitespace-nowrap text-white transition-colors duration-300 hover:bg-white hover:bg-opacity-10 sm:px-8"
                  style={{ fontSize: "clamp(14px, 3vw, 16px)" }}
                >
                  Watch Demo
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-8 text-center lg:hidden">
            <div className="mb-6 max-w-[280px]">
              <div
                className="mx-auto h-[200px] w-full overflow-hidden"
                style={{
                  transform: "rotate(-5.28deg)",
                }}
              >
                <Image
                  src="/demo/demo-mobile.png"
                  alt="Open School Portal Dashboard"
                  width={280}
                  height={200}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
            
            <div className="text-white">
              <h5
                className="mb-3 font-bold leading-tight"
                style={{ fontSize: "clamp(20px, 6vw, 28px)" }}
              >
                Ready to Modernize Your School
              </h5>
              <p
                className="mb-6 opacity-90"
                style={{ fontSize: "clamp(16px, 4vw, 18px)" }}
              >
                It&apos;s just getting started
              </p>
              <div className="flex flex-col items-center gap-3">
                <button
                  className="w-full max-w-[200px] rounded-lg bg-white px-6 py-3 font-semibold text-[#DA3743] transition-colors duration-300 hover:bg-gray-100"
                  style={{ fontSize: "clamp(14px, 4vw, 16px)" }}
                >
                  Get Started
                </button>
                <button
                  className="w-full max-w-[200px] rounded-lg border border-white px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white hover:bg-opacity-10"
                  style={{ fontSize: "clamp(14px, 4vw, 16px)" }}
                >
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeDemo
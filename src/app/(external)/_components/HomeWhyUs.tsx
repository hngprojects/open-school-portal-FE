import React from "react"
import Image from "next/image"
import { Check, Smartphone, Shield, Zap, type LucideIcon } from "lucide-react"

const whyUsData = [
  {
    icon: Smartphone,
    title: "Works on Any Device",
    description:
      "Access the portal from your phone, tablet, or computer anywhere, anytime.",
  },
  {
    icon: Shield,
    title: "Fast & Easy to Use",
    description:
      "Simple, clean interface designed for teachers, students, and administrators.",
  },
  {
    icon: Zap,
    title: "Built for Nigerian Schools",
    description:
      "Designed with local school structures, grading systems, and connectivity realities in mind.",
  },
  {
    icon: Check,
    title: "Scalable & Customizable",
    description:
      "Grow with your school, add new features as needed, and tailor the portal to your school's unique needs.",
  },
]

const HomeWhyUs = () => {
  return (
    <div className="flex flex-col gap-6 py-8 md:gap-8 md:py-12 lg:py-18">
      <div className="container flex flex-col gap-6 md:gap-8">
        <section className="flex w-full max-w-md flex-col gap-3 text-center md:gap-4 md:text-left">
          <h2 className="text-text-primary text-2xl font-semibold md:text-3xl">
            WHY YOU SHOULD USE OPEN SCHOOL PORTAL
          </h2>
          <p className="text-text-secondary text-base md:text-lg">
            It is more than a portal, your school&apos;s digital backbone.
          </p>
        </section>
        <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex justify-center lg:flex-1 lg:justify-center">
            <Image
              src="/assets/phone-x-phone.png"
              alt="Why Us"
              width={636}
              height={636}
              sizes="(max-width: 640px) 320px, (max-width: 768px) 448px, (max-width: 1024px) 500px, (max-width: 1280px) 550px, 636px"
              loading="lazy"
              className="w-full max-w-xs md:max-w-md lg:h-auto lg:max-w-full"
              style={{ maxWidth: "clamp(320px, 35vw, 636px)" }}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:h-full lg:gap-8">
            {whyUsData.map((item, index) => {
              const IconComponent = item.icon as LucideIcon
              return (
                <section
                  key={index}
                  className="border-border-secondary/30 flex w-full flex-col gap-3 rounded-lg border-[0.5px] p-5 transition-shadow hover:shadow-md sm:p-6 lg:max-w-62 lg:gap-2.5 lg:p-4"
                >
                  <IconComponent className="text-accent size-8 sm:size-9 md:size-10" />
                  <h5 className="text-text-primary text-base font-semibold sm:text-lg">
                    {item.title}
                  </h5>
                  <p className="text-text-secondary text-sm leading-6 sm:text-base sm:leading-6 lg:text-lg">
                    {item.description}
                  </p>
                </section>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomeWhyUs

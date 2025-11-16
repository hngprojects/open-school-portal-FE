import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"

const HomeHero = () => {
  return (
    <div className="flex w-full pt-6 md:pt-8 lg:pt-10">
      <div className="container flex flex-col items-center gap-6">
        <section className="flex w-full flex-col gap-6 py-4 text-center md:gap-8 md:py-6">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <h1 className="text-text-primary text-3xl leading-tight font-bold md:text-6xl md:leading-18 animate-onrender">
              Get Early Access to <br className="md:hidden" /> Open <br className="hidden md:block" /> School Portal
            </h1>
            <p className="text-text-secondary text-base leading-7 md:text-xl md:leading-8 lg:max-w-132 lg:text-2xl lg:leading-9.5 animate-onrender delay-300">
              The one-in-all system for managing students, attendance, fees reports and NFC smart ID cards.
            </p>
          </div>
          <div>
            <Button className="gap-3 px-5 w-full md:w-auto">
              Join the Waitlist
              <ArrowRightIcon className="w-8 h-8 font-bold" />
            </Button>
          </div>
        </section>
        <div className="flex justify-center w-full aspect-[1083/602] animate-onrender delay-600">
          <Image
            src="/assets/images/waitlist/admin-fees-management.png"
            alt="Hero Image"
            width={1083}
            height={602}
            priority
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default HomeHero

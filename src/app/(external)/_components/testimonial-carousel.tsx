"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { testimonials } from "@/data/testimonials"

export default function TestimonialCarousel() {
  return (
    <Carousel
      opts={{ align: "center", loop: true }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: true,
        }),
      ]}
      className="-mx-4 w-full"
    >
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id} className="basis-auto pl-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mx-auto flex h-[274px] max-w-[307px] flex-col justify-between rounded-2xl border border-gray-100 bg-[#FBEBEC] p-6 shadow-xl md:h-[374px]" // This line is key
            >
              <TestimonialCardMobile testimonial={testimonial} />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-6 bg-white/80 backdrop-blur-sm hover:bg-white" />
      <CarouselNext className="right-6 bg-white/80 backdrop-blur-sm hover:bg-white" />
    </Carousel>
  )
}

const TestimonialCardMobile = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0]
}) => (
  <div className="flex h-full flex-col justify-between">
    <h3
      className="mb-3 line-clamp-3 font-semibold text-gray-900"
      style={{ fontSize: "clamp(16px, 4vw, 20px)" }}
    >
      {testimonial.title}
    </h3>

    <p
      className="mb-6 line-clamp-5 flex-1 text-base leading-relaxed text-gray-700"
      style={{ fontSize: "clamp(14px, 4vw, 18px)" }}
    >
      &ldquo;{testimonial.content}&rdquo;
    </p>

    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-lg">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          className="object-cover"
          sizes="3rem"
          priority
        />
      </div>
      <div>
        <h4 className="text-base leading-tight font-bold text-gray-900">
          {testimonial.name}
        </h4>
        <p className="text-sm leading-tight text-gray-500">{testimonial.role}</p>
      </div>
    </div>
  </div>
)

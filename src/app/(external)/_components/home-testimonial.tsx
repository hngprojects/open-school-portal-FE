import React from "react"
import Image from "next/image"
import TestimonialCarousel from "./testimonial-carousel"
import { testimonials } from "@/data/testimonials"

export default function HomeTestimonial() {
  return (
    <section className="w-full bg-[#fafafa] py-16 text-black">
      <div className="font-outfit mx-auto max-w-[1285px] px-4">
        <div className="mb-12 lg:text-left">
          <h2
            className="mb-4 leading-tight font-semibold text-gray-900"
            style={{ fontSize: "clamp(20px, 5vw, 32px)" }}
          >
            What Students, Staff & Parents Say
            <br className="hidden lg:block" /> About Open School Portal
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600 lg:mx-0">
            Real stories from people who use Open School Portal every day to learn, teach,
            and stay organized
          </p>
        </div>

        <div className="hidden grid-cols-1 gap-8 lg:grid lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl border border-gray-100 bg-[#FBEBEC] p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        <div className="lg:hidden">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  )
}

const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => (
  <div className="flex gap-8">
    <div className="shrink-0">
      <div className="relative h-56 w-56 overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          className="object-cover"
          sizes="14rem"
          priority
        />
      </div>
    </div>
    <div className="flex flex-1 flex-col justify-center">
      <h3 className="mb-3 text-xl font-semibold text-gray-900">{testimonial.title}</h3>
      <p className="mb-6 text-base leading-relaxed text-gray-700">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div>
        <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
        <p className="text-sm text-gray-500">{testimonial.role}</p>
      </div>
    </div>
  </div>
)

import React from "react"
import Image from "next/image"
import { testimonials } from "@/data/testimonials"

export default function HomeTestimonial() {
  return (
    <section className="w-full bg-[#fafafa] py-20 text-black">
      <div className="font-outfit mx-auto max-w-[1285px] px-4">
        <div className="mb-12 text-center lg:text-left">
          <h2
            className="mb-4 leading-tight font-semibold text-gray-900"
            style={{ fontSize: "clamp(28px, 5vw, 40px)" }}
          >
            What Students, Staff & Parents Say About School Base
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600 lg:mx-0">
            Real stories from people who use School Base every day to learn, teach, and
            stay organized
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="rounded-2xl border border-gray-100 bg-[#FBEBEC] p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl md:p-8"
            >
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0]
  index: number
}) => (
  <div className="flex flex-col gap-6 md:flex-row md:gap-8">
    <div className="hidden shrink-0 lg:block">
      <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-2xl shadow-lg md:mx-0 md:h-56 md:w-56">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 8rem, 14rem"
          priority={index < 2}
        />
      </div>
    </div>

    <div className="flex flex-1 flex-col gap-4 md:text-left">
      <div>
        <h3 className="line-clamp-3 text-xl font-semibold text-gray-900">
          {testimonial.title}
        </h3>

        <p className="line-clamp-4 text-base leading-relaxed text-gray-700">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      <div className="flex items-center justify-items-start gap-4 md:flex">
        <div className="relative h-[31px] w-[31px] overflow-hidden rounded-full shadow lg:hidden">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  </div>
)

import React from "react"
import Image from "next/image"
import "./testimonials-styles.css"
import { Outfit } from "next/font/google"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  title: string
  content: string
}

const TestimonialSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "James Chiamaka",
      role: "JSS 3A Student",
      image: "/testimonials/t-student.png",
      title: "Learning and being a student has never been this easy!",
      content:
        "Open School Portal helps me follow my lessons, submit assignments easily, and track my progress. I love how everything is in one place.",
    },
    {
      id: 2,
      name: "Mr. Matthew",
      role: "Mathematics Teacher",
      image: "/testimonials/t-teacher.png",
      title: "Teaching and class management made simple!",

      content:
        "Open School Portal helps me follow my lessons, submit assignments easily, and track my progress. I love how everything is in one place.",
    },
    {
      id: 3,
      name: "Mrs. Thompson Janet",
      role: "School Admin",
      image: "/testimonials/t-admin.png",
      title: "A powerful tool for modern schools, Reliable, fast, and built for growth!",

      content:
        "Open School Portal has improved communication, record keeping, and student management. Our staff and parents love it.",
    },
    {
      id: 4,
      name: "Mr. James Kennedy",
      role: "Parent",
      image: "/testimonials/t-parent.png",
      title: "I can finally monitor my child’s education and progress!",

      content:
        "With Open School Portal, I see my son's attendance, results, and school updates in real time. It keeps me involved and gives me peace of mind.",
    },
  ]

  return (
<section className={`${outfit.className} testimonial w-full bg-white py-16 lg:py-24`}>
      <div className="font-outfit mx-auto max-w-[1285px] px-4">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            What Our Users Say
          </h2>
          <p className="sub-title mx-auto max-w-3xl text-lg text-gray-600 lg:text-xl">
            Discover how Open School Portal is transforming educational institutions and
            enhancing the experience for administrators, teachers, and parents alike.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-xl border border-gray-100 bg-[#FBEBEC] p-6 shadow-lg transition-all duration-300 hover:shadow-xl lg:p-8"
            >
              <div className="flex flex-col items-center justify-center gap-6 text-center sm:flex-row lg:gap-8">
                <div className="shrink-0">
                  <div className="relative h-32 w-32 overflow-hidden rounded-2xl sm:h-[200px] sm:w-[200px]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 8rem, (max-width: 768px) 12rem, 12rem"
                      priority={true}
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <h3>{testimonial.title}</h3>
                  <p className="mb-2 text-base leading-relaxed font-normal lg:mb-2">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold lg:text-xl">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm lg:text-base">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection

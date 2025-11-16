"use client"

import Image from "next/image"
import { useState } from "react"

interface FAQItem {
  id: number
  question: string
  answer: string
}

const HomeFAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0)

  const faqData: FAQItem[] = [
    {
      id: 0,
      question: "How does the app help users manage their finances?",
      answer:
        "With a sleek design and user-friendly interface, users can effortlessly track their spending and stay within budget.",
    },
    {
      id: 1,
      question: "How can users benefit from using the app?",
      answer:
        "Users can save time, reduce financial stress, and achieve their financial goals through comprehensive budgeting tools and insights.",
    },
    {
      id: 2,
      question: "How can users benefit from using the app?",
      answer:
        "The app provides real-time notifications, customizable categories, and detailed reports to help users make informed financial decisions.",
    },
    {
      id: 3,
      question: "How can users benefit from using the app?",
      answer:
        "With automated tracking and smart suggestions, users can identify spending patterns and optimize their budget for better savings.",
    },
  ]

  const toggleItem = (id: number) => {
    setOpenItem((prev) => (prev === id ? null : id))
  }

  return (
    <section className="font-outfit w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-full lg:max-w-[1285px]">
        <h2
          className="mb-8 leading-none font-semibold text-gray-900"
          style={{ fontSize: "clamp(18px, 4vw, 32px)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col items-stretch lg:flex-row lg:gap-[110px]">
          <div className="flex-1 lg:max-w-[860px]">
            <div className="space-y-4">
              {faqData.map((faq) => (
                <div key={faq.id} className="rounded-md border border-[#999] p-4">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="flex w-full items-center justify-between py-2 text-left font-semibold text-gray-900 transition-colors duration-200 hover:text-gray-700"
                    style={{ fontSize: "clamp(14px, 4vw, 16px)" }}
                  >
                    <span
                      className="pr-4 leading-8 font-semibold"
                      style={{ fontSize: "clamp(16px, 4vw, 24px)" }}
                    >
                      {faq.question}
                    </span>
                    <svg
                      className={`h-5 w-5 transform transition-transform duration-200 ${
                        openItem === faq.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openItem === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p
                      className="mt-2 pb-2 leading-relaxed text-[#2d2d2d]"
                      style={{ fontSize: "clamp(16px, 4vw, 18px)" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 lg:mt-0 lg:h-full lg:max-w-[330px]">
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-[#999] p-8 text-center lg:min-h-[400px]">
              <div className="mx-auto mb-4 h-32 w-32 max-w-32">
                <Image
                  src="/faq/chat.png"
                  alt="Chat"
                  width={128}
                  height={128}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <h2
                className="mb-6 font-medium"
                style={{ fontSize: "clamp(16px, 4vw, 20px)" }}
              >
                Do you have more questions?
              </h2>

              <p
                className="mb-6 leading-relaxed text-black"
                style={{ fontSize: "clamp(16px, 4vw, 18px)" }}
              >
                Our team will answer all your questions. We response fast.
              </p>

              <div className="mb-6 w-full space-y-4">
                <button
                  className="w-full rounded-lg bg-[#DA3743] px-8 py-2 font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
                  style={{ fontSize: "clamp(14px, 4vw, 16px)" }}
                >
                  Contact Super Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFAQ

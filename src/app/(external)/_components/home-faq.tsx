import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface FAQItem {
  id: number
  question: string
  answer: string
}

export default function HomeFAQ() {
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

  return (
    <section
      id="faq"
      className="font-outfit mb-8 h-full w-full bg-[#fafafa] px-4 py-8 sm:px-4 lg:px-8"
    >
      <div className="mx-auto max-w-full lg:max-w-[1285px]">
        <h2
          className="mb-8 leading-none font-semibold text-gray-900"
          style={{ fontSize: "clamp(32px, 4vw, 32px)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col items-stretch lg:flex-row lg:gap-[110px]">
          <div className="flex-1 lg:max-w-[860px]">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4"
              defaultValue={`item-0`}
            >
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-md border border-gray-200 px-4 py-2"
                >
                  <AccordionTrigger
                    className="w-full py-2 text-left font-semibold text-gray-900 transition-colors duration-200 hover:text-gray-700"
                    style={{ fontSize: "clamp(16px, 4vw, 24px)" }}
                  >
                    <span className="block max-w-[500px] text-2xl">{faq.question}</span>
                  </AccordionTrigger>

                  <AccordionContent className="flex flex-col gap-4">
                    <p
                      className="mt-2 leading-relaxed text-[#2d2d2d]"
                      style={{ fontSize: "clamp(16px, 4vw, 18px)" }}
                    >
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-16 lg:mt-0 lg:h-full lg:max-w-[330px]">
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-[#999] px-4 py-8 text-center lg:min-h-[400px]">
              <div className="mx-auto mb-4 h-[62px] w-[62px] max-w-32">
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
                className="mb-2 font-bold lg:mb-4"
                style={{ fontSize: "clamp(18px, 4vw, 20px)" }}
              >
                Do you have more questions?
              </h2>

              <p
                className="mb-2 leading-relaxed text-black lg:mb-4"
                style={{ fontSize: "clamp(16px, 4vw, 18px)" }}
              >
                Our team will answer all your questions. We response fast.
              </p>

              <div className="my-2 w-full space-y-4 lg:my-0 lg:mt-6">
                <Button
                  className="w-full rounded-lg bg-[#DA3743] px-8 py-2 font-semibold text-white transition-colors duration-200"
                  style={{ fontSize: "clamp(14px, 4vw, 16px)" }}
                >
                  Contact Super Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

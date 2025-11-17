import Image from "next/image"
import JoinWaitlistButton from "./join-waitlist-button"

interface Reason {
  imgSrc: string
  title: string
  description: string
  imageSize: { height: number; width: number }
}

const reasons: Reason[] = [
  {
    imgSrc: "/assets/images/waitlist/digital-student-management.png",
    title: "Digital Student Management",
    description:
      "Keep all student records digital and organized. Access grades, progress reports, and histories in one secure platform.",
    imageSize: { height: 221, width: 200 },
  },
  {
    imgSrc: "/assets/images/waitlist/smart-attendance.png",
    title: "Smart Attendance",
    description:
      "Automate attendance tracking and save hours every week. Teachers can focus on teaching while the system handles the rest.",
    imageSize: { height: 290, width: 345 },
  },
  {
    imgSrc: "/assets/images/waitlist/integrated-fees-and-invoicing.png",
    title: "Integrated Fee Management",
    description:
      "Manage school fees digitally, track payments, and automate reminders—all from one platform.",
    imageSize: { height: 361, width: 302 },
  },
  {
    imgSrc: "/assets/images/waitlist/parent-mobile-app.png",
    title: "Parents Mobile App",
    description:
      "Allow parents to stay connected with real-time updates on attendance, grades, and school announcements via mobile.",
    imageSize: { height: 300, width: 351 },
  },
]

const WhySchoolsJoinEarlyAccess = () => {
  return (
    <section className="w-full bg-white">
      <div className="container flex flex-col gap-12 bg-white py-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-text-primary mb-4 text-4xl font-semibold md:text-5xl">
            Why Schools Are Joining Early Access
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed md:text-xl">
            Join hundreds of forward-thinking schools transforming how they operate.
            Experience all the benefits before everyone else.
          </p>
        </div>

        {/* 2x2 Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center gap-4 rounded-2xl bg-[#F9FAFC] p-6 transition hover:shadow-lg md:p-8"
            >
              <div className="group-hover:bg-accent/20 relative flex h-[410px] w-[360px] items-center justify-center rounded-xl transition-colors md:h-[480px] md:w-[420px]">
                <Image
                  src={reason.imgSrc}
                  alt={reason.title}
                  height={reason.imageSize.height}
                  width={reason.imageSize.width}
                  className="absolute h-full w-full object-contain"
                />
              </div>
              <h3 className="text-text-primary text-left text-xl font-semibold md:text-2xl">
                {reason.title}
              </h3>
              <p className="text-text-secondary text-base leading-7 md:text-lg">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-[#F9FAFC]">
        <div className="container flex flex-col items-center gap-5 py-12 sm:flex-row">
          <div className="flex w-full flex-col items-center gap-4 rounded-2xl py-4 text-left md:p-12">
            <h3 className="text-text-primary text-left text-2xl font-semibold md:text-3xl">
              NFC-Powered Smart ID Cards for Students
            </h3>
            <p className="text-text-secondary text-lg md:text-xl">
              Enhance campus security and streamline access to facilities with our modern
              NFC smart ID cards. Quick, contactless and secure for every student
            </p>
            <JoinWaitlistButton
              showArrow={true}
              className="mt-4 w-full max-w-md px-6 py-3"
            />
          </div>

          <div className="relative flex aspect-637/618 w-full items-center justify-center rounded-xl">
            <Image
              height={618}
              width={637}
              src="/assets/images/waitlist/nfc-powered-smart-id-cards.png"
              alt="nfc powered smart id cards"
              className="absolute h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhySchoolsJoinEarlyAccess

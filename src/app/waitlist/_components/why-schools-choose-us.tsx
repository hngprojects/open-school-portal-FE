import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

interface Reason {
  imgSrc: string;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    imgSrc: "/assets/images/waitlist/digital-student-management.png",
    title: "Digital Student Management",
    description:
      "Keep all student records digital and organized. Access grades, progress reports, and histories in one secure platform.",
  },
  {
    imgSrc: "/assets/images/waitlist/smart-attendance.png",
    title: "Smart Attendance",
    description:
      "Automate attendance tracking and save hours every week. Teachers can focus on teaching while the system handles the rest.",
  },
  {
    imgSrc: "/assets/images/waitlist/integrated-fees-and-invoicing.png",
    title: "Integrated Fee Management",
    description:
      "Manage school fees digitally, track payments, and automate reminders—all from one platform.",
  },
  {
    imgSrc: "/assets/images/waitlist/parent-mobile-app.png",
    title: "Parents Mobile App",
    description:
      "Allow parents to stay connected with real-time updates on attendance, grades, and school announcements via mobile.",
  },
];

const WhySchoolsJoinEarlyAccess = ({
  onJoinUs
}: {
  onJoinUs: () => void;
}) => {
  return (
    <section className="w-full bg-white">
      <div className="container flex flex-col gap-12 py-12 bg-white">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold text-text-primary mb-4">
            Why Schools Are Joining Early Access
          </h2>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Join hundreds of forward-thinking schools transforming how they operate. Experience all the benefits before everyone else.
          </p>
        </div>

        {/* 2x2 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center gap-4 rounded-2xl bg-[#F9FAFC] p-6 md:p-8 hover:shadow-lg transition"
            >
              <div className="relative w-[360px] h-[410px] md:w-[420px] md:h-[480px] flex items-center justify-center rounded-xl group-hover:bg-accent/20 transition-colors">
                <Image
                  src={reason.imgSrc}
                  alt={reason.title}
                  className="absolute w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-text-primary text-left">
                {reason.title}
              </h3>
              <p className="text-base md:text-lg text-text-secondary leading-7">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-[#F9FAFC]">
        <div className="container flex flex-col sm:flex-row items-center gap-5 py-12">

          <div className="flex flex-col items-center w-full rounded-2xl py-4 md:p-12 gap-4 text-left">
            <h3 className="text-2xl md:text-3xl font-semibold text-text-primary text-left">
              NFC-Powered Smart ID Cards for Students
            </h3>
            <p className="text-lg md:text-xl text-text-secondary">
              Enhance campus security and streamline access to facilities with our modern NFC smart ID cards. Quick, contactless and secure for every student
            </p>
            <Button className="mt-4 px-6 py-3 w-full max-w-md" onClick={onJoinUs}>
              Join Waitlist
              <ArrowRightIcon />
            </Button>
          </div>


          <div className="relative w-full flex items-center justify-center rounded-xl aspect-[637/618]">
            <Image
              src="/assets/images/waitlist/nfc-powered-smart-id-cards.png"
              alt="nfc powered smart id cards"
              className="absolute w-full h-full object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhySchoolsJoinEarlyAccess;

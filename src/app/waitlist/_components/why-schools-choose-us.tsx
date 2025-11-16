import React from "react";

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

const WhySchoolsJoinEarlyAccess = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto flex flex-col gap-12">

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
              className="relative flex flex-col items-center gap-4 rounded-2xl border border-border-secondary/20 bg-white p-6 md:p-8 hover:shadow-lg transition"
            >
              <div className="relative w-[360px] h-[410px] md:w-[420px] md:h-[480px] flex items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <img
                  src={reason.imgSrc}
                  alt={reason.title}
                  className="absolute w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-text-primary text-center">
                {reason.title}
              </h3>
              <p className="text-base md:text-lg text-text-secondary leading-7 text-center">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 flex flex-col items-center text-center bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 md:p-12 gap-4">
          <h3 className="text-2xl md:text-3xl font-semibold text-text-primary">
            Ready to Transform Your School?
          </h3>
          <p className="text-lg md:text-xl text-text-secondary">
            Don't get left behind. Join the waitlist and be among the first to experience the future of school management.
          </p>
          <button className="mt-4 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition">
            Join Waitlist
          </button>
        </div>

      </div>
    </section>
  );
};

export default WhySchoolsJoinEarlyAccess;

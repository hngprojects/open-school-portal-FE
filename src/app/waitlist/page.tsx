import FAQAccordion from "./_components/waitlist-faq";
import WaitlistHero from "./_components/waitlist-hero";
import WhySchoolsChooseUs from "./_components/why-schools-choose-us";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
     <WaitlistHero />
     <WhySchoolsChooseUs/>
     <FAQAccordion />
    </div>
  )
}

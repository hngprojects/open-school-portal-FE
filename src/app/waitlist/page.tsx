import FAQAccordion from "./_components/FAQ";
import WaitlistHero from "./_components/WaitlistHero";
import WhySchoolsChooseUs from "./_components/why-schools-choose-us";

export default function Home() {
  return (
    <div className="min-h-screen">
     <WaitlistHero />
     <WhySchoolsChooseUs/>
     <FAQAccordion />
    </div>
  )
}

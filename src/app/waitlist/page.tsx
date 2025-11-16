import FAQAccordion from "./_components/FAQ";
import WaitlistHero from "./_components/WaitlistHero";


export default function Home() {
  return (
    <div className="min-h-screen">
     <WaitlistHero />
     <FAQAccordion />
    </div>
  )
}

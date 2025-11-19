import HomeDemo from "./_components/home-demo"
import HomeForWho from "./_components/home-for-who"
import HomeHero from "./_components/home-hero"
import HomeTestimonial from "./_components/home-testimonial"
import HomeWhyUs from "./_components/home-why-us"
import HomeFAQ from "./_components/home-faq"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomeHero />
      <HomeWhyUs />
      <HomeForWho />
      <HomeTestimonial />
      <HomeDemo />
      <HomeFAQ />
    </div>
  )
}

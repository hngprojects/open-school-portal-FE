import HomeTestimonial from "./components/HomeTestimonial"
import HomeDemo from "./components/HomeDemo"
import HomeFAQ from "./components/HomeFAQ"
import "./styles.css"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomeTestimonial />
      <HomeDemo />
      <HomeFAQ />
    </div>
  )
}

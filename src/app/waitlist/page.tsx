"use client"

import { useState } from "react"
import FAQAccordion from "./_components/waitlist-faq"
import WaitlistFormModal from "./_components/waitlist-form"
import WaitlistHero from "./_components/waitlist-hero"
import WhySchoolsChooseUs from "./_components/why-schools-choose-us"
import Navbar from "./_components/waitlist-navbar"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen w-full">
      <Navbar onJoinUs={handleJoinUs} />

      <WaitlistHero onJoinUs={handleJoinUs} />
      <WhySchoolsChooseUs onJoinUs={handleJoinUs} />
      <FAQAccordion />
      <WaitlistFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
      />
    </div>
  )

  function handleJoinUs() {
    setIsModalOpen(true)
  }
}

import React from "react"
import Link from "next/link"
import { Mail, Phone, Home, Facebook, Instagram, Twitter } from "lucide-react"
import Logo from "./logo"

const quickLinks = [
  { name: "Benefit", href: "/coming-soon" },
  { name: "Features", href: "/feature" },
  { name: "Who it's for", href: "/coming-soon" },
]
const support = [
  { name: "FAQs", href: "/#faq" },
  { name: "Contact Us", href: "/coming-soon" },
  { name: "Mail Support", href: "/coming-soon" },
]

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="container flex flex-col gap-8 py-8 lg:flex-row lg:justify-between lg:py-12">
        <section className="flex w-full max-w-100 flex-col gap-5 lg:justify-center">
          <div className="flex items-center gap-4">
            <Logo iconColor="white" textColor="white" size={40} />
          </div>
          <p className="text-lg leading-8 lg:text-xl">
            The Modern Way School Run In Nigeria. Manage attendance, results, timetables,
            fees, and NFC, all in one place
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.facebook.com/share/17MGU2hVmP/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="size-5 fill-white text-white" />
            </Link>
            <Link
              href="https://www.instagram.com/schoolbase.ng?igsh=MXRxczAxcWszcWNsMQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-5 text-white" />
            </Link>
            {/* <Linkedin className="size-5 text-white" /> */}
            <Link
              href="https://x.com/school_baseng?t=YPepx9_DRCqqo5dh0DeEbQ&s=09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="size-5 text-white" />
            </Link>
          </div>
          <p className="text-[#fafafa]">Copyright © 2025</p>
        </section>
        <section className="flex flex-col items-start gap-5 lg:w-auto lg:pt-10">
          <h3 className="text-lg font-bold lg:text-xl">Quick Links</h3>
          <ul className="flex flex-col gap-4">
            {quickLinks.map((link) => (
              <li key={`${link.name}-${link.href}`}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col items-start gap-5 lg:w-auto lg:pt-10">
          <h3 className="text-lg font-bold lg:text-xl">Support</h3>
          <ul className="flex flex-col gap-4">
            {support.map((link) => (
              <li key={`${link.name}-${link.href}`}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col items-start gap-5 lg:w-auto lg:pt-10">
          <h3 className="text-lg font-bold lg:text-xl">Get in Touch</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <Mail className="size-5 shrink-0" />
              <span className="wrap-break-word">info@schoolbase.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-5 shrink-0" />
              <span>+234 123 456 7890</span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="mt-0.5 size-5 shrink-0 fill-current" />
              <span className="wrap-break-word">123 School Street, Lagos, Nigeria</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Footer

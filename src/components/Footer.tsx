import React from "react"
import Link from "next/link"
import { Mail, Phone, Home } from "lucide-react"
import Logo from "./logo"
import SocialLinks from "./social-links"

const product = [
  { name: "Features", href: "/#feature" },
  { name: "About", href: "/#about" },
]
const support = [
  { name: "FAQs", href: "/#faq" },
  { name: "Contact Us", href: "/#contact-us" },
]

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="container flex flex-col gap-8 py-8 lg:flex-row lg:justify-between lg:py-12">
        <section className="flex w-full max-w-100 flex-col gap-5 lg:justify-center">
          <div className="flex items-center gap-4">
            <Logo iconColor="white" textColor="white" size={40} />
          </div>
          <p className="text-lg leading-8 text-white/80 lg:text-xl">
            The Modern Way School Run In Nigeria. Manage attendance, results, timetables,
            fees, and NFC, all in one place
          </p>

          <SocialLinks />

          <p className="text-[#fafafa]">Copyright &copy; {new Date().getFullYear()}</p>
        </section>
        <section className="flex flex-col items-start gap-5 lg:w-auto lg:pt-10">
          <h3 className="text-lg font-bold lg:text-xl">Product</h3>
          <ul className="flex flex-col gap-4">
            {product.map((link) => (
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

              <Link
                href="mailto:openschoolportalhq@gmail.com"
                className="wrap-break-word transition-all duration-200 ease-in-out hover:text-white/90 hover:underline"
              >
                openschoolportalhq@gmail.com
              </Link>
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

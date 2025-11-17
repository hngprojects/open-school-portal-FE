import Link from "next/link"
import { Facebook, Linkedin, TwitterIcon } from "lucide-react"

const sitemapLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
]

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="container flex flex-col gap-5 py-8">
        <section className="flex flex-col items-center gap-5">
          <ul className="flex flex-col items-center gap-8 sm:flex-row">
            {sitemapLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full">
          <ul className="flex w-full items-center justify-center gap-4">
            <li>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="hover:fill-accent size-6 transition-colors" />
              </Link>
            </li>
            <li>
              <Link href="https://x.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="hover:fill-accent size-6 transition-colors" />
              </Link>
            </li>
            {/* <li>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="size-6 hover:fill-accent transition-colors" />
              </Link>
            </li> */}
            <li>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="hover:fill-accent size-6 transition-colors" />
              </Link>
            </li>
          </ul>
        </section>

        <hr className="border-t-gray-700" />

        <footer>
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Open School Portal. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Footer

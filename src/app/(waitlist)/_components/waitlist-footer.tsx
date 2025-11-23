import Link from "next/link"
import { FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react"

// LinkedinIcon

const sitemapLinks = [
  { name: "Home", href: "/waitlist" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/coming-soon" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/coming-soon" },
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
              <Link
                href="https://www.facebook.com/share/17MGU2hVmP/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="hover:fill-accent size-6 transition-colors" />
              </Link>
            </li>
            <li>
              <Link
                href="https://x.com/school_baseng?t=YPepx9_DRCqqo5dh0DeEbQ&s=09"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="hover:fill-accent size-6 transition-colors" />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/schoolbase.ng?igsh=MXRxczAxcWszcWNsMQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="hover:fill-accent size-6 transition-colors" />
              </Link>
            </li>
            {/* <li>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="hover:fill-accent size-6 transition-colors" />
              </Link>
            </li> */}
          </ul>
        </section>

        <hr className="border-t-gray-700" />

        <footer>
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} School Base. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Footer

import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { GeneralQueryProvider } from "@/providers/general-query-provider"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Open School Portal",
    template: "%s | Open School Portal",
  },
  description:
    "The modern way schools run in Nigeria. Manage attendance, results, timetables, fees, and NFC all in one place. Connect students, teachers, parents, and administrators.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <GeneralQueryProvider>
      <html lang="en">
        <body className={`${outfit.variable} font-outfit antialiased`}>{children}</body>
      </html>
    </GeneralQueryProvider>
  )
}

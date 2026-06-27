import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Providers from "@/components/providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "FreshLens IAS — Authentic UPSC Preparation",
  description: "Laser-focused mentorship, curated resources, and strategic guidance for UPSC Civil Services.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Providers>
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
import type { Metadata } from "next"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "./strategicarc.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://strategicarc.co.in"), // Updated to client's exact domain
  title: "StrategicArc Consultants LLP | Integrated Finance, Compliance & Strategy",
  description: "Your embedded Virtual CFO and compliance partner. Eliminating the cost and confusion of fragmented corporate advice across India.",
  keywords: ["Virtual CFO Hyderabad", "GST compliance", "Transfer Pricing", "Tax planning India", "StrategicArc", "Banjara Hills CA consultants"],
  alternates: {
    canonical: "/", 
  },
  openGraph: {
    title: "StrategicArc Consultants LLP",
    description: "Finance. Compliance. Strategy. Done right. Done once.",
    url: "https://strategicarc.co.in", // Updated to client's exact domain
    siteName: "StrategicArc",
    locale: "en_IN",
    type: "website",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="strategicarc antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

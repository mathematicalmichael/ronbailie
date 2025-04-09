import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { ThemeProvider } from "../components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Ronald Bailie | Architect & Engineer",
  description: "Portfolio of Ronald Bailie, Licensed Architect with MSc in Structural Engineering and Structural Mechanics",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-black font-inter antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
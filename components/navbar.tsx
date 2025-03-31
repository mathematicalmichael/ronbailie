"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Add thin horizontal line at the top */}
        <div className="w-full h-px bg-gray-800"></div>

        <div className="flex h-16 items-center justify-between border-b border-gray-800">
          <Link href="/" className="text-xl font-light tracking-tight">
            R<span className="text-gray-400">B</span>
          </Link>

          <nav className="hidden md:flex items-center">
            {["projects", "about", "contact"].map((item, index) => (
              <Link
                key={item}
                href={`/${item}`}
                className="text-sm uppercase tracking-wider text-gray-300 hover:text-white transition-colors px-6 py-4 border-l border-gray-800"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/portfolio.pdf"
              className="text-sm uppercase tracking-wider text-gray-300 hover:text-white transition-colors px-6 py-4 border-l border-gray-800"
              target="_blank"
            >
              Portfolio
            </Link>
          </nav>

          <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto">
            <nav className="flex flex-col">
              {["projects", "about", "contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item}`}
                  className="text-sm uppercase tracking-wider text-gray-300 hover:text-white transition-colors py-4 px-4 border-t border-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/portfolio.pdf"
                className="text-sm uppercase tracking-wider text-gray-300 hover:text-white transition-colors py-4 px-4 border-t border-gray-800"
                target="_blank"
                onClick={() => setIsOpen(false)}
              >
                PDF Portfolio
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}


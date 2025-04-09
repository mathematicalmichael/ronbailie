"use client"

import type React from "react"

import { Mail, Phone, MapPin, Linkedin } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Add thin horizontal line at the top */}
        <div className="w-full h-px bg-gray-800 mb-12"></div>

        <h1 className="text-4xl font-light tracking-tight mb-2">Contact</h1>

        {/* Replace the divider with a more structural one */}
        <div className="flex items-center mb-12">
          <div className="w-12 h-px bg-gray-700 mr-4"></div>
          <div className="flex-grow h-px bg-gray-800"></div>
        </div>

        {/* Simplified Contact Info Section */}
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-l border-gray-800 pl-6">
              {/* LinkedIn Link */}
              <div className="flex items-start">
                <Linkedin className="h-5 w-5 text-gray-400 mt-1 mr-4" />
                <div>
                  <a
                    href="https://www.linkedin.com/in/ron-bailie-18b628128"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white mt-1 block"
                  >
                    linkedin.com/in/ron-bailie-18b628128
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-light">Office</h3>
                  <p className="text-gray-300 mt-1">
                    1450 Logan St
                    <br />
                    Denver, CO 80203
                    <br />
                    United States
                  </p>
                </div>
              </div>

            </div>
          </div>

        {/* Add thin horizontal line at the bottom */}
        <div className="w-full h-px bg-gray-800 mt-24"></div>
      </div>
    </main>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Add thin horizontal line at the top */}
        <div className="w-full h-px bg-gray-800 mb-12"></div>

        <h1 className="text-4xl font-light tracking-tight mb-2">Contact</h1>
        <p className="text-gray-400 mb-6">Get in touch for inquiries and collaborations</p>

        {/* Replace the divider with a more structural one */}
        <div className="flex items-center mb-12">
          <div className="w-12 h-px bg-gray-700 mr-4"></div>
          <div className="flex-grow h-px bg-gray-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-light mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-300">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-black border-gray-800 focus:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-300">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-black border-gray-800 focus:border-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm text-gray-300">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-black border-gray-800 focus:border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-gray-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-black border-gray-800 focus:border-gray-600 resize-none"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="bg-white text-black hover:bg-gray-200 w-full">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-900/20 border border-green-800 text-green-400 rounded">
                  Your message has been sent successfully. I'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-900/20 border border-red-800 text-red-400 rounded">
                  There was an error sending your message. Please try again later.
                </div>
              )}
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-light mb-8">Contact Information</h2>
            <div className="grid grid-cols-1 gap-8 border-l border-gray-800 pl-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-light">Email</h3>
                  <p className="text-gray-300 mt-1">contact@ronaldbailie.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-light">Phone</h3>
                  <p className="text-gray-300 mt-1">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-light">Office</h3>
                  <p className="text-gray-300 mt-1">
                    123 Design Studio
                    <br />
                    Seattle, WA 98101
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="text-lg font-light mb-4">Office Hours</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-l border-gray-800 pl-4">
                    <p className="text-sm text-gray-400">Weekdays</p>
                    <p className="text-gray-300">9:00 AM - 6:00 PM</p>
                  </div>
                  <div className="border-l border-gray-800 pl-4">
                    <p className="text-sm text-gray-400">Weekends</p>
                    <p className="text-gray-300">By appointment only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add a structural grid section */}
        <div className="mt-24">
          <div className="flex items-center mb-12">
            <div className="w-12 h-px bg-gray-700 mr-4"></div>
            <h2 className="text-2xl font-light">Project Inquiries</h2>
            <div className="flex-grow h-px bg-gray-800 ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-light mb-2">Residential</h3>
              <p className="text-gray-400 text-sm mb-4">For private homes and multi-family residential projects</p>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-white">
                Inquire
              </Button>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-light mb-2">Commercial</h3>
              <p className="text-gray-400 text-sm mb-4">
                For office buildings, retail spaces, and hospitality projects
              </p>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-white">
                Inquire
              </Button>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-light mb-2">Consultation</h3>
              <p className="text-gray-400 text-sm mb-4">For engineering analysis and architectural consultation</p>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-white">
                Inquire
              </Button>
            </div>
          </div>
        </div>

        {/* Add thin horizontal line at the bottom */}
        <div className="w-full h-px bg-gray-800 mt-24"></div>
      </div>
    </main>
  )
}


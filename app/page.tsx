import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import StructuralSimulation from "@/components/structural-simulation"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
        {/* Add thin horizontal line at the top */}
        <div className="w-full h-px bg-gray-800 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight">
              Ronald Bailie
              <span className="block text-gray-400 text-xl md:text-2xl mt-2 font-light">
                Licensed Architect, MS Mechanical Engineering
              </span>
            </h1>
            <div className="w-24 h-px bg-gray-700 my-6"></div>
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
              Creating spaces where aesthetic vision meets structural precision. A unique approach to architecture
              informed by engineering principles.
            </p>
            <div className="pt-6">
              <Link
                href="/projects"
                className="group inline-flex items-center text-white hover:text-gray-300 transition-colors"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] w-full border border-gray-800">
            {/* Add grid overlay to image */}
            {/* <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-l border-gray-800 h-full"></div>
              ))}
            </div>
            <div className="absolute inset-0 grid grid-rows-4 pointer-events-none z-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-t border-gray-800 w-full"></div>
              ))}
            </div> */}
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Ronald Bailie's architectural work"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 border border-gray-700 pointer-events-none"></div>
          </div>
        </div>

        {/* Add thin horizontal line as a divider */}
        <div className="w-full h-px bg-gray-800 my-16"></div>

        {/* Add structural engineering reference section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-light mb-2">Structural Integrity</h3>
              <p className="text-gray-400 text-sm">
                Designs that balance form and function through rigorous engineering principles
              </p>
            </div>
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-light mb-2">Technical Precision</h3>
              <p className="text-gray-400 text-sm">
                Meticulous attention to detail in both aesthetic and mechanical systems
              </p>
            </div>
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-light mb-2">Innovative Solutions</h3>
              <p className="text-gray-400 text-sm">
                Creative approaches to structural challenges through interdisciplinary expertise
              </p>
            </div>
          </div>
        </div>

        {/* Add Three.js Structural Simulation */}
        <div className="my-32">
          <div className="flex items-center mb-12">
            <div className="w-12 h-px bg-gray-700 mr-4"></div>
            <h2 className="text-2xl md:text-3xl font-light">Structural Dynamics</h2>
            <div className="flex-grow h-px bg-gray-800 ml-4"></div>
          </div>
          <div className="relative h-[500px] md:h-[600px] border border-gray-800">
            <StructuralSimulation />
            <div className="absolute bottom-0 left-0 p-4 bg-black/70 text-xs text-gray-400 max-w-xs">
              Annotation
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center mb-12">
            <div className="w-12 h-px bg-gray-700 mr-4"></div>
            <h2 className="text-2xl md:text-3xl font-light">Featured Projects</h2>
            <div className="flex-grow h-px bg-gray-800 ml-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Link href={`/projects/${item}`} key={item} className="group">
                <div className="relative h-[300px] border border-gray-800 overflow-hidden">
                  {/* Add grid overlay to project images */}
                  {/* <div className="absolute inset-0 grid grid-cols-3 pointer-events-none z-10 opacity-70">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border-l border-gray-800 h-full"></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 grid grid-rows-3 pointer-events-none z-10 opacity-70">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border-t border-gray-800 w-full"></div>
                    ))}
                  </div> */}
                  <Image
                    src={`/placeholder.svg?height=300&width=400`}
                    alt={`Project ${item}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-gray-700 pointer-events-none"></div>
                </div>
                <h3 className="mt-4 text-lg font-light">Project {item}</h3>
                <p className="text-gray-400 text-sm mt-1">Residential Design</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Add thin horizontal line at the bottom */}
        <div className="w-full h-px bg-gray-800 mt-24"></div>
      </div>
    </main>
  )
}


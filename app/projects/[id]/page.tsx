import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import StructuralSimulation from "@/components/structural-simulation"

// This would be replaced with actual data fetching in a real application
async function getProject(id: string) {
  // Sample project data
  const projects = {
    "1": {
      id: 1,
      title: "Modern Residential Complex",
      category: "Residential",
      year: "2022",
      location: "Seattle, WA",
      description:
        "A minimalist approach to multi-family housing with integrated sustainable systems. This project explores the intersection of aesthetic minimalism and engineering efficiency.",
      longDescription:
        "This residential complex was designed to maximize natural light while minimizing energy consumption. The structural system utilizes innovative cross-laminated timber construction, reducing the carbon footprint while maintaining structural integrity. The mechanical systems were designed to work in harmony with the building's orientation and envelope, creating a comfortable living environment with minimal energy input.",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      features: [
        "Passive solar design",
        "Cross-laminated timber structure",
        "Integrated mechanical systems",
        "Rainwater harvesting",
        "Community gardens",
      ],
      showSimulation: false,
    },
    // Add more projects as needed
  }

  return projects[id as keyof typeof projects]
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white pt-24">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <h1 className="text-4xl font-light tracking-tight mb-2">Project Not Found</h1>
          <Link href="/projects" className="text-gray-400 hover:text-white">
            Return to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="flex flex-col min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Add thin horizontal line at the top */}
        <div className="w-full h-px bg-gray-800 mb-12"></div>

        <Link href="/projects" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <h1 className="text-4xl font-light tracking-tight mb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-gray-400 mb-8">
          <p>{project.category}</p>
          <p>{project.year}</p>
          <p>{project.location}</p>
        </div>

        {/* Replace the divider with a more structural one */}
        <div className="flex items-center mb-12">
          <div className="w-12 h-px bg-gray-700 mr-4"></div>
          <div className="flex-grow h-px bg-gray-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-300 mb-6">{project.description}</p>
            <p className="text-gray-300 mb-8">{project.longDescription}</p>

            {/* Add structural engineering specifications section */}
            <div className="border-t border-gray-800 pt-6 mb-8">
              <h2 className="text-xl font-light mb-4">Engineering Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-l border-gray-800 pl-4">
                  <p className="text-sm text-gray-400">Structure Type</p>
                  <p className="text-gray-300">Steel Frame</p>
                </div>
                <div className="border-l border-gray-800 pl-4">
                  <p className="text-sm text-gray-400">Load Capacity</p>
                  <p className="text-gray-300">250 kN/m²</p>
                </div>
                <div className="border-l border-gray-800 pl-4">
                  <p className="text-sm text-gray-400">Foundation</p>
                  <p className="text-gray-300">Reinforced Concrete</p>
                </div>
                <div className="border-l border-gray-800 pl-4">
                  <p className="text-sm text-gray-400">Seismic Rating</p>
                  <p className="text-gray-300">Zone 4 Compliant</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-light mb-4">Features</h2>
            <ul className="list-none text-gray-300 space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-4 h-px bg-gray-700 mt-3 mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[400px] border border-gray-800">
            <Image src={project.images[0] || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 border border-gray-700 pointer-events-none"></div>
          </div>
        </div>

        {/* Add structural simulation if applicable */}
        {project.showSimulation && (
          <div className="mt-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-px bg-gray-700 mr-4"></div>
              <h2 className="text-xl font-light">Structural Analysis</h2>
              <div className="flex-grow h-px bg-gray-800 ml-4"></div>
            </div>
            <div className="relative h-[300px] border border-gray-800">
              <StructuralSimulation />
              <div className="absolute bottom-0 left-0 p-4 bg-black/70 text-xs text-gray-400 max-w-xs">
                Finite element analysis of concrete structural dynamics under various load conditions.
              </div>
            </div>
          </div>
        )}

        <div className="mt-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-px bg-gray-700 mr-4"></div>
            <h2 className="text-xl font-light">Project Gallery</h2>
            <div className="flex-grow h-px bg-gray-800 ml-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.images.slice(1).map((image, index) => (
              <div key={index} className="relative h-[200px] border border-gray-800">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 border border-gray-700 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Add thin horizontal line at the bottom */}
        <div className="w-full h-px bg-gray-800 mt-24"></div>
      </div>
    </main>
  )
}


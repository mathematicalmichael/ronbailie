import Link from "next/link"
import Image from "next/image"

export default function ProjectsPage() {
  // Sample project data - would be replaced with actual data
  const projects = [
    {
      id: 1,
      title: "Modern Residential Complex",
      category: "Residential",
      description: "A minimalist approach to multi-family housing with integrated sustainable systems.",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 2,
      title: "Urban Office Tower",
      category: "Commercial",
      description: "Innovative structural solutions for a 30-story office building with minimal environmental impact.",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 3,
      title: "Cultural Center",
      category: "Public",
      description: "A space designed to foster community engagement through thoughtful spatial arrangement.",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 4,
      title: "Sustainable Housing Development",
      category: "Residential",
      description: "Energy-efficient homes designed with passive cooling and heating systems.",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 5,
      title: "Research Facility",
      category: "Institutional",
      description: "A laboratory complex with specialized mechanical systems for environmental control.",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 6,
      title: "Waterfront Pavilion",
      category: "Public",
      description:
        "A lightweight structure designed to withstand coastal conditions while maintaining aesthetic elegance.",
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Add thin horizontal line at the top */}
        <div className="w-full h-px bg-gray-800 mb-12"></div>

        <h1 className="text-4xl font-light tracking-tight mb-2">Projects</h1>
        <p className="text-gray-400 mb-6">A selection of architectural and engineering works</p>

        {/* Replace the divider with a more structural one */}
        <div className="flex items-center mb-12">
          <div className="w-12 h-px bg-gray-700 mr-4"></div>
          <div className="flex-grow h-px bg-gray-800"></div>
        </div>

        {/* Add structural filter categories */}
        <div className="grid grid-cols-4 border-y border-gray-800 mb-12">
          <div className="py-4 px-2 text-center border-r border-gray-800">
            <button className="text-sm text-white hover:text-gray-300">All</button>
          </div>
          <div className="py-4 px-2 text-center border-r border-gray-800">
            <button className="text-sm text-gray-400 hover:text-white">Residential</button>
          </div>
          <div className="py-4 px-2 text-center border-r border-gray-800">
            <button className="text-sm text-gray-400 hover:text-white">Commercial</button>
          </div>
          <div className="py-4 px-2 text-center">
            <button className="text-sm text-gray-400 hover:text-white">Institutional</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id} className="group">
              <div className="relative h-[300px] border border-gray-800 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-gray-700 pointer-events-none"></div>
              </div>
              <div className="mt-4 border-t border-gray-800 pt-4">
                <p className="text-gray-400 text-sm">{project.category}</p>
                <h3 className="text-lg font-light mt-1">{project.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Add thin horizontal line at the bottom */}
        <div className="w-full h-px bg-gray-800 mt-24"></div>
      </div>
    </main>
  )
}


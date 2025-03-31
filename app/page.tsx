import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import StructuralSimulation from "../components/structural-simulation"
// Import the JSON data
import homeContent from "../content/homepage.json"

// Add function to fetch projects
async function getFeaturedProjects() {
  try {
    const projectsModule = await import("../content/projects.json");
    const allProjects = projectsModule.default;
    
    // Filter projects based on featuredProjects IDs
    const featuredProjects = homeContent.featuredProjects
      .map(id => allProjects.find(project => project.id === id))
      .filter(Boolean); // Remove any undefined entries
      
    return featuredProjects;
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    return [];
  }
}

export default async function Home() {
  // Fetch featured projects
  const featuredProjects = await getFeaturedProjects();

  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl flex-grow">
        {/* Hero Section - Change to left-aligned with simulation on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24">
          {/* Left column: Text */}
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-2">{homeContent.hero.title}</h1>
            <h2 className="text-lg md:text-xl text-gray-400 mb-1">{homeContent.hero.subtitle}</h2>
            
            {/* Add short horizontal line below subtitle */}
            <div className="w-32 h-px bg-gray-700 my-4"></div>
            
            <p className="text-md md:text-lg text-gray-500 mb-6">{homeContent.hero.tagline}</p>
            <p className="text-gray-400">{homeContent.hero.description}</p>
          </div>
          
          {/* Right column: Simulation */}
          <div className="relative h-[400px] md:h-[500px] border border-gray-800">
            <StructuralSimulation />
            <div className="absolute bottom-0 left-1 bg-black/70 text-xs text-gray-400 max-w-s">
              {homeContent.simulation.annotation}
            </div>
          </div>
        </div>

        {/* Horizontal line under hero section */}
        <div className="w-full h-px bg-gray-800 mb-24 mt-4"></div>

        {/* Features Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Map over features from JSON */}
            {homeContent.features.map((feature, index) => (
              <div key={index} className="border-t border-gray-800 pt-6">
                <h3 className="text-lg font-light mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="my-32">
          <div className="flex items-center mb-12">
            <div className="w-12 h-px bg-gray-700 mr-4"></div>
            <h2 className="text-2xl md:text-3xl font-light">Featured Projects</h2>
            <div className="flex-grow h-px bg-gray-800 ml-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} className="group">
                <div className="relative h-[300px] border border-gray-800 overflow-hidden">
                  <Image
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-gray-700 pointer-events-none"></div>
                </div>
                <div className="mt-4 border-t border-gray-800 pt-4">
                  <p className="text-gray-400 text-sm">{project.category}</p>
                  <h3 className="text-lg font-light mt-1">{project.title}</h3>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* View All Projects link */}
          <div className="mt-8 text-center">
            <Link href="/projects" className="inline-flex items-center text-white hover:text-gray-300">
              View All Projects 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}


import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import StructuralSimulation from "../../../components/structural-simulation"
import { notFound } from "next/navigation"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import projectsData from "../../../content/projects.json"; // Import the data directly

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  showSimulation: boolean;
  details: string[];
};

// Define a type for the props, including params
type ProjectPageProps = {
  params: {
    id: string;
  };
};

// Function to generate static paths
export async function generateStaticParams() {
  // Type assertion if needed, or ensure projectsData matches Project[]
  const projects = projectsData as Project[];
  return projects.map((project) => ({
    id: project.id,
  }));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fetch data for a specific project
// (Keep the getProject function as it might still be useful,
// but data is primarily resolved via params in static generation)
async function getProject(id: string): Promise<Project | null> {
  try {
    const projects = projectsData as Project[]; // Use imported data
    const project = projects.find(p => p.id === id)
    return project || null
  } catch (error) {
    console.error("Failed to fetch project:", error)
    return null
  }
}

// Update the function signature to accept the full props object
export default async function ProjectPage({ params }: ProjectPageProps) {
  // Log the params object to inspect it
  console.log('--- ProjectPage Start ---');
  // No need to await params here, it's directly available
  const id = params.id;
  console.log('Resolved params:', params);
  console.log('Extracted id:', id);

  // Now use the extracted id variable
  const project = await getProject(id);

  if (!project) {
    notFound();
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
        <p className="text-gray-400 mb-6 max-w-3xl">{project.description}</p>

        {/* Replace the divider with a more structural one */}
        <div className="flex items-center mb-12">
          <div className="w-12 h-px bg-gray-700 mr-4"></div>
          <div className="flex-grow h-px bg-gray-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1 space-y-6">
            <h2 className="text-xl font-light border-b border-gray-700 pb-2">Project Details</h2>
            <ul className="space-y-2 text-gray-300">
              {project.details.map((detail, index) => (
                <li key={index} className="text-sm">{detail}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            {project.images && project.images.length > 0 && (
              <div className="relative h-[400px] md:h-[500px] border border-gray-800 mb-8">
                <Image src={project.images[0]} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 border border-gray-700 pointer-events-none"></div>
              </div>
            )}
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

        {/* --- Project Gallery Section --- */}
        {/* Conditionally render the gallery only if there are more than 1 image */}
        {project.images && project.images.length > 1 && (
          <div className="mt-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-px bg-gray-700 mr-4"></div>
              <h2 className="text-xl font-light">Project Gallery</h2>
              <div className="flex-grow h-px bg-gray-800 ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Map starting from the second image (index 1) */}
              {project.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-[200px] border border-gray-800">
                  <Image
                    // Use a fallback placeholder if image path is missing/invalid, although ideally fix the paths
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 2}`} // Alt text index starts from 2
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 border border-gray-700 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* --- End of Project Gallery Section --- */}

        {/* Add thin horizontal line at the bottom */}
        <div className="w-full h-px bg-gray-800 mt-24"></div>
      </div>
    </main>
  )
}


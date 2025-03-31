import Link from "next/link"
import Image from "next/image"
import { Project } from "./[id]/page"; // Import the Project type
import ProjectGrid from "./project-grid"; // Import the new Client Component

// Define the Project type here if not imported
// type Project = {
//   id: string;
//   title: string;
//   category: string; // Added category
//   description: string;
//   images: string[];
//   showSimulation: boolean; // Optional: might not be needed on listing page
//   details: string[]; // Optional: might not be needed on listing page
// };

async function getProjectsData(): Promise<{ projects: Project[]; categories: string[] }> {
  try {
    const projectsModule = await import("@/content/projects.json");
    const projects: Project[] = projectsModule.default;
    // Extract unique categories
    const categories = Array.from(new Set(projects.map(p => p.category)));
    return { projects, categories };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return { projects: [], categories: [] }; // Return empty on error
  }
}

// Keep this as an Async Server Component to fetch data
export default async function ProjectsPage() {
  // Fetch projects data and unique categories
  const { projects, categories } = await getProjectsData();

  return (
    <main className="flex flex-col min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Top Separator */}
        <div className="w-full h-px bg-gray-800 mb-12"></div>

        <h1 className="text-4xl font-light tracking-tight mb-2">Projects</h1>
        <p className="text-gray-400 mb-6">A selection of architectural and engineering works</p>

        {/* Divider */}
        <div className="flex items-center mb-12">
          <div className="w-12 h-px bg-gray-700 mr-4"></div>
          <div className="flex-grow h-px bg-gray-800"></div>
        </div>

        {/* Render the Client Component responsible for filtering and grid display */}
        <ProjectGrid initialProjects={projects} categories={categories} />

        {/* Bottom Separator */}
        <div className="w-full h-px bg-gray-800 mt-24"></div>
      </div>
    </main>
  )
}


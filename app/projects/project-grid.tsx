"use client"; // Mark this as a Client Component

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "./[id]/page"; // Import the Project type

interface ProjectGridProps {
  initialProjects: Project[];
  categories: string[];
}

export default function ProjectGrid({ initialProjects, categories }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = selectedCategory === "All"
    ? initialProjects
    : initialProjects.filter(project => project.category === selectedCategory);

  const allCategories = ["All", ...categories.sort()]; // Add "All" and sort

  return (
    <>
      {/* Filter Buttons - Enclosed with borders */}
      {/* Container provides top, bottom, and left borders */}
      <div className="flex flex-wrap border-t border-b border-l border-gray-800 mb-12">
        {allCategories.map((category, index) => (
          // Each item grows. Add right border to ALL items.
          <div
            key={category}
            // Added border-r to all items
            className="flex-grow flex-basis-0 justify-center border-r border-gray-800"
          >
            {/* Inner div for padding */}
            <div className="py-3 px-4 text-center">
              <button
                className={`text-sm hover:text-white whitespace-nowrap ${
                  selectedCategory === category ? 'text-white font-medium' : 'text-gray-400'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
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
        {filteredProjects.length === 0 && (
           <p className="text-gray-400 md:col-span-2 lg:col-span-3 text-center py-8">
             No projects found for the selected category.
           </p>
         )}
      </div>
    </>
  );
} 
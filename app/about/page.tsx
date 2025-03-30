import Image from "next/image"
import StructuralSimulation from "@/components/structural-simulation"

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Add thin horizontal line at the top */}
        <div className="w-full h-px bg-gray-800 mb-12"></div>

        <h1 className="text-4xl font-light tracking-tight mb-2">About</h1>
        <p className="text-gray-400 mb-6">Ronald Bailie, Licensed Architect & Mechanical Engineer</p>

        {/* Replace the divider with a more structural one */}
        <div className="flex items-center mb-12">
          <div className="w-12 h-px bg-gray-700 mr-4"></div>
          <div className="flex-grow h-px bg-gray-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative h-[500px] border border-gray-800">
            <Image src="/placeholder.svg?height=500&width=400" alt="Ronald Bailie" fill className="object-cover" />
            <div className="absolute inset-0 border border-gray-700 pointer-events-none"></div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light">Background</h2>
            <p className="text-gray-300 leading-relaxed">
              Ronald Bailie is a licensed architect with a Master's degree in Mechanical Engineering, bringing a unique
              perspective to the built environment. With over 15 years of experience, Ronald's work bridges the gap
              between aesthetic vision and technical precision.
            </p>

            <p className="text-gray-300 leading-relaxed">
              His dual expertise allows for a holistic approach to design, where beautiful forms are constructed with
              confidence, backed by rigorous engineering principles. This integration results in spaces that are not
              only visually compelling but also structurally innovative and environmentally responsive.
            </p>

            {/* Replace the divider with a more structural one */}
            <div className="flex items-center my-8">
              <div className="w-12 h-px bg-gray-700 mr-4"></div>
              <div className="flex-grow h-px bg-gray-800"></div>
            </div>

            <h2 className="text-2xl font-light">Education</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="border-l border-gray-800 pl-4">
                <p className="font-medium">Master of Science in Mechanical Engineering</p>
                <p className="text-gray-400">Massachusetts Institute of Technology, 2008</p>
                <p className="text-sm text-gray-500 mt-1">
                  Thesis: "Structural Dynamics in Concrete Members: Simulation and Analysis"
                </p>
              </li>
              <li className="border-l border-gray-800 pl-4">
                <p className="font-medium">Bachelor of Architecture</p>
                <p className="text-gray-400">Rhode Island School of Design, 2006</p>
                <p className="text-sm text-gray-500 mt-1">Focus: Sustainable Design & Engineering Integration</p>
              </li>
            </ul>

            {/* Replace the divider with a more structural one */}
            <div className="flex items-center my-8">
              <div className="w-12 h-px bg-gray-700 mr-4"></div>
              <div className="flex-grow h-px bg-gray-800"></div>
            </div>

            <h2 className="text-2xl font-light">Professional Credentials</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="border-l border-gray-800 pl-4">
                <p className="font-medium">Licensed Architect</p>
                <p className="text-gray-400">NCARB Certified, 2010-Present</p>
              </li>
              <li className="border-l border-gray-800 pl-4">
                <p className="font-medium">Professional Engineer (PE)</p>
                <p className="text-gray-400">Mechanical, 2012-Present</p>
              </li>
              <li className="border-l border-gray-800 pl-4">
                <p className="font-medium">LEED Accredited Professional</p>
                <p className="text-gray-400">U.S. Green Building Council, 2011-Present</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Add research section with simulation */}
        <div className="mt-24">
          <div className="flex items-center mb-12">
            <div className="w-12 h-px bg-gray-700 mr-4"></div>
            <h2 className="text-2xl font-light">Research</h2>
            <div className="flex-grow h-px bg-gray-800 ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-xl font-light">Concrete Structural Dynamics</h3>
              <p className="text-gray-300 leading-relaxed">
                Ronald's MS research focused on simulating structural dynamics in concrete members, developing advanced
                computational models to predict behavior under various developing advanced computational models to
                predict behavior under various load conditions and stress factors. This research has directly informed
                his architectural practice, allowing for more innovative and efficient structural solutions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Using triangular finite element analysis, Ronald's simulations accurately predict how concrete
                structures respond to dynamic forces, enabling the design of safer, more resilient buildings that
                maintain aesthetic integrity.
              </p>
            </div>
            <div className="relative h-[500px] md:h-[600px] border border-gray-800">
              <StructuralSimulation />
            </div>
          </div>
        </div>

        <div className="mt-16">
          {/* Replace the divider with a more structural one */}
          <div className="flex items-center mb-12">
            <div className="w-12 h-px bg-gray-700 mr-4"></div>
            <h2 className="text-2xl font-light">Philosophy</h2>
            <div className="flex-grow h-px bg-gray-800 ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-xl font-light">Integration</h3>
              <p className="text-gray-300 mt-4">
                Architecture and engineering should not be separate disciplines but integrated practices that inform and
                enhance each other.
              </p>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-xl font-light">Sustainability</h3>
              <p className="text-gray-300 mt-4">
                Sustainable design is not an add-on but a fundamental principle that guides every decision from concept
                to completion.
              </p>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-xl font-light">Innovation</h3>
              <p className="text-gray-300 mt-4">
                Pushing the boundaries of what's possible through research, experimentation, and application of new
                technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Add engineering approach section */}
        <div className="mt-24">
          <div className="flex items-center mb-12">
            <div className="w-12 h-px bg-gray-700 mr-4"></div>
            <h2 className="text-2xl font-light">Engineering Approach</h2>
            <div className="flex-grow h-px bg-gray-800 ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                Ronald's engineering background informs every aspect of his architectural practice. From initial concept
                sketches to final construction documents, structural integrity and mechanical efficiency are considered
                alongside aesthetic goals.
              </p>

              <p className="text-gray-300 leading-relaxed">
                This integrated approach allows for innovative solutions that might otherwise be overlooked in a
                traditional design process. By understanding both the artistic and technical aspects of building, Ronald
                creates spaces that are not only beautiful but also structurally sound and functionally optimized.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border-l border-gray-800 pl-4">
                <h4 className="text-lg font-light mb-2">Structural Analysis</h4>
                <p className="text-gray-400 text-sm">
                  Advanced computational modeling for optimal structural solutions
                </p>
              </div>
              <div className="border-l border-gray-800 pl-4">
                <h4 className="text-lg font-light mb-2">Material Science</h4>
                <p className="text-gray-400 text-sm">
                  Innovative applications of traditional and emerging building materials
                </p>
              </div>
              <div className="border-l border-gray-800 pl-4">
                <h4 className="text-lg font-light mb-2">Systems Integration</h4>
                <p className="text-gray-400 text-sm">
                  Seamless coordination of structural, mechanical, and electrical systems
                </p>
              </div>
              <div className="border-l border-gray-800 pl-4">
                <h4 className="text-lg font-light mb-2">Performance Optimization</h4>
                <p className="text-gray-400 text-sm">
                  Energy modeling and environmental analysis for sustainable outcomes
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


import Image from "next/image"
import StructuralSimulation from "../../components/structural-simulation"
import aboutContent from "../../content/about.json"

// Helper function to render section dividers
function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center mb-12 mt-24">
      <div className="w-12 h-px bg-gray-700 mr-4"></div>
      <h2 className="text-2xl font-light">{title}</h2>
      <div className="flex-grow h-px bg-gray-800 ml-4"></div>
    </div>
  )
}

// Helper function to render simple lists (Education, Credentials)
function ListSection({ section }: { section: any }) {
  return (
    <>
      <div className="flex items-center my-8 pt-8"> {/* Added top padding */}
        <div className="w-12 h-px bg-gray-700 mr-4"></div>
         <h2 className="text-2xl font-light">{section.title}</h2>
        <div className="flex-grow h-px bg-gray-800 ml-4"></div>
      </div>
      <ul className="space-y-4 text-gray-300">
        {section.items.map((item: any, index: number) => (
          <li key={index} className="border-l border-gray-800 pl-4">
            {item.primary && <p className="font-medium">{item.primary}</p>}
            {item.secondary && <p className="text-gray-400">{item.secondary}</p>}
            {item.tertiary && <p className="text-sm text-gray-500 mt-1">{item.tertiary}</p>}
          </li>
        ))}
      </ul>
    </>
  )
}

export default function AboutPage() {
  // Find the specific sections we need for the initial layout
  const backgroundSection = aboutContent.sections.find(sec => sec.type === 'two-column-prose');
  const educationSection = aboutContent.sections.find(sec => sec.title === 'Education' && sec.type === 'list');
  const credentialsSection = aboutContent.sections.find(sec => sec.title === 'Professional Credentials' && sec.type === 'list');

  // Filter out the sections already handled in the initial layout for the main loop
  const remainingSections = aboutContent.sections.filter(sec =>
    sec.type !== 'two-column-prose' &&
    !(sec.title === 'Education' && sec.type === 'list') &&
    !(sec.title === 'Professional Credentials' && sec.type === 'list')
  );

  return (
    <main className="flex flex-col min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Top Separator */}
        <div className="w-full h-px bg-gray-800 mb-12"></div>

        {/* Header */}
        <h1 className="text-4xl font-light tracking-tight mb-2">{aboutContent.title}</h1>
        <p className="text-gray-400 mb-6">{aboutContent.subtitle}</p>

        {/* Divider */}
        <div className="flex items-center mb-12">
          <div className="w-12 h-px bg-gray-700 mr-4"></div>
          <div className="flex-grow h-px bg-gray-800"></div>
        </div>

        {/* Initial Two-Column Layout (Image + Background/Edu/Creds) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image */}
          <div className="relative h-[500px] border border-gray-800 md:sticky md:top-24"> {/* Optional: make image sticky */}
            <Image src={aboutContent.mainImage} alt={aboutContent.title} fill className="object-cover" />
            <div className="absolute inset-0 border border-gray-700 pointer-events-none"></div>
          </div>

          {/* Right Column: Content (Background, Education, Credentials) */}
          <div>
            {/* Background Section Content */}
            {backgroundSection && (
              <div className="space-y-6 mb-8"> {/* Add margin bottom */}
                <h2 className="text-2xl font-light">{backgroundSection.title}</h2>
                {backgroundSection.content.map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-300 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            )}

            {/* Education Section Content */}
            {educationSection && (
              <ListSection section={educationSection} />
            )}

             {/* Credentials Section Content */}
            {credentialsSection && (
               <ListSection section={credentialsSection} />
            )}
          </div>
        </div>

        {/* Render remaining sections dynamically */}
        {remainingSections.map((section, index) => {
          // No need to filter here anymore, already done above

          switch (section.type) {
            case 'two-column-prose-simulation':
              return (
                <div key={index}>
                  <SectionDivider title={section.title} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h3 className="text-xl font-light">{section.contentTitle}</h3>
                      {section.content.map((paragraph: string, pIndex: number) => (
                        <p key={pIndex} className="text-gray-300 leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                    <div className="relative h-[500px] md:h-[600px] border border-gray-800">
                      {/* Place the simulation here */}
                      <StructuralSimulation />
                    </div>
                  </div>
                </div>
              );

            case 'three-column':
              return (
                <div key={index}>
                  <SectionDivider title={section.title} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {section.items.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="border-t border-gray-800 pt-6">
                        <h3 className="text-xl font-light">{item.title}</h3>
                        <p className="text-gray-300 mt-4">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );

            case 'two-column-prose-grid':
              return (
                <div key={index}>
                  <SectionDivider title={section.title} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      {section.content.map((paragraph: string, pIndex: number) => (
                         <p key={pIndex} className="text-gray-300 leading-relaxed">{paragraph}</p>
                       ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {section.gridItems.map((item: any, gIndex: number) => (
                        <div key={gIndex} className="border-l border-gray-800 pl-4">
                          <h4 className="text-lg font-light mb-2">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );

            default:
              return null; // Or render a default section layout
          }
        })}

        {/* Bottom Separator */}
        <div className="w-full h-px bg-gray-800 mt-24"></div>
      </div>
    </main>
  );
}


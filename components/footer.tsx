import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      {/* Add thin horizontal line at the top */}
      <div className="w-full h-px bg-gray-800"></div>

      <div className="container mx-auto px-4 py-12">
        {/* Adjust grid to two columns as contact info is removed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Removed border-r and pr-8 as it's now the first of two */}
          <div>
            <h3 className="text-lg font-light mb-4">Ronald Bailie</h3>
            <p className="text-gray-400 text-sm">
              Licensed Architect
              <br />
              MS Mechanical Engineering
            </p>
            <div className="w-12 h-px bg-gray-800 my-4"></div>
            <p className="text-gray-500 text-xs">
              Bridging the gap between
              <br />
              architectural vision and
              <br />
              engineering precision
            </p>
          </div>

          {/* Removed the entire Contact div block */}

          {/* This Links section now becomes the second column */}
          <div>
            <h3 className="text-lg font-light mb-4">Links</h3>
            <div className="grid grid-cols-2 gap-4">
              {["Projects", "About", "Contact", "PDF Portfolio"].map((item) => (
                <Link
                  key={item}
                  href={item === "PDF Portfolio" ? "/portfolio.pdf" : `/${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white text-sm transition-colors border-l border-gray-800 pl-4"
                  {...(item === "PDF Portfolio" ? { target: "_blank" } : {})}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Ronald Bailie. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="w-12 h-px bg-gray-800 mr-4"></div>
            <p className="text-gray-500 text-xs">Architect x Engineer</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


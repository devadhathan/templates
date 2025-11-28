"use client"

import { useState, useEffect } from "react"
import { Settings } from "lucide-react"

export function Slide() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("/quality-inspection-landscape.jpg")

  useEffect(() => {
    const generateImage = async () => {
      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt:
              "A professional quality inspection scene with modern technology, clean and bright environment, photorealistic style",
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setImageUrl(data.imageUrl)
        }
      } catch (error) {
        console.error("[v0] Error generating image:", error)
      }
    }

    generateImage()
  }, [])

  return (
    <div className="w-full max-w-7xl aspect-video bg-neutral-100 rounded-2xl shadow-2xl overflow-hidden">
      <div className="h-full flex flex-col p-12 md:p-16">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in-blur opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          <h1 className="font-bold text-neutral-800 mb-4 text-4xl">The Final Inspection</h1>
          <p className="text-neutral-600 max-w-md text-base">
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </p>
        </div>

        {/* Content Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="animate-fade-in-blur opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] flex items-center">
            <div className="w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer group">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Quality inspection landscape"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Cards Section */}
          <div className="flex flex-col gap-6 justify-center">
            {/* Card 1 */}
            <div
              className="animate-fade-in-blur opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]"
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`bg-green-100 border-2 border-green-200 rounded-3xl p-8 transition-all duration-300 cursor-pointer ${
                  hoveredCard === 1 ? "shadow-xl scale-105 border-green-300 bg-green-200" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <Settings
                    className={`w-8 h-8 text-green-700 transition-transform duration-300 ${
                      hoveredCard === 1 ? "rotate-90" : ""
                    }`}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-800 mb-3 text-lg">Heading 1</h3>
                    <p className="text-neutral-700 leading-relaxed">
                      A three-step process for quality assurance and system testing to guarantee peak performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="animate-fade-in-blur opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]"
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`bg-red-100 border-2 border-red-200 rounded-3xl p-8 transition-all duration-300 cursor-pointer ${
                  hoveredCard === 2 ? "shadow-xl scale-105 border-red-300 bg-red-200" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <Settings
                    className={`w-8 h-8 text-red-700 transition-transform duration-300 ${
                      hoveredCard === 2 ? "rotate-90" : ""
                    }`}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-800 mb-3 text-base">Heading 2</h3>
                    <p className="text-neutral-700 leading-relaxed text-base">
                      A three-step process for quality assurance and system testing to guarantee peak performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

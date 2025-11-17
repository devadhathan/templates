"use client"

import { useState, useEffect } from "react"

export default function HVACSlide() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const imagePrompts = [
    "professional HVAC system components and ductwork close-up",
    "HVAC technician inspecting air conditioning unit with tools",
    "professional HVAC cleaning equipment and vacuum system",
    "clean residential air vent in modern home interior",
    "HVAC quality testing with digital measurement tools",
    "HVAC system performance dashboard with metrics and graphs",
  ]

  useEffect(() => {
    // Generate all images on mount
    const generateImages = async () => {
      try {
        const response = await fetch("/api/generate-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompts: imagePrompts }),
        })

        const data = await response.json()
        if (data.images) {
          setImages(data.images)
        }
      } catch (error) {
        console.error("Failed to generate images:", error)
      } finally {
        setLoading(false)
      }
    }

    generateImages()
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-[1600px] aspect-[16/9] bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in duration-700">
        <div className="h-full grid grid-cols-2 gap-8 p-12 flex flex-col">
          {/* Left Content */}
          <div className="flex flex-col justify-top space-y-64 mx-0">
            <div className="animate-in slide-in-from-left duration-700">
              <h1 className="font-bold text-gray-900 mb-6 text-5xl">What is this?</h1>
              <p className="text-gray-600 leading-relaxed text-base">
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>
              <div className="text-base text-gray-700 leading-relaxed animate-in slide-in-from-left duration-700 delay-200">
                <p className="text-base">
                  Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                  detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
                </p>
              </div>
            </div>

            <div className="animate-in slide-in-from-bottom duration-700 delay-500 left-24 mx-4">
              <img
                src="/images/design-mode/image(1).png"
                alt="Decorative frames"
                className="h-auto opacity-20 px-0 w-28 mx-80"
              />
            </div>
          </div>

          {/* Right Images Grid */}
          <div className="grid grid-cols-2 gap-4 flex my-0 pb-0 mb-96">
            {imagePrompts.map((prompt, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden bg-gray-100 animate-in zoom-in duration-500 cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:z-10 ${
                  hoveredIndex === index ? "ring-4 ring-blue-500" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {loading || !images[index] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                    <p className="text-gray-500 text-xs text-center">Generating image...</p>
                  </div>
                ) : (
                  <img
                    src={images[index] || "/placeholder.svg"}
                    alt={prompt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

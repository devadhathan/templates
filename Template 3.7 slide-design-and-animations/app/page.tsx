"use client"

import { useState, useEffect } from "react"
import { Settings } from "lucide-react"

interface CardData {
  id: number
  heading: string
  description: string
}

const cards: CardData[] = [
  {
    id: 1,
    heading: "Heading 1",
    description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
  },
  {
    id: 2,
    heading: "Heading 2",
    description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
  },
]

export default function FinalInspectionSlide() {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    // Generate image based on slide context
    const generateImage = async () => {
      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt:
              "Beautiful landscape with green rolling hills, blue sky with white clouds, peaceful nature scene, high quality, photorealistic",
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setImageUrl(data.imageUrl)
        }
      } catch (error) {
        console.error("[v0] Error generating image:", error)
        // Fallback to placeholder
        setImageUrl("/peaceful-landscape-hills.jpg")
      } finally {
        setIsLoading(false)
      }
    }

    generateImage()
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
      {/* 16:9 Container */}
      <div
        className="absolute left-1/2 top-1/2 w-[95vw] max-w-[1920px] -translate-x-1/2 -translate-y-1/2"
        style={{ aspectRatio: "16/9" }}
      >
        <div className="flex h-full">
          {/* Left Content Section */}
          <div className="flex w-1/2 flex-col justify-center bg-stone-50 p-12">
            {/* Title with fade-in animation */}
            <h1 className="mb-6 animate-fade-in text-5xl font-bold text-stone-800 animate-delay-200">
              The Final Inspection
            </h1>

            {/* Subtitle with fade-in animation */}
            <p className="mb-12 animate-fade-in text-lg text-stone-600 leading-relaxed animate-delay-400">
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>

            {/* Cards with staggered blur-in animations */}
            <div className="flex gap-6">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="group relative flex-1 animate-blur-in cursor-pointer"
                  style={{
                    animationDelay: `${600 + index * 200}ms`,
                    animationFillMode: "backwards",
                  }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card */}
                  <div
                    className={`
                    h-full rounded-3xl border border-stone-300 bg-white p-6
                    shadow-sm transition-all duration-300
                    ${hoveredCard === card.id ? "scale-105 shadow-xl -translate-y-2" : "hover:shadow-md"}
                  `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                      mb-4 inline-flex transition-transform duration-300
                      ${hoveredCard === card.id ? "rotate-90 scale-110" : ""}
                    `}
                    >
                      <Settings className="h-8 w-8 text-stone-700" />
                    </div>

                    {/* Heading */}
                    <h2 className="mb-3 text-xl font-semibold text-stone-800">{card.heading}</h2>

                    {/* Description */}
                    <p className="text-sm text-stone-600 leading-relaxed">{card.description}</p>
                  </div>

                  {/* Hover effect overlay */}
                  {hoveredCard === card.id && (
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-fade-in" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative w-1/2 overflow-hidden">
            {isLoading ? (
              <div className="flex h-full items-center justify-center bg-blue-100">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              </div>
            ) : (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Beautiful landscape with rolling hills"
                className="h-full w-full animate-fade-in object-cover"
                style={{ animationDelay: "1000ms", animationFillMode: "backwards" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const cards = [
  {
    id: 1,
    title: "Visual Inspection",
    description:
      "Inspect all accessible ductwork with cameras or flashlights to confirm that no debris or blockages remain after cleaning.",
    imagePrompt: "worker inspecting industrial ductwork with flashlight in blue industrial setting",
  },
  {
    id: 2,
    title: "Address Deficiencies",
    description:
      "If any areas require more attention, they must be immediately addressed to ensure a complete and thorough cleaning.",
    imagePrompt: "aerial view of green circuit board with electronic components",
  },
  {
    id: 3,
    title: "System Verification",
    description:
      "Test the entire HVAC system to verify strong, unobstructed airflow and confirm the system is operating at peak efficiency.",
    imagePrompt: "hand measuring white HVAC equipment with calipers and tools",
  },
]

export default function PresentationSlide() {
  const [isVisible, setIsVisible] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({})
  const [isGenerating, setIsGenerating] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const generateImages = async () => {
      try {
        const imagePromises = cards.map(async (card) => {
          const response = await fetch("/api/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: card.imagePrompt }),
          })
          const data = await response.json()
          return { id: card.id, url: data.imageUrl }
        })

        const results = await Promise.all(imagePromises)
        const imagesMap = results.reduce(
          (acc, { id, url }) => {
            acc[id] = url
            return acc
          },
          {} as Record<number, string>,
        )
        setGeneratedImages(imagesMap)
      } catch (error) {
        console.error("[v0] Error generating images:", error)
      } finally {
        setIsGenerating(false)
      }
    }

    generateImages()
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#FDB9B8" }}>
      {/* 16:9 aspect ratio container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-[177.78vh] max-h-[56.25vw] px-16 py-12 flex flex-col">
          {/* Title Section */}
          <div className="mb-8">
            <h1
              className="text-[64px] font-semibold leading-tight text-black mb-4"
              style={{
                animation: isVisible ? "fadeInUp 0.8s ease-out both" : "none",
              }}
            >
              The Final
              <br />
              Inspection
            </h1>
            <p
              className="text-[14px] font-normal text-black/80 max-w-[480px]"
              style={{
                animation: isVisible ? "fadeInUp 0.8s ease-out 0.2s both" : "none",
              }}
            >
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="flex items-stretch justify-center gap-6 w-full max-w-[920px]">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="group relative flex-1 max-w-[280px] rounded-3xl border-2 border-black/20 bg-[#FDB9B8] p-6 flex flex-col cursor-pointer transition-all duration-500"
                  style={{
                    animation: isVisible
                      ? `disperseFromCenter 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s both`
                      : "none",
                    transform:
                      hoveredCard === card.id
                        ? "translateY(-12px) scale(1.03)"
                        : hoveredCard !== null
                          ? "scale(0.97)"
                          : "none",
                  }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none"
                    style={{
                      opacity: hoveredCard === card.id ? 1 : 0,
                      boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 40px rgba(253,185,184,0.4)",
                    }}
                  />

                  {/* Card Image */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4">
                    <div
                      className="absolute inset-0 transition-all duration-700"
                      style={{
                        transform: hoveredCard === card.id ? "scale(1.15) rotate(2deg)" : "scale(1)",
                      }}
                    >
                      <Image
                        src={
                          generatedImages[card.id] ||
                          `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(card.imagePrompt) || "/placeholder.svg"}`
                        }
                        alt={card.title}
                        fill
                        className="object-cover transition-all duration-700"
                        style={{
                          filter: hoveredCard === card.id ? "brightness(1.1) contrast(1.05)" : "brightness(1)",
                        }}
                      />
                    </div>
                    <div
                      className="absolute inset-0 rounded-2xl transition-all duration-500"
                      style={{
                        background:
                          hoveredCard === card.id
                            ? "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)"
                            : "transparent",
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 flex flex-col relative z-10">
                    <h3
                      className="text-[16px] font-semibold text-black mb-3 transition-all duration-500"
                      style={{
                        transform: hoveredCard === card.id ? "translateX(4px)" : "translateX(0)",
                        animation: isVisible ? `slideInLeft 0.6s ease-out ${0.4 + index * 0.1}s both` : "none",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-[14px] font-normal text-black/70 leading-relaxed transition-all duration-500"
                      style={{
                        color: hoveredCard === card.id ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)",
                        transform: hoveredCard === card.id ? "translateX(4px)" : "translateX(0)",
                        animation: isVisible ? `slideInLeft 0.6s ease-out ${0.5 + index * 0.1}s both` : "none",
                      }}
                    >
                      {card.description}
                    </p>
                  </div>

                  <div
                    className="absolute top-4 right-4 w-8 h-8 rounded-full transition-all duration-500"
                    style={{
                      background:
                        hoveredCard === card.id
                          ? "radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)"
                          : "transparent",
                      transform: hoveredCard === card.id ? "scale(3)" : "scale(0)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes disperseFromCenter {
          0% {
            opacity: 0;
            transform: translateY(-150px) scale(0.3);
            filter: blur(10px);
          }
          60% {
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

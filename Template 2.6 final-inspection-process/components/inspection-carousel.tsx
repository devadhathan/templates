"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface SlideData {
  title: string
  description: string
  imagePrompt: string
  color: string
}

const slides: SlideData[] = [
  {
    title: "Visual Inspection",
    description:
      "Inspect all accessible ductwork with cameras or flashlights to confirm that no debris or blockages remain after cleaning.",
    imagePrompt:
      "professional technician in safety gear inspecting industrial HVAC equipment with flashlight in modern facility",
    color: "#A5C8E6",
  },
  {
    title: "Address Deficiencies",
    description:
      "If any areas require more attention, they must be immediately addressed to ensure a complete and thorough cleaning.",
    imagePrompt: "detailed macro photograph of green circuit board with electronic components and copper traces",
    color: "#CF95FE",
  },
  {
    title: "System Verification",
    description:
      "Test the entire HVAC system to verify strong, unobstructed airflow and confirm the system is operating at peak efficiency.",
    imagePrompt: "precision caliper measuring white mechanical parts and components on clean surface",
    color: "#FE949D",
  },
]

export default function InspectionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1) // Start with middle card
  const [images, setImages] = useState<Record<number, string>>({
    0: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(slides[0].imagePrompt)}`,
    1: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(slides[1].imagePrompt)}`,
    2: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(slides[2].imagePrompt)}`,
  })
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10s
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % slides.length)
  }

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length)
  }

  const getCardStyle = (index: number) => {
    const diff = (index - currentIndex + slides.length) % slides.length

    if (diff === 0) {
      // Center card - largest
      return {
        transform: "translateX(0) scale(1)",
        zIndex: 30,
        opacity: 1,
      }
    } else if (diff === 1 || diff === -2) {
      // Right card
      return {
        transform: "translateX(60%) scale(0.75)",
        zIndex: 20,
        opacity: 0.7,
      }
    } else {
      // Left card
      return {
        transform: "translateX(-60%) scale(0.75)",
        zIndex: 20,
        opacity: 0.7,
      }
    }
  }

  return (
    <div className="w-full aspect-video max-w-7xl mx-auto px-8 py-12 relative" style={{ backgroundColor: "#E0C3F0" }}>
      {/* Header */}
      <div className="mb-16 text-left">
        <h1 className="text-5xl font-bold text-purple-900 mb-4 text-center">The Final Inspection</h1>
        <p className="text-lg text-purple-800 max-w-2xl mx-auto">
          A three-step process for quality assurance and system testing to guarantee peak performance.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative h-[500px] flex items-center justify-center">
        {slides.map((slide, index) => {
          const style = getCardStyle(index)
          const isCenter = (index - currentIndex + slides.length) % slides.length === 0

          return (
            <Card
              key={index}
              className={`absolute w-[400px] transition-all duration-700 ease-in-out cursor-pointer shadow-2xl border-0`}
              style={{ ...style, backgroundColor: slide.color }}
              onClick={() => !isCenter && goToSlide(index)}
            >
              <CardContent className="p-6">
                <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-white/20">
                  {images[index] ? (
                    <img
                      src={images[index] || "/placeholder.svg"}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">{slide.title}</h2>
                <p className="text-sm text-gray-800 text-center leading-relaxed font-sans">{slide.description}</p>
              </CardContent>
            </Card>
          )
        })}

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-purple-700 w-8" : "bg-purple-400 hover:bg-purple-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

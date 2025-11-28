"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface ImageData {
  url: string
  alt: string
}

export default function PresentationSlide() {
  const [images, setImages] = useState<ImageData[]>([
    { url: "/placeholder.svg?height=400&width=400", alt: "Loading..." },
    { url: "/placeholder.svg?height=400&width=400", alt: "Loading..." },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchImages() {
      try {
        // Fetch images from nano banana API with context
        const response = await fetch("/api/nano-banana", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            context: "quality assurance inspection, peak performance testing, professional business environment",
            count: 2,
          }),
        })
        const data = await response.json()

        if (data.images && data.images.length >= 2) {
          setImages(data.images.slice(0, 2))
        }
      } catch (error) {
        console.error("[v0] Error fetching images from nano banana API:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center p-8" style={{ backgroundColor: "#F4F5F2" }}>
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative w-full max-w-7xl" style={{ aspectRatio: "16/9" }}>
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backgroundColor: "#F4F5F2" }}>
          <div className="grid h-full grid-cols-[1fr_auto] gap-8 p-12">
            {/* Left Content Section */}
            <div className="flex flex-col justify-center space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900">The Final Inspection</h1>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  A three-step process for quality assurance and system testing to guarantee peak performance.
                </p>
              </div>

              {/* Content Sections */}
              <div className="space-y-6">
                {/* Section 1 */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-neutral-800">1. Heading</h2>
                  <ul className="list-disc list-inside text-neutral-600 space-y-1">
                    <li>
                      A three-step process for quality assurance and system testing to guarantee peak performance.
                    </li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-neutral-800">2. Heading</h2>
                  <ul className="list-disc list-inside text-neutral-600 space-y-1">
                    <li>
                      A three-step process for quality assurance and system testing to guarantee peak performance.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Images Section */}
            <div className="flex flex-col justify-center items-end gap-6 pr-8">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-72 h-56 overflow-hidden rounded-3xl shadow-lg"
                  style={{
                    transform: index === 0 ? "rotate(5deg)" : "rotate(-3deg)",
                  }}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Settings } from "lucide-react"
import { useState, useEffect } from "react"

export default function SlidePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const fetchImage = async () => {
      try {
        console.log("[v0] Fetching image from nano banana API...")
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: "rolling green hills landscape under blue sky with white clouds, peaceful nature scene",
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        if (data.imageUrl) {
          console.log("[v0] Image generated successfully")
          setImageUrl(data.imageUrl)
        } else {
          throw new Error("No image URL in response")
        }
      } catch (error) {
        console.error("[v0] Failed to generate image:", error)
        // Fallback to placeholder
        setImageUrl("/rolling-green-hills-under-blue-sky-with-white-clou.jpg")
      }
    }

    fetchImage()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e8e5e0] p-8">
      <div className="w-full max-w-7xl aspect-video bg-[#e8e5e0] flex gap-12">
        <div
          className={`flex-1 flex flex-col justify-center transition-all duration-1000 ${
            isVisible ? "opacity-100 blur-0 translate-x-0" : "opacity-0 blur-sm -translate-x-8"
          }`}
        >
          <h1 className="font-medium text-[#3d3d3d] mb-8 text-4xl">The Final Inspection</h1>

          <div className="space-y-6">
            <p
              className="text-lg text-[#6b6b6b] leading-relaxed transition-all duration-300 hover:text-[#3d3d3d] hover:translate-x-2"
              style={{ transitionDelay: "100ms" }}
            >
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>

            <p
              className="text-[#6b6b6b] leading-relaxed text-base transition-all duration-300 hover:text-[#3d3d3d] hover:translate-x-2"
              style={{ transitionDelay: "200ms" }}
            >
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>

            <p
              className="text-lg text-[#6b6b6b] leading-relaxed transition-all duration-300 hover:text-[#3d3d3d] hover:translate-x-2"
              style={{ transitionDelay: "300ms" }}
            >
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col gap-8 justify-center transition-all duration-1000 ${
            isVisible ? "opacity-100 blur-0 translate-x-0" : "opacity-0 blur-sm translate-x-8"
          }`}
        >
          {/* Image Container */}
          <div
            className="relative overflow-hidden rounded-3xl group cursor-pointer"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <img
              src={imageUrl || "/rolling-green-hills-under-blue-sky-with-white-clou.jpg"}
              alt="Rolling green hills with blue sky"
              className={`w-full h-auto object-cover transition-all duration-700 ${
                isImageHovered ? "scale-105 blur-[2px]" : "scale-100 blur-0"
              }`}
            />
            <div
              className={`absolute inset-0 bg-[#3d3d3d]/0 transition-all duration-500 ${
                isImageHovered ? "bg-[#3d3d3d]/10" : ""
              }`}
            />
          </div>

          {/* Bottom Card */}
          <div
            className={`border-2 border-[#d0ccc4] rounded-3xl p-6 bg-transparent transition-all duration-500 cursor-pointer ${
              isCardHovered
                ? "border-[#3d3d3d] bg-white/50 shadow-lg scale-[1.02] -translate-y-1"
                : "hover:border-[#a0a0a0]"
            }`}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
          >
            <div className="flex items-start gap-4">
              <Settings
                className={`w-8 h-8 text-[#3d3d3d] flex-shrink-0 transition-all duration-500 ${
                  isCardHovered ? "rotate-90 scale-110" : "rotate-0 scale-100"
                }`}
              />
              <div>
                <h2
                  className={`text-2xl font-medium text-[#3d3d3d] mb-2 transition-all duration-300 ${
                    isCardHovered ? "translate-x-1" : ""
                  }`}
                >
                  Heading 4
                </h2>
                <p className="text-base text-[#6b6b6b] leading-relaxed">
                  A three-step process for quality assurance and system testing to guarantee peak performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Settings } from "lucide-react"
import { useEffect, useState } from "react"

export default function InspectionSlide() {
  const [isVisible, setIsVisible] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    generateImage()
  }, [])

  const generateImage = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            "A serene landscape with lush green rolling hills under a bright blue sky with fluffy white clouds, peaceful and vibrant nature scene, photorealistic, high quality",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate image")
      }

      const data = await response.json()
      setGeneratedImage(data.imageUrl)
    } catch (error) {
      console.error("[v0] Failed to generate image:", error)
      setGeneratedImage(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LX7sTxdpojG3FKOsHat8V6ehuKSGFG.png",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Section - Light */}
      <div className="flex-1 bg-[#E8E4DC] flex items-center justify-between px-16 lg:px-24">
        <div
          className={`max-w-xl transition-all duration-1000 ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}
        >
          <h1 className="text-5xl font-bold text-[#2A2A2A] mb-6 text-balance lg:text-4xl">The Final Inspection</h1>
          <p className="text-[#6B6B6B] leading-relaxed text-base">
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ease-out ${
            isVisible ? "translate-x-0 opacity-100 rotate-6" : "translate-x-20 opacity-0 rotate-0"
          }`}
        >
          <div className="relative group">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-12">
              {isLoading ? (
                <div className="w-full h-full bg-gradient-to-br from-[#A8AAAC] to-[#6B6B6B] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                <img
                  src={generatedImage || "/placeholder.svg"}
                  alt="AI-generated landscape with green hills"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Dark */}
      <div className="flex-1 bg-[#262A2D] flex items-center justify-center px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
          {[1, 2, 3, 4].map((num, index) => (
            <div
              key={num}
              className={`transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="group relative h-full">
                <div className="h-full bg-[#2E3336] border border-[#3E4346] rounded-2xl p-8 transition-all duration-300 hover:bg-[#353A3D] hover:border-[#4E5356] hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#3E4346] flex items-center justify-center transition-all duration-300 group-hover:bg-[#4E5356] group-hover:rotate-90">
                      <Settings className="w-6 h-6 text-[#A8AAAC]" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#E8E8E8] mb-4 text-lg">Heading {num}</h3>
                  <p className="text-[#A8AAAC] leading-relaxed text-base">
                    A three-step process for quality assurance and system testing to guarantee peak performance.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

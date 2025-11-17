"use client"

import { useEffect, useState } from "react"

export default function SlidePage() {
  const [images, setImages] = useState({
    microscopic: "/nano-banana-microscopic-view.jpg",
    laboratory: "/banana-scientific-laboratory.jpg",
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoadingImages, setIsLoadingImages] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const [microscopicRes, laboratoryRes] = await Promise.all([
          fetch("/api/nano-banana?type=microscopic"),
          fetch("/api/nano-banana?type=laboratory"),
        ])

        const microscopicData = await microscopicRes.json()
        const laboratoryData = await laboratoryRes.json()

        console.log("[v0] Nano Banana API Response:", {
          microscopic: microscopicData.metadata,
          laboratory: laboratoryData.metadata,
        })

        setImages({
          microscopic: microscopicData.imageUrl,
          laboratory: laboratoryData.imageUrl,
        })
        setIsLoadingImages(false)
      } catch (error) {
        console.error("[v0] Error fetching banana images:", error)
        setIsLoadingImages(false)
      }
    }

    fetchImages()
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#AEA2FD" }}>
      {/* 16:9 aspect ratio container */}
      <div
        className="w-full max-w-7xl aspect-[16/9] rounded-2xl shadow-2xl p-12 flex items-center"
        style={{ backgroundColor: "#AEA2FD" }}
      >
        {/* Left content section */}
        <div className="flex-1 pr-12">
          <h1
            className="font-bold text-gray-900 mb-6 text-5xl transition-all duration-1000 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            }}
          >
            What is this?
          </h1>

          <p
            className="text-gray-800 mb-8 text-base transition-all duration-1000 ease-out delay-200"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            }}
          >
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </p>

          <p
            className="text-base text-gray-700 leading-relaxed transition-all duration-1000 ease-out delay-300"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense, detailed
            breakdown of the essential techniques you'll need for comprehensive system cleaning.
          </p>
        </div>

        <div className="flex gap-6" style={{ width: "45%" }}>
          {/* First div - image at top */}
          <div
            className="flex-1 flex items-start h-[500px] transition-all duration-1000 ease-out delay-500"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateX(0)" : "translateX(50px)",
            }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl w-full h-[280px] group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105">
              {isLoadingImages && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50">
                  <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={images.microscopic || "/placeholder.svg"}
                alt="Nano banana microscopic view"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Second div - image at bottom */}
          <div
            className="flex-1 flex items-end h-[500px] transition-all duration-1000 ease-out delay-700"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateX(0)" : "translateX(50px)",
            }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl w-full h-[280px] group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105">
              {isLoadingImages && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50">
                  <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={images.laboratory || "/placeholder.svg"}
                alt="Nano banana in laboratory"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

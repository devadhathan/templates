"use client"

import { useState, useEffect } from "react"

export default function SlidePage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationId, setGenerationId] = useState<string | null>(null)

  useEffect(() => {
    if (!generationId) return

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/generate-video?id=${generationId}`)
        const data = await response.json()

        console.log("[v0] Polling video status:", data)

        if (data.status === "completed" && data.videoUrl) {
          setVideoUrl(data.videoUrl)
          setIsGenerating(false)
          setGenerationId(null)
          clearInterval(pollInterval)
        } else if (data.status === "failed") {
          console.error("[v0] Video generation failed:", data.error)
          setIsGenerating(false)
          setGenerationId(null)
          clearInterval(pollInterval)
        }
      } catch (error) {
        console.error("[v0] Error polling video status:", error)
      }
    }, 3000)

    return () => clearInterval(pollInterval)
  }, [generationId])

  const generateVideo = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            "Professional HVAC technician performing comprehensive air duct cleaning process, using industrial equipment to clean ventilation system, detailed demonstration of professional cleaning techniques for commercial HVAC systems",
        }),
      })

      const data = await response.json()
      console.log("[v0] Video generation response:", data)

      if (data.generationId) {
        setGenerationId(data.generationId)
      } else if (data.error) {
        console.error("[v0] Error from API:", data.error)
        setIsGenerating(false)
      }
    } catch (error) {
      console.error("[v0] Error generating video:", error)
      setIsGenerating(false)
    }
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
      {/* 16:9 Slide Container */}
      <div className="relative w-full max-w-[1920px] mx-auto" style={{ aspectRatio: "16 / 9" }}>
        <div className="absolute inset-0 flex">
          {/* Left Section - Video (65%) */}
          <div className="w-[65%] bg-gradient-to-br from-sky-200 to-sky-300 relative overflow-hidden">
            {videoUrl ? (
              <video className="w-full h-full object-cover" src={videoUrl} controls autoPlay loop>
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ML8Qy9almpuYVCTirDySQMKIyWvFqE.png"
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 bg-white/90 backdrop-blur-sm px-8 py-6 rounded-lg shadow-lg">
                  <button
                    onClick={generateVideo}
                    disabled={isGenerating}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
                  >
                    {isGenerating ? "Generating Video..." : "Generate Video with Veo3"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Content (35%) */}
          <div className="w-[35%] flex items-center justify-center px-12" style={{ backgroundColor: "#262A2D" }}>
            <div className="text-white">
              <h1 className="text-4xl font-bold leading-tight mb-6 text-balance">
                Introduction to the Professional Cleaning Process
              </h1>
              <p className="text-base leading-relaxed text-gray-300">
                Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

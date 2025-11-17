"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function SlidePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const slideContext = `Professional HVAC cleaning process training. A three-step process for quality assurance and system testing to guarantee peak performance. This training provides a dense, detailed breakdown of the essential techniques for comprehensive system cleaning.`

  const generateVideo = async () => {
    setIsGenerating(true)
    setError(null)
    setVideoUrl(null)

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: slideContext }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate video")
      }

      if (data.videoUrl) {
        setVideoUrl(data.videoUrl)
      } else {
        throw new Error("No video URL returned from API")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#FDB9B8" }}>
      {/* 16:9 Aspect Ratio Container */}
      <div className="w-full max-w-7xl aspect-video relative overflow-hidden" style={{ backgroundColor: "#FDB9B8" }}>
        {/* Two Equal Parts Container */}
        <div className="grid grid-cols-2 h-full gap-0">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-start p-12 relative">
            {/* Title */}
            <h1 className="text-6xl font-bold mb-6" style={{ color: "#000000" }}>
              What is this?
            </h1>

            {/* Subtitle */}
            <p className="mb-8 text-base" style={{ color: "#000000" }}>
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>

            {/* Video Generation Area */}
            <div className="flex-1 flex items-center justify-center overflow-hidden bg-sidebar-primary-foreground rounded-4xl shadow-none border-foreground border">
              {!videoUrl && !isGenerating && (
                <div className="relative w-full h-full">
                  <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                    <source
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center p-8">
                      <p className="text-lg mb-4 text-white font-semibold">HVAC Training Video Preview</p>
                      <Button onClick={generateVideo} size="lg" className="bg-[#4A4A8A] hover:bg-[#3A3A7A] text-white">
                        Generate Custom Video with Veo3
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="text-center p-8">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: "#4A4A8A" }} />
                  <p className="text-lg" style={{ color: "#000000" }}>
                    Generating video with Veo3...
                  </p>
                  <p className="text-sm mt-2 opacity-70" style={{ color: "#000000" }}>
                    This may take 1-2 minutes
                  </p>
                </div>
              )}

              {videoUrl && (
                <div className="w-full h-full relative">
                  <video src={videoUrl} controls className="w-full h-full object-cover" autoPlay loop />
                  <div className="absolute top-4 right-4">
                    <Button
                      onClick={generateVideo}
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                    >
                      Regenerate
                    </Button>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center p-8">
                  <p className="text-red-600 mb-4 font-semibold">{error}</p>
                  <Button onClick={generateVideo} size="lg" variant="outline" className="border-2 bg-transparent">
                    Try Again
                  </Button>
                </div>
              )}
            </div>

            {/* Top Left Decorative White Wavy Border */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-30"></div>
          </div>

          {/* Right Side - Bullet Points */}
          <div className="flex flex-col p-12 relative pb-12 pt-12 justify-start">
            {/* Horizontal Divider Line */}
            <div className="absolute top-12 left-0 right-12 h-0.5 bg-black/80" />

            {/* Bullet Points */}
            <div className="space-y-8 mt-8">
              <div className="flex gap-4">
                <span className="text-2xl font-bold" style={{ color: "#000000" }}>
                  •
                </span>
                <p className="leading-relaxed text-base" style={{ color: "#000000" }}>
                  Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                  detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
                </p>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl font-bold" style={{ color: "#000000" }}>
                  •
                </span>
                <p className="leading-relaxed text-base" style={{ color: "#000000" }}>
                  Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                  detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
                </p>
              </div>
            </div>

            {/* Bottom Right Purple Blob and Wavy Border */}
            <div className="absolute bottom-0 right-20 w-80 h-64 -mb-16 -mr-16">
              <img src="/images/design-mode/image(1).png" alt="" className="w-full h-full object-contain py-0 mx-0 px-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

export default function Slide() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const placeholderVideoUrl = "/professional-hvac-cleaning-process-with-measuremen.jpg"

  useEffect(() => {
    async function generateVideo() {
      try {
        setIsLoading(true)
        setError(null)

        // Generate video based on the slide context
        const prompt =
          "Professional HVAC cleaning process demonstration showing quality assurance and system testing techniques, measurement tools including calipers and scales, clean and professional setting, high quality instructional video"

        const response = await fetch("/api/generate-video", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to generate video")
        }

        const data = await response.json()
        setVideoUrl(data.videoUrl)
      } catch (err) {
        console.error("[v0] Error fetching video:", err)
        setError(err instanceof Error ? err.message : "Failed to load video")
      } finally {
        setIsLoading(false)
      }
    }

    generateVideo()
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto" style={{ aspectRatio: "16/9" }}>
      <div
        className="w-full h-full rounded-2xl shadow-2xl p-12 md:p-16 flex items-center gap-12"
        style={{ backgroundColor: "#FEF7B8" }}
      >
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 md:text-5xl">What is this?</h1>
            <p className="text-gray-700 leading-relaxed text-base">
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>
          </div>

          <div>
            <p className="text-base text-gray-700 leading-relaxed md:text-base">
              Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense, detailed
              breakdown of the essential techniques you'll need for comprehensive system cleaning.
            </p>
          </div>
        </div>

        {/* Right Content - Video/Image Area */}
        <div className="flex-1 relative">
          {isLoading ? (
            <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-gray-400 border-t-gray-600 rounded-full animate-spin mx-auto" />
                <p className="text-gray-600 text-sm">Generating video with Veo 3...</p>
              </div>
            </div>
          ) : error ? (
            <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="/images/design-mode/image.png"
                  alt="Measurement tools"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                <p className="text-white text-sm text-center">{error}</p>
              </div>
            </div>
          ) : videoUrl ? (
            <video
              src={videoUrl}
              className="w-full aspect-[4/3] object-cover rounded-2xl"
              controls
              autoPlay
              loop
              muted
            />
          ) : (
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="/hvac-quality-assurance.jpg"
                alt="Professional HVAC cleaning tools and measurement equipment for quality assurance"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Decorative Element */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 opacity-80">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M50 2 Q52 2 54 3.5 L88 26 Q92 28.5 92 33.5 L92 66.5 Q92 71.5 88 74 L54 96.5 Q52 98 50 98 Q48 98 46 96.5 L12 74 Q8 71.5 8 66.5 L8 33.5 Q8 28.5 12 26 L46 3.5 Q48 2 50 2 Z"
                fill="#A5A6F6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

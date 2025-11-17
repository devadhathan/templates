"use client"

import { useState, useEffect } from "react"

export default function PresentationSlide() {
  const [isVisible, setIsVisible] = useState(false)
  const [veoVideo, setVeoVideo] = useState<string | null>(null)
  const [veoLoading, setVeoLoading] = useState(false)
  const [veoError, setVeoError] = useState<string | null>(null)

  const [nanoImage, setNanoImage] = useState<string | null>(null)
  const [nanoLoading, setNanoLoading] = useState(false)
  const [nanoError, setNanoError] = useState<string | null>(null)

  const [isVideoHovered, setIsVideoHovered] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    generateVeoVideo()
    generateNanoImage()
  }, [])

  const generateVeoVideo = async () => {
    setVeoLoading(true)
    setVeoError(null)

    try {
      const response = await fetch("/api/generate-veo-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "Cinematic shot of a professional HVAC technician performing a final inspection in a basement. He's spraying cleaning solution on dark moldy walls with industrial equipment. Dramatic lighting from a window creates contrast. Professional quality, 4K, shallow depth of field. The technician wears work uniform and safety gear.",
        }),
      })

      if (!response.ok) throw new Error("Failed to generate video")

      const data = await response.json()
      console.log("[v0] Veo response:", data)
      setVeoVideo(data.videoUrl)
    } catch (error) {
      console.log("[v0] Veo error:", error)
      setVeoError(error instanceof Error ? error.message : "Failed to generate video")
    } finally {
      setVeoLoading(false)
    }
  }

  const generateNanoImage = async () => {
    setNanoLoading(true)
    setNanoError(null)

    try {
      const response = await fetch("/api/generate-nano-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "Serene mountain landscape at dawn with soft clouds, professional photography style, clean and crisp, representing quality and peak performance in HVAC systems",
        }),
      })

      if (!response.ok) throw new Error("Failed to generate image")

      const data = await response.json()
      console.log("[v0] Nano response:", data)
      setNanoImage(data.imageUrl)
    } catch (error) {
      console.log("[v0] Nano error:", error)
      setNanoError(error instanceof Error ? error.message : "Failed to generate image")
    } finally {
      setNanoLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#C7DFE2" }}>
      <div className="w-full max-w-[1920px] aspect-[16/9] bg-[#C7DFE2] relative">
        <div className="absolute inset-0 grid grid-cols-2 gap-12 p-16">
          {/* Left Content Section */}
          <div
            className={`flex flex-col justify-between transition-all duration-1000 ease-out gap-44 ${
              isVisible ? "opacity-100 translate-x-0 blur-0" : "opacity-0 -translate-x-12 blur-sm"
            }`}
          >
            {/* Title */}
            <div className="space-y-8">
              <h1 className="font-bold text-gray-800 leading-tight text-4xl">The Final Inspection</h1>

              <p className="text-gray-700 leading-relaxed text-base">
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>

              <p className="text-gray-600 leading-relaxed text-base">
                Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
              </p>
            </div>

            {/* Bottom Section with Small Image */}
            <div
              className={`flex gap-6 items-start transition-all duration-1000 delay-300 ease-out ${
                isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
              }`}
            >
              <div
                className="relative w-72 h-48 rounded-lg overflow-hidden shadow-lg transition-all duration-500 group cursor-pointer"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
                style={{
                  transform: isImageHovered ? "scale(1.05)" : "scale(1)",
                  boxShadow: isImageHovered ? "0 20px 40px rgba(0,0,0,0.3)" : "0 10px 25px rgba(0,0,0,0.15)",
                }}
              >
                {nanoLoading ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700 mx-auto mb-2" />
                      <p className="text-xs text-gray-600">Generating image...</p>
                    </div>
                  </div>
                ) : nanoImage ? (
                  <img
                    src={nanoImage || "/placeholder.svg"}
                    alt="Mountain landscape representing peak performance"
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{
                      filter: isImageHovered
                        ? "grayscale(100%) brightness(1.1) contrast(1.2)"
                        : "grayscale(100%) contrast(1.1)",
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <div className="text-center p-4">
                      {nanoError ? (
                        <>
                          <p className="text-xs text-red-600 mb-2">{nanoError}</p>
                          <button
                            onClick={generateNanoImage}
                            className="text-xs bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors"
                          >
                            Retry
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-gray-700 mb-2">nano banana</p>
                          <button
                            onClick={generateNanoImage}
                            className="text-xs bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                          >
                            Generate Image
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
                <div
                  className="absolute inset-0 transition-all duration-500 pointer-events-none"
                  style={{
                    background: isImageHovered
                      ? "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)"
                      : "transparent",
                  }}
                />
              </div>

              <div className="flex-1">
                <p className="text-base text-gray-600 leading-relaxed">
                  Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                  detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content Section - Large Video */}
          <div
            className={`flex items-center justify-center transition-all duration-1000 delay-150 ease-out ${
              isVisible ? "opacity-100 translate-x-0 blur-0" : "opacity-0 translate-x-12 blur-sm"
            }`}
          >
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-700 group cursor-pointer"
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
              style={{
                transform: isVideoHovered ? "scale(1.02) translateY(-5px)" : "scale(1)",
                boxShadow: isVideoHovered
                  ? "0 30px 60px rgba(0,0,0,0.4), 0 0 0 3px rgba(255,255,255,0.3)"
                  : "0 20px 40px rgba(0,0,0,0.25)",
              }}
            >
              {veoLoading ? (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4" />
                    <p className="text-white text-lg">Generating video with Veo3...</p>
                    <p className="text-gray-300 text-sm mt-2">This may take a few moments</p>
                  </div>
                </div>
              ) : veoVideo ? (
                <video
                  src={veoVideo}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{
                    filter: isVideoHovered
                      ? "grayscale(100%) brightness(1.15) contrast(1.3)"
                      : "grayscale(100%) contrast(1.2)",
                  }}
                  onError={(e) => {
                    console.log("[v0] Video load error:", e)
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center p-8">
                    {veoError ? (
                      <>
                        <p className="text-red-400 mb-4">{veoError}</p>
                        <button
                          onClick={generateVeoVideo}
                          className="bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                        >
                          Retry Generation
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-white mb-4">Veo3</p>
                        <p className="text-sm text-gray-300 mb-6">Generate professional HVAC inspection video</p>
                        <button
                          onClick={generateVeoVideo}
                          className="bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                        >
                          Generate Video
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div
                className="absolute inset-0 transition-all duration-700 pointer-events-none"
                style={{
                  background: isVideoHovered
                    ? "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.15) 100%)"
                    : "transparent",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

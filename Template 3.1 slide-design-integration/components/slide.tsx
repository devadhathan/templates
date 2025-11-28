"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function Slide() {
  const [imageUrl, setImageUrl] = useState<string>("/serene-green-rolling-hills-landscape-with-blue-sky.jpg")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasGeneratedRef = useRef(false)

  const contextPrompt = `Serene green rolling hills landscape with blue sky and fluffy white clouds, representing clean air and fresh environment for professional HVAC cleaning training, nature photography, professional quality, peaceful atmosphere`

  useEffect(() => {
    if (hasGeneratedRef.current) return

    const autoGenerateImage = async () => {
      hasGeneratedRef.current = true
      setIsLoading(true)
      setError(null)
      console.log("[v0] Starting image generation...")

      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: contextPrompt }),
        })

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API did not return JSON")
        }

        const data = await response.json()

        if (data.success && data.imageUrl) {
          console.log("[v0] Image generated successfully")
          setImageUrl(data.imageUrl)
        } else {
          console.error("[v0] Generation failed:", data.error)
          setError(data.error || "Failed to generate image")
        }
      } catch (error) {
        console.error("[v0] Error generating image:", error)
        setError(error instanceof Error ? error.message : "Network error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    autoGenerateImage()
  }, [contextPrompt])

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* 16:9 aspect ratio container */}
      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
        <div className="absolute inset-0 grid grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-2xl">
          {/* Left side - Dark background with text */}
          <div className="bg-[#2d3338] flex flex-col px-12 py-16 justify-end">
            <h1 className="text-white font-bold mb-8 leading-tight text-4xl">
              Introduction to the Professional Cleaning Process
            </h1>
            <p className="text-gray-300 leading-relaxed text-base">
              Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense, detailed
              breakdown of the essential techniques you'll need for comprehensive system cleaning.
            </p>
          </div>

          {/* Right side - Light background with image */}
          <div className="bg-[#e8e5e0] flex items-center justify-center p-8 relative">
            {isLoading ? (
              <div className="w-full h-full bg-muted-foreground/10 rounded-3xl flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="w-full h-full bg-red-50 rounded-3xl flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-red-600 font-semibold mb-2">Image generation failed</p>
                  <p className="text-sm text-red-500">{error}</p>
                  <p className="text-xs text-gray-500 mt-4">Using fallback image</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt="Generated landscape image"
                  fill
                  className="object-cover rounded-3xl"
                  priority
                />
              </div>
            )}
            <div className="absolute bottom-12 right-12 text-black text-sm font-medium">Small info</div>
          </div>
        </div>
      </div>
    </div>
  )
}

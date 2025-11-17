"use client"

import { useEffect, useState } from "react"

interface GeneratedImageProps {
  prompt: string
  alt: string
  className?: string
}

export function GeneratedImage({ prompt, alt, className }: GeneratedImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function generateImage() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to generate image")
        }

        const data = await response.json()
        const base64Image = `data:${data.mimeType};base64,${data.imageData}`
        setImageUrl(base64Image)
      } catch (err) {
        console.error("[v0] Error loading generated image:", err)
        setError(err instanceof Error ? err.message : "Failed to generate image")
      } finally {
        setLoading(false)
      }
    }

    generateImage()
  }, [prompt])

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-600">Generating image...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-red-50 ${className}`}>
        <div className="text-center space-y-2 p-4">
          <p className="text-sm text-red-600">{error}</p>
          <p className="text-xs text-gray-500">Make sure GEMINI_API_KEY is set in environment variables</p>
        </div>
      </div>
    )
  }

  if (!imageUrl) {
    return null
  }

  return <img src={imageUrl || "/placeholder.svg"} alt={alt} className={className} />
}

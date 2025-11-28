"use client"

import { useEffect, useState } from "react"

interface Veo3VideoProps {
  prompt: string
  className?: string
  posterImage?: string
}

export function Veo3Video({ prompt, className, posterImage }: Veo3VideoProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function generateVideo() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/generate-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to generate video")
        }

        const data = await response.json()
        setVideoUrl(data.videoUrl)
      } catch (err) {
        console.error("[v0] Video generation error:", err)
        setError(err instanceof Error ? err.message : "Failed to generate video")
      } finally {
        setIsLoading(false)
      }
    }

    generateVideo()
  }, [prompt])

  return (
    <div className={className}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-[2rem] z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            <p className="text-white text-sm font-medium">Generating video...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 backdrop-blur-sm rounded-[2rem] z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-4">
            <p className="text-red-600 text-sm font-medium mb-2">Video Generation Error</p>
            <p className="text-gray-600 text-xs">{error}</p>
          </div>
        </div>
      )}

      <video
        className="w-full h-full object-cover"
        poster={posterImage}
        loop
        muted
        playsInline
        autoPlay
        src={videoUrl || undefined}
      />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"

interface NanoBananaOptions {
  prompt: string
  width: number
  height: number
}

export function useNanoBanana({ prompt, width, height }: NanoBananaOptions) {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function generateImage() {
      try {
        setLoading(true)

        const response = await fetch("/api/nano-banana", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            width,
            height,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate image")
        }

        const data = await response.json()
        setImageUrl(data.url || data.imageUrl)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        setLoading(false)
        // Fallback to placeholder
        setImageUrl(`/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(prompt)}`)
      }
    }

    generateImage()
  }, [prompt, width, height])

  return { imageUrl, loading, error }
}

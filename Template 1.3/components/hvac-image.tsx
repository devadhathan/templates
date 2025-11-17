"use client"

import { useEffect, useState } from "react"

export function HvacImage() {
  const [imageUrl, setImageUrl] = useState("/hvac-equipment-tools-workspace.jpg")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          "/api/generate-hvac-image?prompt=professional+HVAC+cleaning+equipment+tools+and+workspace+setup",
        )
        const data = await response.json()
        if (data.imageUrl) {
          setImageUrl(data.imageUrl)
        }
      } catch (error) {
        console.error("[v0] Failed to load HVAC image:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImage()
  }, [])

  return (
    <div
      className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg animate-fade-in-up transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
      style={{ animationDelay: "0.3s", opacity: 0 }}
    >
      <img
        src={imageUrl || "/placeholder.svg"}
        alt="Professional HVAC cleaning equipment and tools workspace"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  )
}

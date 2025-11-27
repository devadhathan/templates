"use client"

import { Code2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function PresentationSlide() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateImage = async () => {
    setIsGenerating(true)
    setError(null)
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "A serene landscape with rolling green hills under a blue sky with white clouds",
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else if (data.imageUrl) {
        setGeneratedImage(data.imageUrl)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate image"
      setError(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-7xl aspect-video bg-white shadow-2xl rounded-lg overflow-hidden flex">
        {/* Left side - 30% width, full height */}
        <div className="w-[30%] h-full relative bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
          {generatedImage ? (
            <img
              src={generatedImage || "/placeholder.svg"}
              alt="Generated landscape"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-300 to-blue-400 p-6">
              <div className="text-center text-white space-y-4">
                <Code2 className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-base font-medium mb-6">Nano Banana API Image Generation</p>

                <Button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2"
                >
                  {isGenerating ? "Generating..." : "Generate Image"}
                </Button>

                {error && <p className="text-xs text-red-100 mt-3 max-w-xs">{error}</p>}
              </div>
            </div>
          )}
          {/* Small circular icon overlay */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Right side - 70% width with content and controls */}
        <div className="w-[70%] h-full flex flex-col">
          {/* Top section - Content */}
          <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 p-12 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h1 className="font-bold text-purple-900 mb-4 text-3xl">The Final Inspection</h1>
                <p className="text-purple-700 leading-relaxed text-base">
                  A three-step process for quality assurance and system testing to guarantee peak performance.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-semibold text-purple-900 text-xl">API Generation</h2>
                </div>

                <ul className="space-y-3 ml-20">
                  <li className="text-gray-700 leading-relaxed">
                    A three-step process for quality assurance and system testing to guarantee peak performance.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom section - API Controls */}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Slide() {
  const [isVisible, setIsVisible] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true)

    const generateImage = async () => {
      try {
        setImageLoading(true)
        setImageError(false)

        const response = await fetch("/api/generate-image")

        if (!response.ok) {
          throw new Error("Failed to generate image")
        }

        const data = await response.json()

        if (data.image) {
          setGeneratedImage(data.image)
        } else {
          throw new Error("No image data received")
        }
      } catch (error) {
        console.error("[v0] Error loading generated image:", error)
        setImageError(true)
      } finally {
        setImageLoading(false)
      }
    }

    generateImage()
  }, [])

  return (
    <div
      className={`${inter.className} min-h-screen flex items-center justify-top p-8 px-12 mx-0 `}
      style={{ backgroundColor: "#AEA2FD" }}
    >
      <div className="relative w-full max-w-[1420px] mr-8 aspect-video px-12 ">
        {/* Scalloped edge decoration - top right */}
        <div
          className={`absolute top-0 right-0 w-32 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <img
            src="/images/design-mode/image(3).png"
            alt="Scalloped decoration"
            className=" w-full h-full"
          />
        </div>
 
        {/* Main content container */}
        <div className="absolute inset-0 flex items-center justify-between px-12 py-8 mx-0 flex-row">
          {/* Left side - Text content */}
          <div className="w-1/2 pr-12">
            <h1
              className={`font-semibold mb-8 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{
                fontSize: "48px",
                lineHeight: "1.1",
                color: "#2D2D2D",
              }}
            >
              What is this?
            </h1>

            <p
              className={`mb-8 transition-all duration-1000 delay-500 text-base ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ color: "#2D2D2D" }}
            >
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>

            <p
              className={`text-base leading-relaxed transition-all duration-1000 delay-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ color: "#4A4A4A" }}
            >
              Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense, detailed
              breakdown of the essential techniques you'll need for comprehensive system cleaning.
            </p>
          </div>

          {/* Right side - Card with decorative frame and image */}
          <div className="w-1/2 flex justify-end items-center">
            <div
              className={`relative transition-all duration-1000 delay-900 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ maxWidth: "509px", maxHeight: "400px" }}
            >
              <img src="/images/design-mode/image(2).png" alt="Decorative frame" className="w-full h-auto" />

              <div className="absolute top-[15%] left-[1%] right-[1%] bottom-[8%]">
                <div className="w-full rounded-[32px] overflow-hidden bg-white flex items-center justify-center h-full">
                  {imageLoading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                      <p className="text-sm text-gray-600">Generating image...</p>
                    </div>
                  ) : imageError ? (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm">Image generation failed</p>
                    </div>
                  ) : generatedImage ? (
                    <img
                      src={generatedImage || "/placeholder.svg"}
                      alt="Generated HVAC equipment"
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  )
}

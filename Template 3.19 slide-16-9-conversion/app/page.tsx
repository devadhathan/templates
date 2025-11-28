"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true)

    // Generate image using Nano Banana API
    generateImage()
  }, [])

  const generateImage = async () => {
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            "beautiful landscape with green rolling hills under a bright blue sky with scattered white clouds, serene and peaceful nature scene",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setImageUrl(data.imageUrl)
      }
    } catch (error) {
      console.error("[v0] Error generating image:", error)
      // Fallback to placeholder
      setImageUrl("/green-hills-blue-sky-landscape.jpg")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-background p-8">
      {/* 16:9 Slide Container */}
      <div
        className="relative w-full max-w-[1920px] aspect-[16/9] bg-white shadow-2xl overflow-hidden"
        style={{
          animation: isVisible ? "slideUp 0.8s ease-out forwards" : "none",
        }}
      >
        {/* Grid Layout */}
        <div className="grid grid-cols-2 h-full">
          {/* Left Content */}
          <div
            className="flex flex-col justify-between p-16 lg:p-20 lg:py-12 lg:px-12"
            style={{
              animation: isVisible ? "fadeInLeft 1s ease-out 0.3s forwards" : "none",
              opacity: 0,
            }}
          >
            <div>
              {/* Title */}
              <h1
                className="text-5xl xl:text-7xl font-bold text-foreground mb-8 text-balance lg:text-3xl"
                style={{
                  animation: isVisible ? "fadeInUp 0.8s ease-out 0.5s forwards" : "none",
                  opacity: 0,
                }}
              >
                Case study : Topic
              </h1>

              {/* Description 1 */}
              <p
                className="text-muted-foreground mb-6 leading-relaxed text-base"
                style={{
                  animation: isVisible ? "fadeInUp 0.8s ease-out 0.7s forwards" : "none",
                  opacity: 0,
                }}
              >
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>

              {/* Description 2 */}
              <p
                className="text-muted-foreground leading-relaxed text-base"
                style={{
                  animation: isVisible ? "fadeInUp 0.8s ease-out 0.9s forwards" : "none",
                  opacity: 0,
                }}
              >
                Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
              </p>
            </div>

            {/* Ideas Card */}
            <Card
              className="bg-yellow-50 border-yellow-200 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
              style={{
                animation: isVisible ? "fadeInUp 0.8s ease-out 1.1s forwards" : "none",
                opacity: 0,
              }}
            >
              <div className="flex items-start gap-4">
                <Settings className="w-8 h-8 text-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3 lg:text-lg">Ideas</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    A three-step process for quality assurance and system testing to guarantee peak performance.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Image */}
          <div
            className="relative h-full overflow-hidden"
            style={{
              animation: isVisible ? "fadeInRight 1s ease-out 0.5s forwards" : "none",
              opacity: 0,
            }}
          >
            {isLoading ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-foreground"></div>
              </div>
            ) : (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Beautiful landscape with green hills and blue sky"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                style={{
                  animation: isVisible ? "zoomIn 1.2s ease-out 0.7s forwards" : "none",
                  transform: "scale(0.95)",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInLeft {
          from {
            transform: translateX(-50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInRight {
          from {
            transform: translateX(50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.95);
            opacity: 0.7;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

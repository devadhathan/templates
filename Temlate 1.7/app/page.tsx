"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"

export default function SlidePage() {
  const [imageUrl1, setImageUrl1] = useState<string>("")
  const [imageUrl2, setImageUrl2] = useState<string>("")
  const [focusedCard, setFocusedCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    // Fetch images from nano banana API
    const fetchImages = async () => {
      try {
        // Replace with your actual nano banana API endpoint and parameters
        const response1 = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: "HVAC equipment parts with hand holding component, professional photography",
            seed: 1,
          }),
        })
        const data1 = await response1.json()
        setImageUrl1(data1.imageUrl)

        const response2 = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: "HVAC equipment parts with hand holding component, professional photography",
            seed: 2,
          }),
        })
        const data2 = await response2.json()
        setImageUrl2(data2.imageUrl)
      } catch (error) {
        console.error("Error fetching images:", error)
      }
    }

    fetchImages()

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-8">
      {/* 16:9 Aspect Ratio Container */}
      <div
        className={`w-full max-w-7xl aspect-[16/9] bg-white rounded-lg shadow-2xl flex transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Left Content - 50% width */}
        <div
          className={`w-1/2 flex flex-col justify-center p-12 transition-all duration-1000 ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <h1 className="text-6xl font-bold text-neutral-900 mb-6">What is this?</h1>

          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </p>

          <p className="text-base text-neutral-500 leading-relaxed">
            Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense, detailed
            breakdown of the essential techniques you'll need for comprehensive system cleaning.
          </p>
        </div>

        {/* Right Cards - 50% width with F8F8FA background */}
        <div
          className={`w-1/2 flex gap-3 p-12 transition-all duration-1000 ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
          style={{ backgroundColor: "#F8F8FA", transitionDelay: "400ms" }}
        >
          {/* Card 1 */}
          <Card
            className={`flex-1 border rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out my-auto ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } ${
              focusedCard === 1
                ? "border-2 border-blue-500 shadow-2xl scale-105"
                : "border border-neutral-900 hover:border-neutral-700 hover:shadow-xl hover:scale-[1.02]"
            }`}
            style={{ transitionDelay: "600ms" }}
            onClick={() => setFocusedCard(focusedCard === 1 ? null : 1)}
          >
            <CardContent className="p-4 flex-col ">
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden mb-2 transition-transform duration-300 hover:scale-105">
                <img
                  src={imageUrl1 || "/placeholder.svg?height=400&width=400&query=HVAC equipment"}
                  alt="HVAC equipment"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-1 transition-colors duration-300 group-hover:text-blue-600">
                What is this?
              </h2>

              <p className="text-sm text-neutral-600 leading-relaxed">
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card
            className={`flex-1 border rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out my-auto py-[] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } ${
              focusedCard === 2
                ? "border-2 border-blue-500 shadow-2xl scale-105"
                : "border border-neutral-900 hover:border-neutral-700 hover:shadow-xl hover:scale-[1.02]"
            }`}
            style={{ transitionDelay: "800ms" }}
            onClick={() => setFocusedCard(focusedCard === 2 ? null : 2)}
          >
            <CardContent className="p-4 flex flex-col h-full">
              <div className="aspect-[4/3] bg-neutral-200 rounded-2xl overflow-hidden mb-2 transition-transform duration-300 hover:scale-105">
                <img
                  src={imageUrl2 || "/placeholder.svg?height=400&width=400&query=HVAC equipment"}
                  alt="HVAC equipment"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-1 transition-colors duration-300 group-hover:text-blue-600">
                What is this?
              </h2>

              <p className="text-sm text-neutral-600 leading-relaxed">
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

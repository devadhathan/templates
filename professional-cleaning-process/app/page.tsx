"use client"

import { useState } from "react"
import Image from "next/image"

export default function CleaningSlide() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const images = [
    {
      src: "/professional-cleaner-in-protective-suit-spraying-c.jpg",
      alt: "Professional cleaning with spray equipment",
      width: 220,
      height: 400,
      cornerRadius: "200px",
    },
    {
      src: "/person-in-hazmat-suit-cleaning-floor-with-industri.jpg",
      alt: "Floor cleaning with industrial equipment",
      width: 220,
      height: 400,
      cornerRadius: "200px",
    },
    {
      src: "/worker-in-protective-gear-cleaning-appliances.jpg",
      alt: "Appliance cleaning service",
      width: 220,
      height: 400,
      cornerRadius: "200px",
    },
  ]

  const getImageWidth = (index: number) => {
    if (hoveredIndex === null) return 220
    if (hoveredIndex === index) return 340 // Expanded width
    return 160 // Shrunk width for non-hovered images
  }

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* 16:9 Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-[1920px] aspect-video flex">
          <div className="w-[45%] flex flex-col px-16 py-12 justify-start" style={{ backgroundColor: "#CF95FE" }}>
            <h1 className="font-bold text-purple-900 leading-tight mb-8 text-5xl">
              Introduction to
              <br />
              the Professional
              <br />
              Cleaning Process
            </h1>
            <p className="leading-relaxed max-w-md text-base" style={{ color: "#121212" }}>
              Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense, detailed
              breakdown of the essential techniques you'll need for comprehensive system cleaning.
            </p>
          </div>

          <div className="w-[55%] flex items-center justify-center px-12" style={{ backgroundColor: "#E5E4FA" }}>
            <div className="flex items-center gap-4">
              {images.map((image, index) => {
                const isHovered = hoveredIndex === index
                const imageWidth = getImageWidth(index)

                return (
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    style={{
                      width: `${imageWidth}px`, // Dynamic width based on hover
                      height: "400px",
                      zIndex: isHovered ? 10 : 1,
                      transition: "width 500ms ease-in-out", // Smooth width transition
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className="relative w-full h-full overflow-hidden shadow-lg"
                      style={{
                        borderRadius: isHovered ? "32px" : "200px",
                        transition: "border-radius 500ms ease-in-out",
                      }}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="340px" // Updated for max width
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

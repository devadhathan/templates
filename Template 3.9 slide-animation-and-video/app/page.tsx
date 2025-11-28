"use client"

import { Settings } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Veo3Video } from "@/components/veo3-video"

export default function InspectionSlide() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="min-h-screen w-full bg-[#f5f1e8] flex items-center justify-center p-8">
      {/* 16:9 Container */}
      <div className="w-full max-w-[1600px] aspect-[16/9] bg-[#f5f1e8] flex flex-col p-12 md:p-16">
        {/* Header Section with blur animation */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 blur-in duration-700 fill-mode-backwards">
          <h1 className="text-5xl md:text-6xl font-semibold text-[#2d2d2d] mb-4 text-balance">The Final Inspection</h1>
          <p className="text-lg md:text-xl text-[#666666] max-w-2xl text-balance">
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Interactive Cards */}
          <div className="flex flex-col gap-6">
            {[1, 2].map((index) => (
              <Card
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  p-8 bg-white/60 backdrop-blur-sm border border-[#d4cec0]/40 
                  rounded-[2rem] cursor-pointer group
                  transition-all duration-500 ease-out
                  animate-in fade-in slide-in-from-left-8 blur-in
                  hover:bg-white hover:shadow-lg hover:scale-[1.02]
                  hover:border-[#a89f8a]
                  ${index === 1 ? "delay-150" : "delay-300"}
                `}
                style={{
                  animationFillMode: "backwards",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`
                      transition-all duration-300
                      ${hoveredCard === index ? "rotate-90 scale-110" : ""}
                    `}
                  >
                    <Settings className="w-8 h-8 text-[#2d2d2d] transition-colors duration-300 group-hover:text-[#4a4a4a]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-[#2d2d2d] mb-3">Heading {index}</h3>
                    <p className="text-base text-[#666666] leading-relaxed">
                      A three-step process for quality assurance and system testing to guarantee peak performance.
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Right Column - Video Container (prepared for Veo3 API) */}
          <div className="relative h-full min-h-[400px] animate-in fade-in slide-in-from-right-8 blur-in duration-700 delay-500 fill-mode-backwards">
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-xl">
              <Veo3Video
                prompt="Cinematic aerial view of lush green rolling hills under a bright blue sky with white clouds. Professional quality assurance inspection scene. 4K quality, smooth camera movement, peaceful and professional atmosphere."
                posterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oqnwU8kS6U3s3rPxG8CYfpuRAuIoMi.png"
                className="w-full h-full"
              />

              {/* Subtle overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

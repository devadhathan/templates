"use client"

import type React from "react"

import { Settings } from "lucide-react"

export default function FinalInspectionSlide() {
  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ background: "#262A2D" }}>
      {/* 16:9 Container */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full max-w-[1920px] aspect-video flex flex-col justify-between p-16">
          {/* Header Section with fade-in and blur animation */}
          <div className="space-y-4 animate-[fadeInBlur_0.8s_ease-out]">
            <h1 className="text-white text-balance text-4xl font-semibold">The Final Inspection</h1>
            <p className="text-gray-400 max-w-2xl text-balance text-base">
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Card 1 - Delayed animation */}
            <div className="animate-[fadeInBlur_0.8s_ease-out_0.2s_both]">
              <InteractiveCard delay={0.2}>
                <div className="flex items-start gap-4">
                  <Settings className="w-8 h-8 text-white flex-shrink-0" />
                  <div className="space-y-2">
                    <h2 className="font-semibold text-white text-lg">Heading 1</h2>
                    <p className="text-gray-400 text-balance leading-relaxed text-base">
                      A three-step process for quality assurance and system testing to guarantee peak performance.
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </div>

            {/* Card 2 - More delayed animation */}
            <div className="animate-[fadeInBlur_0.8s_ease-out_0.4s_both]">
              <InteractiveCard delay={0.4}>
                <div className="flex items-start gap-4">
                  <Settings className="w-8 h-8 text-white flex-shrink-0" />
                  <div className="space-y-2">
                    <h2 className="font-semibold text-white text-lg">Heading 1</h2>
                    <p className="text-gray-400 text-balance leading-relaxed text-base">
                      A three-step process for quality assurance and system testing to guarantee peak performance.
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InteractiveCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div className="group relative p-8 rounded-3xl border border-gray-700/50 bg-transparent backdrop-blur-sm transition-all duration-500 ease-out hover:bg-gray-800/30 hover:border-gray-600 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-900/50 cursor-pointer">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-700/0 via-gray-700/0 to-gray-700/0 group-hover:from-gray-700/5 group-hover:via-transparent group-hover:to-gray-600/10 transition-all duration-500" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

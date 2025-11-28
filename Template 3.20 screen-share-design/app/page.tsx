"use client"

import { useEffect, useState } from "react"
import { Settings } from "lucide-react"
import Image from "next/image"

export default function SlidePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-4">
      {/* 16:9 Container */}
      <div className="w-full max-w-[1600px] aspect-[16/9] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full h-full grid grid-cols-2 gap-0">
          {/* Left Content Section */}
          <div className="flex flex-col justify-between p-12 lg:p-16">
            {/* Title - Fade in from left */}
            <div>
              <h1
                className={`text-5xl xl:text-7xl font-bold text-foreground mb-6 transition-all duration-1000 ease-out lg:text-3xl ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                }`}
              >
                Screen share
              </h1>

              {/* Description - Fade in with delay */}
              <div
                className={`space-y-6 text-muted-foreground text-base lg:text-lg transition-all duration-1000 delay-300 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <p className="leading-relaxed text-base">
                  A three-step process for quality assurance and system testing to guarantee peak performance.
                </p>
                <p className="leading-relaxed text-base">
                  Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                  detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
                </p>
              </div>
            </div>

            {/* Bottom Cards - Slide up */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {[
                {
                  title: "Heading 4",
                  description:
                    "A three-step process for quality assurance and system testing to guarantee peak performance.",
                  delay: "delay-500",
                },
                {
                  title: "Heading 4",
                  description:
                    "A three-step process for quality assurance and system testing to guarantee peak performance.",
                  delay: "delay-700",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`group border border-border rounded-xl p-6 bg-card hover:bg-accent hover:shadow-lg transition-all duration-500 ease-out cursor-pointer ${
                    card.delay
                  } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                >
                  <Settings className="w-8 h-8 mb-4 text-foreground group-hover:rotate-90 transition-transform duration-500" />
                  <h3 className="font-semibold mb-3 text-foreground text-lg">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Section - Fade in from right */}
          <div
            className={`relative bg-gradient-to-br from-slate-200 to-slate-300 transition-all duration-1000 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500">
                <Image
                  src="/professional-hvac-cleaning-system-with-modern-equi.jpg"
                  alt="HVAC System Cleaning"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

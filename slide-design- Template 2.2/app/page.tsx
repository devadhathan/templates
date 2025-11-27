"use client"

import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

export default function PresentationSlide() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[1920px] aspect-video flex">
        {/* Left Side - Plain background with content - 60% width */}
        <div className="w-[60%] bg-[#E5E0F0] flex flex-col justify-center px-16 py-12">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <h1 className="text-[#5B4E8B] text-balance text-4xl font-medium">The Final Inspection</h1>
            <p className="text-base text-[#7B6BA8] leading-relaxed text-pretty">
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>
          </div>

          <div className="space-y-8 mt-12 mr-40">
            <div
              className={`transition-all duration-700 delay-100 ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <h3 className="text-2xl font-semibold text-[#5B4E8B] mb-3">Heading</h3>
              <ul className="list-disc list-inside">
                <li className="text-base text-[#7B6BA8] leading-relaxed">
                  A three-step process for quality assurance and system testing to guarantee peak performance.
                </li>
              </ul>
            </div>

            <div
              className={`transition-all duration-700 delay-300 ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <h3 className="text-2xl font-semibold text-[#5B4E8B] mb-3">Heading</h3>
              <ul className="list-disc list-inside">
                <li className="text-base text-[#7B6BA8] leading-relaxed">
                  A three-step process for quality assurance and system testing to guarantee peak performance.
                </li>
              </ul>
            </div>

            <div
              className={`transition-all duration-700 delay-500 ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <h3 className="text-2xl font-semibold text-[#5B4E8B] mb-3">Heading</h3>
              <ul className="list-disc list-inside">
                <li className="text-base text-[#7B6BA8] leading-relaxed">
                  A three-step process for quality assurance and system testing to guarantee peak performance.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Gradient background with single card - 40% width */}
        <div className="w-[40%] bg-gradient-to-br from-[#FFFFFF] via-[#FF9B9B] via-75% to-[#7A7CFF] flex items-center justify-center p-16">
          <Card
            className={`group relative bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 max-w-xs ${
              mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            } hover:scale-105 hover:-translate-y-2`}
          >
            {/* Animated gradient border on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FF9B9B] via-[#7A7CFF] to-[#FF9B9B] opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />

            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icon with animated background */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7A7CFF] to-[#FF9B9B] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500 scale-75 group-hover:scale-100" />
                <div className="relative bg-gradient-to-br from-[#0E7490] to-[#0C5A73] rounded-full p-8 group-hover:scale-110 transition-transform duration-500 px-5 py-5">
                  <Search className="text-white h-6 w-6" strokeWidth={2} />
                </div>
              </div>

              <h3 className="font-bold text-[#5B4E8B] group-hover:text-[#7A7CFF] transition-colors duration-300 text-xl">
                Visual Inspection
              </h3>

              <p className="text-base text-[#7B6BA8] leading-relaxed group-hover:text-[#5B4E8B] transition-colors duration-300">
                Inspect all accessible ductwork with cameras or flashlights to confirm that no debris or blockages
                remain after cleaning.
              </p>
            </div>

            {/* Animated corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7A7CFF]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>
        </div>
      </div>
    </div>
  )
}

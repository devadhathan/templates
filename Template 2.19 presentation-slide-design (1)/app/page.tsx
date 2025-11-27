"use client"

import { useState, useEffect } from "react"
import { Settings } from "lucide-react"

export default function PresentationSlide() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* 16:9 Aspect Ratio Container */}
      <div
        className="relative w-full max-w-[1920px] aspect-video overflow-hidden"
        style={{ backgroundColor: "#E5E4FA" }}
      >
        <div className="absolute inset-0 flex">
          {/* Left Content Section */}
          <div className="flex-1 flex flex-col justify-between p-12 md:p-16 lg:p-20 lg:py-12 lg:px-12">
            {/* Title */}
            <div
              className={`
                transition-all duration-1000 ease-out
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}
              `}
              style={{ transitionDelay: "200ms" }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 lg:text-3xl">{"Case study : Topic"}</h1>
            </div>

            {/* Body Text */}
            <div
              className={`
                space-y-6 flex-1 transition-all duration-1000 ease-out
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{ transitionDelay: "400ms" }}
            >
              <p className="text-gray-700 leading-relaxed max-w-2xl text-base">
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl md:text-base">
                Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
              </p>
            </div>

            {/* Ideas Box */}
            <div
              className={`
                transition-all duration-1000 ease-out
                ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-8 scale-95"}
                hover:scale-105 hover:shadow-2xl
              `}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="bg-[#E8FA5B] rounded-3xl p-8 max-w-md shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-8 h-8 text-gray-900 group-hover:rotate-90 transition-transform duration-500" />
                  <h2 className="font-bold text-gray-900 text-lg">Ideas</h2>
                </div>
                <p className="text-gray-800 leading-relaxed text-base">
                  A three-step process for quality assurance and system testing to guarantee peak performance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div
            className={`
              flex-1 flex items-center justify-end p-8
              transition-all duration-1200 ease-out
              ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-16 scale-90"}
            `}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="relative w-full h-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 group">
              <img
                src="/beautiful-landscape-with-green-hills-and-blue-sky.jpg"
                alt="Beautiful landscape with green hills and blue sky"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

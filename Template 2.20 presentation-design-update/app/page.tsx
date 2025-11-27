"use client"

import { useEffect, useState } from "react"

export default function PresentationSlide() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-8">
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative w-full max-w-[1920px] aspect-[16/9] bg-[#d8d3e8] rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative h-full grid grid-cols-2 gap-8 p-12 lg:p-16">
          {/* Left Content Container */}
          <div className="relative h-full flex flex-col py-0">
            {/* Header Section - Animated */}
            <div
              className={`transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
            >
              <h1 className="text-slate-900 mb-6 text-balance font-semibold text-3xl">Screen share</h1>
              <p className="text-slate-700 max-w-xl text-pretty leading-relaxed text-lg mb-6">
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>
            </div>

            {/* Description Section - Animated */}
            <div
              className={`mb-auto transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
            >
              <p className="text-slate-700 max-w-xl leading-relaxed text-base">
                Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
              </p>
            </div>

            {/* Cards Section - Animated */}
            <div className="flex items-end">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                {/* Card 1 */}
                <div
                  className={`group transition-all duration-1000 delay-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="backdrop-blur-sm rounded-xl p-8 border border-slate-300/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 h-full bg-[rgba(255,255,255,0)]">
                    {/* Icon */}
                    <div className="w-12 h-12 mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Heading */}
                    <h3 className="font-semibold text-slate-900 mb-3 text-lg">Heading 4</h3>
                    <p className="text-slate-700 leading-relaxed text-sm">
                      A three-step process for quality assurance and system testing to guarantee peak performance.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  className={`group transition-all duration-1000 delay-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="backdrop-blur-sm rounded-xl p-8 border border-slate-300/50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 h-full bg-[rgba(255,255,255,0)]">
                    {/* Icon */}
                    <div className="w-12 h-12 mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Heading */}
                    <h3 className="font-semibold text-slate-900 mb-3 text-lg">Heading 4</h3>
                    <p className="text-slate-700 leading-relaxed text-sm">
                      A three-step process for quality assurance and system testing to guarantee peak performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`relative flex items-center justify-center transition-all duration-1000 delay-900 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/professional-hvac-system-equipment-modern-industri.jpg"
                alt="HVAC System Equipment"
                className="object-contain max-h-full w-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

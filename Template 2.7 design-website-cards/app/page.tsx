"use client"

import type React from "react"

import { Search, Settings } from 'lucide-react'
import { useEffect, useRef } from "react"

export default function InspectionSlide() {
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (card1Ref.current) observer.observe(card1Ref.current)
    if (card2Ref.current) observer.observe(card2Ref.current)
    if (card3Ref.current) observer.observe(card3Ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#D8D4E8] to-[#E8DFE6] p-8">
      <div className="w-full max-w-[1920px] aspect-video flex flex-col px-16 justify-between">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-[#5B4B8A] mb-4 text-3xl font-semibold">The Final Inspection</h1>
          <p className="text-[#6B5B9A]/80 max-w-2xl text-base">
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-3 gap-3 h-[480 px]">
          {/* Card 1 - Pentagon */}
          <div ref={card1Ref} className="inspection-card" style={{ "--delay": "0s" } as React.CSSProperties}>
            <div className="relative h-full rounded-3xl bg-[#A5C8E6] p-8 flex flex-col items-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="mb-6 relative">
                <div
                  className="w-20 h-20 flex items-center justify-center"
                  style={{
                    background: "#006E92",
                    clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                    borderRadius: "20px",
                  }}
                >
                  <Search className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h2 className="font-bold text-[#004A66] mb-4 text-center text-lg">Visual Inspection</h2>
              <p className="text-[#005A7A] text-center leading-relaxed text-base">
                Inspect all accessible ductwork with cameras or flashlights to confirm that no debris or blockages
                remain after cleaning.
              </p>
            </div>
          </div>

          {/* Card 2 - Octagon */}
          <div ref={card2Ref} className="inspection-card" style={{ "--delay": "0.15s" } as React.CSSProperties}>
            <div className="relative h-full rounded-3xl bg-[#CF95FE] p-8 flex flex-col items-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="mb-6 relative">
                <div
                  className="w-20 h-20 flex items-center justify-center"
                  style={{
                    background: "#470079",
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                    borderRadius: "20px",
                  }}
                >
                  <Settings className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h2 className="font-bold text-[#470079] mb-4 text-center text-lg">Address Deficiencies</h2>
              <p className="text-[#5A0099] text-center leading-relaxed text-sm">
                If any areas require more attention, they must be immediately addressed to ensure a complete and
                thorough cleaning.
              </p>
            </div>
          </div>

          {/* Card 3 - Square/Diamond */}
          <div ref={card3Ref} className="inspection-card" style={{ "--delay": "0.3s" } as React.CSSProperties}>
            <div className="relative h-full rounded-3xl bg-[#FE949D] p-8 flex flex-col items-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="mb-6 relative">
                <div
                  className="w-20 h-20 flex items-center justify-center"
                  style={{
                    background: "#6A061E",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    borderRadius: "20px",
                  }}
                >
                  <Settings className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h2 className="font-bold text-[#6A061E] mb-4 text-center text-lg">System Verification</h2>
              <p className="text-[#8A1030] text-center leading-relaxed text-sm">
                Test the entire HVAC system to verify strong, unobstructed airflow and confirm the system is operating
                at peak efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .inspection-card {
          opacity: 0;
          transform: translateX(-100px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          transition-delay: var(--delay);
        }

        .inspection-card.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .inspection-card.animate-in > div {
          animation: float 3s ease-in-out infinite;
        }

        .inspection-card:nth-child(1).animate-in > div {
          animation-delay: 0s;
        }

        .inspection-card:nth-child(2).animate-in > div {
          animation-delay: 0.5s;
        }

        .inspection-card:nth-child(3).animate-in > div {
          animation-delay: 1s;
        }
      `}</style>
    </main>
  )
}

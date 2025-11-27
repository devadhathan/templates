"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const cards = [
  {
    id: 1,
    color: "#A5C8E6",
    title: "Visual Inspection",
    description:
      "Inspect all accessible ductwork with cameras or flashlights to confirm that no debris or blockages remain after cleaning.",
    direction: "left",
  },
  {
    id: 2,
    color: "#F0FE94",
    title: "System Verification",
    description:
      "Test the entire HVAC system to verify strong, unobstructed airflow and confirm the system is operating at peak efficiency.",
    direction: "right",
  },
  {
    id: 3,
    color: "#CF95FE",
    title: "Address Deficiencies",
    description:
      "If any areas require more attention, they must be immediately addressed to ensure a complete and thorough cleaning.",
    direction: "left",
  },
  {
    id: 4,
    color: "#FE949D",
    title: "System Verification",
    description:
      "Test the entire HVAC system to verify strong, unobstructed airflow and confirm the system is operating at peak efficiency.",
    direction: "right",
  },
  {
    id: 5,
    color: "#94A7FE",
    title: "System Verification",
    description:
      "Test the entire HVAC system to verify strong, unobstructed airflow and confirm the system is operating at peak efficiency.",
    direction: "left",
  },
]

export default function FinalInspectionSlide() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after mount
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#E5E0F0] flex items-center justify-center p-8">
      {/* 16:9 container */}
      <div className="w-full max-w-[1600px] aspect-video bg-[#E5E0F0] flex flex-col justify-between items-end p-16 py-6">
        {/* Header section */}
        <div className="space-y-4 self-start">
          <h1 className="font-bold text-[#5B4A8A] text-4xl">The Final Inspection</h1>
          <p className="text-[#7A6B9E] max-w-4xl text-base">
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </p>
        </div>

        {/* Cards section */}
        <div className="grid grid-cols-5 gap-4 w-full items-end">
          {cards.map((card, index) => (
            <InspectionCard key={card.id} card={card} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </div>
  )
}

function InspectionCard({
  card,
  index,
  isVisible,
}: {
  card: (typeof cards)[0]
  index: number
  isVisible: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`
        transition-all duration-700 ease-out
        ${
          isVisible
            ? "opacity-100 translate-x-0"
            : card.direction === "left"
              ? "opacity-0 -translate-x-8"
              : "opacity-0 translate-x-8"
        }
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="p-4 flex flex-col shadow-lg transition-all duration-500 my-0 h-80 rounded-lg"
        style={{
          backgroundColor: card.color,
          transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: isHovered ? `0 20px 40px -10px ${card.color}80` : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Image placeholder - ready for nano banana API */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-3">
          <Image
            src="/images/design-mode/image.png"
            alt={card.title}
            fill
            className="object-cover transition-transform duration-700"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              filter: isHovered ? "brightness(1.05)" : "brightness(1)",
            }}
          />
          {/* Wave overlay effect on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: `linear-gradient(
                45deg,
                transparent 30%,
                rgba(255, 255, 255, 0.5) 50%,
                transparent 70%
              )`,
              backgroundSize: "200% 200%",
              animation: isHovered ? "wave 2s ease-in-out infinite" : "none",
            }}
          />
        </div>

        {/* Card content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
          <p className="text-xs text-gray-700 leading-relaxed">{card.description}</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  )
}

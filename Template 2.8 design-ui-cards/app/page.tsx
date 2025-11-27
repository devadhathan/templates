"use client"

import { Search, Settings } from "lucide-react"
import { useState } from "react"

interface CardData {
  id: number
  title: string
  description: string
  bgColor: string
  polygonColor: string
  sides: number
  icon: "search" | "settings"
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "Visual Inspection",
    description:
      "Inspect all accessible ductwork with cameras or flashlights to confirm that no debris or blockages remain after cleaning.",
    bgColor: "#94A7FE",
    polygonColor: "#003892",
    sides: 5,
    icon: "search",
  },
  {
    id: 2,
    title: "Visual Inspection",
    description:
      "Inspect all accessible ductwork with cameras or flashlights to confirm that no debris or blockages remain after cleaning.",
    bgColor: "#A5C8E6",
    polygonColor: "#006E92",
    sides: 5,
    icon: "search",
  },
  {
    id: 3,
    title: "Address Deficiencies",
    description:
      "If any areas require more attention, they must be immediately addressed to ensure a complete and thorough cleaning.",
    bgColor: "#CF95FE",
    polygonColor: "#470079",
    sides: 6,
    icon: "settings",
  },
  {
    id: 4,
    title: "Address Deficiencies",
    description:
      "If any areas require more attention, they must be immediately addressed to ensure a complete and thorough cleaning.",
    bgColor: "#F0FE94",
    polygonColor: "#795B00",
    sides: 8,
    icon: "settings",
  },
  {
    id: 5,
    title: "System Verification",
    description:
      "Test the entire HVAC system to verify strong, unobstructed airflow and confirm the system is operating at peak efficiency.",
    bgColor: "#FE949D",
    polygonColor: "#6A061E",
    sides: 4,
    icon: "settings",
  },
]

function Polygon({ sides, color, size = 80 }: { sides: number; color: string; size?: number }) {
  const radius = size / 2
  const cornerRadius = 8

  const points = Array.from({ length: sides }, (_, i) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2
    const x = radius + radius * Math.cos(angle)
    const y = radius + radius * Math.sin(angle)
    return { x, y }
  })

  const path =
    points
      .map((point, i) => {
        const nextPoint = points[(i + 1) % sides]
        const prevPoint = points[i === 0 ? sides - 1 : i - 1]

        const dx1 = point.x - prevPoint.x
        const dy1 = point.y - prevPoint.y
        const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)

        const dx2 = nextPoint.x - point.x
        const dy2 = nextPoint.y - point.y
        const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

        const offset = Math.min(cornerRadius, len1 / 2, len2 / 2)

        const p1x = point.x - (dx1 / len1) * offset
        const p1y = point.y - (dy1 / len1) * offset
        const p2x = point.x + (dx2 / len2) * offset
        const p2y = point.y + (dy2 / len2) * offset

        return i === 0
          ? `M ${p1x} ${p1y} Q ${point.x} ${point.y} ${p2x} ${p2y}`
          : `L ${p1x} ${p1y} Q ${point.x} ${point.y} ${p2x} ${p2y}`
      })
      .join(" ") + " Z"

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
    >
      <path d={path} fill={color} />
    </svg>
  )
}

function Card({ card, index }: { card: CardData; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
      style={{
        backgroundColor: card.bgColor,
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon with Polygon */}
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center justify-center">
          <Polygon sides={card.sides} color={card.polygonColor} size={100} />
          <div className="absolute inset-0 flex items-center justify-center">
            {card.icon === "search" ? (
              <Search className="w-10 h-10 text-white" strokeWidth={2.5} />
            ) : (
              <Settings className="w-10 h-10 text-white" strokeWidth={2.5} />
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-900 text-center mb-4 transition-transform duration-300 group-hover:translate-y-[-4px]">
        {card.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm text-gray-700 text-center leading-relaxed transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0.85 }}
      >
        {card.description}
      </p>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl pointer-events-none" />
    </div>
  )
}

export default function Slide() {
  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-8">
        <div className="w-full max-w-[1600px]" style={{ aspectRatio: "16/9" }}>
          <h1 className="font-bold text-gray-900 text-left mb-8 animate-[fadeInUp_0.6s_ease-out_both] text-3xl">
            HVAC System Cleaning Process
          </h1>

          <div className="h-full grid grid-cols-2 grid-rows-[1fr_1fr] gap-3">
            {/* Top Row - 2 cards */}
            <Card card={cardData[0]} index={0} />
            <Card card={cardData[1]} index={1} />

            {/* Bottom Row - 3 cards */}
            <div className="col-span-2 grid grid-cols-3 gap-6">
              <Card card={cardData[2]} index={2} />
              <Card card={cardData[3]} index={3} />
              <Card card={cardData[4]} index={4} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

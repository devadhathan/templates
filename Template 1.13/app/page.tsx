"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const inspectionSteps = [
  {
    id: 1,
    title: "Visual Inspection",
    description:
      "Inspect all accessible ductwork with cameras or flashlights to confirm that no debris or blockages remain after cleaning.",
    image: "/technician-inspecting-industrial-ductwork-with-fla.jpg",
    color: "from-purple-200 to-purple-300",
    borderColor: "border-purple-400",
  },
  {
    id: 2,
    title: "Visual Inspection",
    description:
      "Inspect all accessible ductwork with cameras or flashlights to confirm that no debris or blockages remain after cleaning.",
    image: "/worker-examining-hvac-system-with-equipment.jpg",
    color: "from-gray-50 to-gray-100",
    borderColor: "border-gray-300",
  },
  {
    id: 3,
    title: "Address Deficiencies",
    description:
      "If any areas require more attention, they must be immediately addressed to ensure a complete and thorough cleaning.",
    image: "/close-up-of-circuit-board-electronics.jpg",
    color: "from-pink-200 to-pink-300",
    borderColor: "border-pink-400",
  },
  {
    id: 4,
    title: "System Verification",
    description:
      "Test the entire HVAC system to verify strong, unobstructed airflow and confirm the system is operating at peak efficiency.",
    image: "/hand-holding-white-mechanical-component-tools.jpg",
    color: "from-purple-200 to-purple-300",
    borderColor: "border-purple-400",
  },
  {
    id: 5,
    title: "System Verification",
    description:
      "Test the entire HVAC system to verify strong, unobstructed airflow and confirm the system is operating at peak efficiency.",
    image: "/precision-measurement-tools-and-equipment.jpg",
    color: "from-cyan-200 to-cyan-300",
    borderColor: "border-cyan-400",
  },
  {
    id: 6,
    title: "Documentation Review",
    description:
      "Review all maintenance records and inspection reports to ensure compliance with industry standards and regulations.",
    image: "/documentation-and-paperwork-review.jpg",
    color: "from-blue-200 to-blue-300",
    borderColor: "border-blue-400",
  },
  {
    id: 7,
    title: "Safety Compliance",
    description:
      "Verify all safety protocols are met and equipment meets OSHA standards for workplace safety and environmental protection.",
    image: "/safety-equipment-and-compliance-check.jpg",
    color: "from-yellow-200 to-yellow-300",
    borderColor: "border-yellow-400",
  },
  {
    id: 8,
    title: "Performance Testing",
    description:
      "Conduct comprehensive performance tests to measure system efficiency, airflow rates, and energy consumption metrics.",
    image: "/performance-testing-equipment.jpg",
    color: "from-green-200 to-green-300",
    borderColor: "border-green-400",
  },
  {
    id: 9,
    title: "Quality Assurance",
    description:
      "Final quality check to ensure all work meets company standards and customer expectations before project completion.",
    image: "/quality-assurance-inspection.jpg",
    color: "from-indigo-200 to-indigo-300",
    borderColor: "border-indigo-400",
  },
  {
    id: 10,
    title: "Final Sign-off",
    description:
      "Obtain customer approval and signature confirming satisfaction with completed work and system performance.",
    image: "/document-signing-and-approval.jpg",
    color: "from-rose-200 to-rose-300",
    borderColor: "border-rose-400",
  },
]

export default function FinalInspectionSlide() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const getWaveOffset = (index: number, hoveredIndex: number | null) => {
    if (hoveredIndex === null) return 0
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return -15
    if (distance === 1) return -8
    if (distance === 2) return -3
    return 0
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const scrollBy = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 300
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen w-full bg-[#f5f3d4] flex items-center justify-center p-8 py-0 px-6 gap-6 h-auto">
      <div className="w-full max-w-[1600px] aspect-[16/9] bg-[#f5f3d4] flex flex-col">
        <div className="px-16 pt-12 pb-8">
          <h1 className="font-bold text-foreground mb-4 leading-tight text-5xl">
            The Final
            Inspection
          </h1>
          <p className="font-sans text-xl text-muted-foreground max-w-xl leading-relaxed">
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </p>
        </div>

        <div className="flex-1 px-16 pb-12 overflow-hidden py-8 relative">
          <div
            ref={scrollContainerRef}
            className="h-full overflow-x-auto overflow-y-visible hide-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex h-full overflow-visible mx-0 my-0 gap-6 py-6">
              {inspectionSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex-shrink-0 w-[280px] transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateY(${getWaveOffset(index, hoveredCard)}px)`,
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={` overflow-visible h-full rounded-3xl bg-gradient-to-br ${step.color} border ${step.borderColor} p-6 flex flex-col shadow-md transition-shadow duration-300 hover:shadow-xl`}
                  >
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-5">
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="font-sans text-xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="font-sans text-sm text-foreground/80 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scrollBy("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scrollBy("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  )
}

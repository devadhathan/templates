"use client"

import { useEffect, useState } from "react"

export default function SlidePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const cards = [
    {
      id: 1,
      image: "/hvac-tools-equipment.jpg",
      title: "What is this?",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
    {
      id: 2,
      image: "/hvac-technician-cleaning.jpg",
      title: "What is this?",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
    {
      id: 3,
      image: "/modern-living-room-hvac.jpg",
      title: "What is this?",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#FDB9B8] flex items-center justify-center p-8">
      <div className="p-12">
        <div className="w-full max-w-[1920px] aspect-video bg-[#FDB9B8] flex items-center justify-center relative">
          <div className="w-full max-w-[1200px] h-full grid grid-cols-2 relative gap-8">
            {/* Left Section */}
            <div className="flex flex-col space-y-16 px-16 py-16 border-r border-gray-900">
              <h1 className="font-inter font-semibold leading-tight text-gray-900 text-6xl">What is this?</h1>

              <p className="font-inter text-[14px] font-normal text-gray-800 leading-relaxed">
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>

              <p className="font-inter text-[14px] font-normal text-gray-700 leading-relaxed">
                Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
              </p>
            </div>

            {/* Right Section - Cards */}
            <div className="flex flex-col justify-center gap-4 px-16">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className={`
                  bg-[#FDB9B8] rounded-3xl
                  flex gap-6
                  transition-all duration-700 ease-out
                  hover:bg-[#FFF8B8] hover:-rotate-1 hover:scale-[1.02]
                  cursor-pointer
                  ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-200px]"}
                `}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                    padding: "12px",
                    border: "1px solid #1f2937",
                  }}
                >
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      className="w-[230px] h-[180px] object-cover rounded-2xl"
                      style={{ border: "1px solid #1f2937" }}
                    />
                  </div>

                  <div className="flex-1 space-y-3 flex flex-col items-start justify-start">
                    <h3 className="font-inter text-[16px] font-semibold text-gray-900">{card.title}</h3>
                    <p className="font-inter text-[14px] font-normal text-gray-800 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Settings } from "lucide-react"

export function SlidePresentation() {
  const [clickedCard, setClickedCard] = useState<number | null>(null)

  const cards = [
    {
      id: 1,
      title: "Quality Check",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
    {
      id: 2,
      title: "System Testing",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
    {
      id: 3,
      title: "Performance",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
  ]

  const handleCardClick = (cardId: number) => {
    setClickedCard(cardId)
    setTimeout(() => setClickedCard(null), 600)
  }

  return (
    <div
      className="w-full max-w-7xl aspect-video rounded-xl shadow-2xl overflow-hidden relative"
      style={{ backgroundColor: "#F4F5F2" }}
    >
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-12 lg:p-16">
        {/* Header Section */}
        <div className="mb-auto animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-zinc-900 mb-4 text-balance">
            The Final Inspection
          </h1>
          <p className="text-lg lg:text-xl text-zinc-600 max-w-2xl text-pretty">
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`group relative bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-zinc-200/50 cursor-pointer
                transition-all duration-500 ease-out
                hover:scale-[1.02] hover:shadow-2xl hover:bg-white hover:border-zinc-300 hover:-translate-y-1
                active:scale-[0.98] active:shadow-lg
                animate-in fade-in slide-in-from-bottom-12 duration-700
                ${clickedCard === card.id ? "scale-[0.98] shadow-lg" : ""}`}
              style={{
                animationDelay: `${600 + index * 150}ms`,
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 
                group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 
                transition-all duration-700 blur-xl opacity-0 group-hover:opacity-100"
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className={`mb-6 transition-all duration-500 ease-out
                  group-hover:scale-110
                  ${clickedCard === card.id ? "scale-105" : ""}`}
                >
                  <Settings className="w-8 h-8 text-zinc-700 group-hover:text-zinc-900 transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3
                  className="text-xl lg:text-2xl font-semibold text-zinc-800 mb-3 
                  group-hover:text-zinc-900 transition-colors duration-300"
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm lg:text-base text-zinc-600 leading-relaxed text-pretty 
                  group-hover:text-zinc-700 transition-colors duration-300"
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { Settings } from "lucide-react"

const cards = [
  {
    id: 1,
    title: "Heading 1",
    description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
  },
  {
    id: 2,
    title: "Heading 2",
    description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
  },
  {
    id: 3,
    title: "Heading 3",
    description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
  },
  {
    id: 4,
    title: "Heading 4",
    description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
  },
]

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#F4F5F2" }}>
      <div className="w-full max-w-[1600px] aspect-video flex flex-col justify-center gap-12 px-16">
        {/* Header Section */}
        <div className="animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
          <h1 className="font-bold text-[#2c2c2c] mb-4 text-balance text-3xl">The Final Inspection</h1>
          <p className="text-lg text-[#666666] max-w-2xl">
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <div className="group relative rounded-3xl border border-[#d4d5d0] bg-white/60 backdrop-blur-sm p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:border-[#a8a9a4] hover:bg-white/80 cursor-pointer">
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-20 group-hover:from-blue-200/30 group-hover:via-purple-200/30 group-hover:to-pink-200/30" />

                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0 transition-transform duration-500 group-hover:rotate-180">
                    <Settings className="w-7 h-7 text-[#2c2c2c]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2c2c2c] mb-3 transition-colors duration-300 group-hover:text-[#000000] text-lg">
                      {card.title}
                    </h3>
                    <p className="text-[#666666] leading-relaxed transition-colors duration-300 group-hover:text-[#444444]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

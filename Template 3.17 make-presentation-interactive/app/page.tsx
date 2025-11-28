"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Info } from 'lucide-react'

export default function SlidePage() {
  const [mounted, setMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "scenario">("welcome")
  const [scenarioMounted, setScenarioMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (currentScreen === "scenario") {
      setTimeout(() => setScenarioMounted(true), 100)
    }
  }, [currentScreen])

  const cards = [
    {
      id: 1,
      rotation: "-12deg",
      delay: "0.2s",
      zIndex: 10,
      imageUrl: "https://picsum.photos/seed/card1/400/280",
      x: -120,
      hoverX: -160,
    },
    {
      id: 2,
      rotation: "2deg",
      delay: "0.4s",
      zIndex: 30,
      imageUrl: "https://picsum.photos/seed/card2/400/280",
      x: 0,
      hoverX: 0,
    },
    {
      id: 3,
      rotation: "12deg",
      delay: "0.6s",
      zIndex: 20,
      imageUrl: "https://picsum.photos/seed/card3/400/280",
      x: 120,
      hoverX: 160,
    },
  ]

  const handleImageLoad = (cardId: number) => {
    setLoadedImages((prev) => new Set(prev).add(cardId))
  }

  const handleStart = () => {
    setCurrentScreen("scenario")
  }

  if (currentScreen === "scenario") {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950">
        {/* 16:9 Container */}
        <div className="relative mx-auto w-full max-w-[1920px] aspect-[16/9] flex items-center justify-center px-8 md:px-16">
          {/* Instructions Button */}
          <button
            className={`absolute top-8 left-8 flex items-center gap-2 text-foreground/70 hover:text-foreground transition-all duration-300 group ${
              scenarioMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: "0.1s",
              transitionProperty: "opacity, transform",
            }}
          >
            <div className="p-2 border-2 border-foreground/20 rounded-full group-hover:border-foreground/40 transition-colors">
              <Info className="w-5 h-5" />
            </div>
            <span className="font-medium">Instructions</span>
          </button>

          {/* Scenario Content */}
          <div className="flex flex-col items-center gap-8">
            {/* Scenario Title */}
            <h1
              className={`text-5xl font-light tracking-wide text-balance transition-all duration-700 ${
                scenarioMounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
              style={{
                transitionDelay: "0.2s",
                transitionProperty: "opacity, transform",
              }}
            >
              {"{{Scenario}}"}
            </h1>

            {/* Character Portrait */}
            <div
              className={`relative w-[220px] h-[220px] transition-all duration-700 ${
                scenarioMounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{
                transitionDelay: "0.4s",
                transitionProperty: "opacity, transform",
              }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-neutral-800">
                <img
                  src="https://picsum.photos/seed/portrait-alex/220/220?face"
                  alt="Character portrait"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* Character Name */}
            <h2
              className={`text-3xl font-semibold tracking-tight transition-all duration-700 ${
                scenarioMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "0.6s",
                transitionProperty: "opacity, transform",
              }}
            >
              Alex
            </h2>

            {/* Objective */}
            <p
              className={`text-xl text-muted-foreground transition-all duration-700 ${
                scenarioMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "0.8s",
                transitionProperty: "opacity, transform",
              }}
            >
              {"{{Objective}}"}
            </p>

            {/* Start Call Button */}
            <Button
              size="lg"
              className={`px-12 py-6 text-lg font-semibold rounded-full bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 transition-all duration-700 shadow-xl mt-4 ${
                scenarioMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "1s",
                transitionProperty: "opacity, transform",
              }}
            >
              Start Call
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Welcome Screen (original)
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950">
      {/* 16:9 Container */}
      <div className="relative mx-auto w-full max-w-[1920px] aspect-[16/9] flex items-center justify-center px-8 md:px-16">
        {/* Instructions Button */}
        <button
          className={`absolute top-8 left-8 flex items-center gap-2 text-foreground/70 hover:text-foreground transition-all duration-300 group ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "0.1s",
            transitionProperty: "opacity, transform",
          }}
        >
          <div className="p-2 border-2 border-foreground/20 rounded-full group-hover:border-foreground/40 transition-colors">
            <Info className="w-5 h-5" />
          </div>
          <span className="font-medium">Instructions</span>
        </button>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-12">
          <h2
            className={`text-3xl font-semibold tracking-tight transition-all duration-700 md:text-base ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "0.2s",
              transitionProperty: "opacity, transform",
            }}
          >
            Welcome to Role-play
          </h2>

          <div
            className={`relative w-[280px] h-[280px] ml-24 transition-all duration-700 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{
              transitionDelay: "0.4s",
              transitionProperty: "opacity, transform",
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className={`absolute top-0 cursor-pointer transition-all duration-500 ease-out ${
                  mounted ? `animate-float-${card.id}` : ""
                }`}
                style={{
                  left: `${hoveredCard !== null ? card.hoverX : card.x}px`,
                  transform: `rotate(${hoveredCard === card.id ? "0deg" : card.rotation}) 
                              ${hoveredCard === card.id ? "scale(1.05)" : "scale(1)"}`,
                  zIndex: hoveredCard === card.id ? 100 : card.zIndex,
                  animationDelay: card.delay,
                  animationDuration: "3s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative w-64 h-80 rounded-[32px] overflow-hidden shadow-2xl border-[12px] border-white dark:border-neutral-800 bg-white dark:bg-neutral-800">
                  {!loadedImages.has(card.id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
                      <div className="w-8 h-8 border-4 border-neutral-400 border-t-neutral-600 rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={card.imageUrl || "/placeholder.svg"}
                    alt={`Card ${card.id}`}
                    className="w-full h-full object-cover"
                    onLoad={() => handleImageLoad(card.id)}
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-8">
            <h1
              className={`text-5xl font-bold tracking-tight text-balance transition-all duration-700 md:text-4xl ${
                mounted ? "opacity-100 translate-y-4" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "0.6s",
                transitionProperty: "opacity, transform",
              }}
            >
              Are you ready?
            </h1>
            <p
              className={`text-xl text-muted-foreground transition-all duration-700 md:text-base ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "0.8s",
                transitionProperty: "opacity, transform",
              }}
            >
              Your journey starts here
            </p>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className={`px-12 py-6 text-lg font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-700 shadow-xl ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "1s",
              transitionProperty: "opacity, transform",
            }}
            onClick={handleStart}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  )
}

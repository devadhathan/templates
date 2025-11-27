"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Info } from 'lucide-react'

export default function RolePlaySlide() {
  const [isVisible, setIsVisible] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "scenario">("welcome")
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (currentScreen === "scenario") {
      setIsVisible(false)
      setTimeout(() => setIsVisible(true), 50)
    }
  }, [currentScreen])

  const handleStartClick = () => {
    setIsPressed(true)
    setTimeout(() => {
      setCurrentScreen("scenario")
      setIsPressed(false)
    }, 200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#E5E4FA" }}>
      {/* 16:9 Aspect Ratio Container */}
      <div
        className="relative w-full max-w-7xl aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl"
        style={{ backgroundColor: "#E5E4FA" }}
      >
        {currentScreen === "welcome" ? (
          <>
            {/* Instructions Button */}
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className={`absolute top-8 left-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <Info className="w-5 h-5" />
              <span className="text-base font-medium">Instructions</span>
            </button>

            {/* Instructions Modal */}
            {showInstructions && (
              <div className="absolute top-20 left-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm z-10">
                <h3 className="font-semibold text-gray-900 mb-2">How to Play</h3>
                <p className="text-sm text-gray-600">
                  Click the Start button to begin your role-playing adventure. Immerse yourself in different scenarios
                  and make choices that shape your story.
                </p>
              </div>
            )}

            {/* Welcome Text */}
            <div
              className={`absolute top-8 left-1/2 -translate-x-1/2 text-center transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
            >
              <p className="text-base text-gray-600 font-medium">Welcome to Role-play</p>
            </div>

            {/* Main Content */}
            <div className="absolute inset-0 flex flex-col items-center px-8 gap-0 justify-center pb-40">
              {/* Main Heading */}
              <h1
                className={`font-bold text-gray-900 mb-4 transition-all duration-700 delay-300 text-4xl ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                Are you ready?
              </h1>

              {/* Subheading */}
              <p
                className={`text-gray-600 mb-12 transition-all duration-700 delay-500 text-base ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Your journey starts here
              </p>

              {/* Start Button */}
              <Button
                size="lg"
                onClick={handleStartClick}
                className={`text-xl px-12 py-6 rounded-full text-white transition-all duration-700 delay-700 hover:scale-110 hover:shadow-2xl active:scale-95 relative overflow-hidden group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${isPressed ? "scale-95" : ""}`}
                style={{ backgroundColor: "#6B21A8" }}
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
                
                <span className="absolute inset-0 rounded-full blur-xl bg-purple-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></span>
                
                {/* Shimmer effect - only animates on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></span>
                </span>
                
                <span className="relative z-10">Start</span>
              </Button>
            </div>

            {/* Image Grid at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end px-8 my-0 pb-0 pl-8 mb-0 mt-0 pt-40 flex-row justify-center h-20">
              <div
                className="relative transition-all duration-700"
                style={{
                  transitionDelay: "800ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0) rotate(0deg)" : "translateY(50px) rotate(-5deg)",
                  zIndex: 0,
                }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white transform hover:scale-110 hover:-rotate-2 hover:z-50 transition-transform duration-300 cursor-pointer"
                  style={{
                    width: "200px",
                    height: "250px",
                    transform: "rotate(-4.5deg)",
                  }}
                >
                  <img
                    src="/fantasy-medieval-castle-dungeon-dark-mysterious-at.jpg"
                    alt="Role-play scene 1"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>

              <div
                className="relative transition-all duration-700 -ml-8"
                style={{
                  transitionDelay: "900ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0) rotate(0deg)" : "translateY(50px) rotate(-5deg)",
                  zIndex: 1,
                }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white transform hover:scale-110 hover:-rotate-2 hover:z-50 transition-transform duration-300 cursor-pointer"
                  style={{
                    width: "200px",
                    height: "250px",
                    transform: "rotate(-1.5deg)",
                  }}
                >
                  <img
                    src="/person-reaching-hand-adventure-heroic-dramatic-lig.jpg"
                    alt="Role-play scene 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div
                className="relative transition-all duration-700 -ml-8"
                style={{
                  transitionDelay: "1000ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0) rotate(0deg)" : "translateY(50px) rotate(-5deg)",
                  zIndex: 2,
                }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white transform hover:scale-110 hover:-rotate-2 hover:z-50 transition-transform duration-300 cursor-pointer"
                  style={{
                    width: "200px",
                    height: "250px",
                    transform: "rotate(1.5deg)",
                  }}
                >
                  <img
                    src="/images/design-mode/439e47d2d88c7e4f949318c8c7814084(3).jpg"
                    alt="Role-play scene 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div
                className="relative transition-all duration-700 -ml-8"
                style={{
                  transitionDelay: "1100ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0) rotate(0deg)" : "translateY(50px) rotate(-5deg)",
                  zIndex: 3,
                }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white transform hover:scale-110 hover:-rotate-2 hover:z-50 transition-transform duration-300 cursor-pointer"
                  style={{
                    width: "200px",
                    height: "250px",
                    transform: "rotate(4.5deg)",
                  }}
                >
                  <img
                    src="/images/design-mode/292ca42db60199350b858c81e961c7eb(3).jpg"
                    alt="Role-play scene 4"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Instructions Button */}
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className={`absolute top-8 left-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <Info className="w-5 h-5" />
              <span className="text-lg font-medium">Instructions</span>
            </button>

            {/* Instructions Modal */}
            {showInstructions && (
              <div className="absolute top-20 left-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm z-10">
                <h3 className="font-semibold text-gray-900 mb-2">How to Play</h3>
                <p className="text-sm text-gray-600">
                  Review the scenario and your objective, then click "Start Call" to begin your role-playing session.
                </p>
              </div>
            )}

            {/* Scenario Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              {/* Scenario Title */}
              <h1
                className={`text-4xl font-bold text-gray-900 mb-16 transition-all duration-700 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                }`}
              >
                {"{{Scenario}}"}
              </h1>

              {/* Character Portrait */}
              <div
                className={`transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <div className="relative mb-6">
                  <div className="w-52 h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img src="/roleplay-character-professional-portrait.jpg" alt="Character portrait" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Character Name */}
                <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">Alex</h2>

                {/* Objective */}
                <p className="text-lg text-gray-600 text-center mb-16">{"{{Objective}}"}</p>
              </div>

              {/* Start Call Button */}
              <Button
                size="lg"
                className={`text-xl px-12 py-6 rounded-full text-white transition-all duration-700 delay-700 hover:scale-110 hover:shadow-2xl active:scale-95 relative overflow-hidden group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${isPressed ? "scale-95" : ""}`}
                style={{ backgroundColor: "#0891B2" }}
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
                
                <span className="absolute inset-0 rounded-full blur-xl bg-cyan-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></span>
                
                {/* Shimmer effect - only animates on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></span>
                </span>
                
                <span className="relative z-10">Start Call</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

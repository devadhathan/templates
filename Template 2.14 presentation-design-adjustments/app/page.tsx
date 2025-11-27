"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PresentationSlide() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [imagePrompt] = useState("A serene landscape with rolling green hills and blue sky with clouds")

  const steps = [
    {
      id: 1,
      title: "Initial Assessment",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
    {
      id: 2,
      title: "Quality Control",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
    {
      id: 3,
      title: "Performance Testing",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-50 to-blue-50 p-8">
      {/* 16:9 Slide Container */}
      <div className="w-full max-w-7xl aspect-video rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-full grid grid-cols-2 gap-0">
          <div className="flex flex-col justify-center px-16 py-12 space-y-8" style={{ backgroundColor: "#E5E4FA" }}>
            {/* Title with slide-in animation */}
            <div className="animate-slide-in-top">
              <h1 className="font-bold text-purple-900 mb-4 text-3xl">The Final Inspection</h1>
              <p className="text-base text-purple-900/80">
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="animate-slide-in-top flex items-start gap-4 group cursor-pointer transition-all duration-300 hover:translate-x-2"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeStep === step.id ? "scale-110 shadow-lg" : "group-hover:scale-105"
                    }`}
                    style={{ backgroundColor: "#470079" }}
                  >
                    <Settings className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex-1 pt-1">
                    <h3
                      className={`font-semibold transition-colors duration-300 text-lg ${
                        activeStep === step.id ? "text-purple-900" : "text-purple-800 group-hover:text-purple-900"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm mt-1 transition-opacity duration-300 opacity-100 text-purple-900/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative flex items-center justify-center p-12 animate-slide-in-top"
            style={{ animationDelay: "600ms", backgroundColor: "#C1BFEC" }}
          >
            <div className="relative w-full h-full group">
              {/* Image Container with hover effect */}
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/images/inspection-hero.jpg"
                  alt="Serene landscape placeholder"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Interactive Overlay - appears on hover */}
              <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/10 transition-all duration-300 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-purple-900 shadow-lg"
                  onClick={() => {
                    alert("Image generation ready!\nPrompt: " + imagePrompt)
                  }}
                >
                  Generate New Image
                </Button>
              </div>

              <div
                className="absolute -top-2 -right-2 w-20 h-20 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                style={{ backgroundColor: "#470079" }}
              >
                <span className="text-white text-xs font-bold text-center">AI Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

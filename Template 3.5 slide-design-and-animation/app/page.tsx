"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function PresentationSlide() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps = [
    {
      number: 1,
      title: "Heading",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
    {
      number: 2,
      title: "Heading",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
    {
      number: 3,
      title: "Heading",
      description: "A three-step process for quality assurance and system testing to guarantee peak performance.",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-8">
      {/* 16:9 Container */}
      <div className="w-full max-w-[1920px] aspect-[16/9] bg-neutral-800 shadow-2xl overflow-hidden">
        <div className="h-full flex">
          {/* Left Panel - Dark */}
          <div className="w-[40%] bg-[#2f3338] px-16 py-20 flex flex-col justify-start animate-slide-blur [animation-delay:100ms]">
            <h1 className="leading-tight text-neutral-200 font-light mb-12 text-3xl">
              Introduction to the Professional Cleaning Process
            </h1>
            <p className="text-neutral-400 leading-relaxed text-base">
              Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense, detailed
              breakdown of the essential techniques you'll need for comprehensive system cleaning.
            </p>
          </div>

          {/* Right Panel - Light */}
          <div className="w-[60%] bg-[#e8e5df] px-20 py-20 flex flex-col justify-center gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  "flex items-start gap-8 cursor-pointer transition-all duration-300",
                  "animate-slide-blur",
                  activeStep === step.number && "scale-105",
                  index === 0 && "[animation-delay:300ms]",
                  index === 1 && "[animation-delay:500ms]",
                  index === 2 && "[animation-delay:700ms]",
                )}
                onClick={() => setActiveStep(activeStep === step.number ? null : step.number)}
                onMouseEnter={() => setActiveStep(step.number)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Number Circle */}
                <div
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-full border-2 border-neutral-800 flex items-center justify-center transition-all duration-300",
                    activeStep === step.number && "bg-neutral-800 scale-110 shadow-lg",
                  )}
                >
                  <span
                    className={cn(
                      "text-2xl font-light transition-colors duration-300",
                      activeStep === step.number ? "text-white" : "text-neutral-800",
                    )}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h2
                    className={cn(
                      "font-normal mb-2 transition-colors duration-300 text-xl",
                      activeStep === step.number ? "text-neutral-900" : "text-neutral-800",
                    )}
                  >
                    {step.title}
                  </h2>
                  <p
                    className={cn(
                      "leading-relaxed transition-colors duration-300 text-base",
                      activeStep === step.number ? "text-neutral-700" : "text-neutral-600",
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

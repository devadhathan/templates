"use client"

import { Card } from "@/components/ui/card"

export function SlideCard() {
  return (
    <Card
      className="overflow-hidden border-2 border-foreground/10 animate-scale-in transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group"
      style={{ animationDelay: "0.4s", opacity: 0 }}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src="/professional-hvac-technician-inspecting-modern-air.jpg"
          alt="Professional HVAC system with quality assurance"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-8">
        <h3 className="text-base font-semibold mb-3 text-balance">What is this?</h3>
        <p className="text-sm text-foreground/70 leading-relaxed">
          A three-step process for quality assurance and system testing to guarantee peak performance.
        </p>
      </div>
    </Card>
  )
}

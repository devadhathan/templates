import { DecorativeShapes } from "@/components/decorative-shapes"
import { SlideCard } from "@/components/slide-card"

export default function PresentationSlide() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Main content grid */}
      <div className="px-8 py-16 h-screen flex items-center">
        <div className="grid grid-cols-2 gap-16 w-full max-w-[1600px]">
          {/* Left column - Main content */}
          <div className="flex flex-col space-y-8 pl-4">
            <div className="space-y-6 animate-fade-in-up" style={{ opacity: 0 }}>
              <h1 className="text-[64px] font-semibold leading-tight text-balance">What is this?</h1>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-lg">
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>
            </div>

            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-lg">
                Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
              </p>
            </div>
          </div>

          {/* Right column - Card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xl">
              <SlideCard />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative shapes */}
      <DecorativeShapes />
    </main>
  )
}

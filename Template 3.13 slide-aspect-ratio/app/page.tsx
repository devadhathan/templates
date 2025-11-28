import { Button } from "@/components/ui/button"

export default function EndSlide() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[oklch(0.269_0_0)] p-8">
      {/* 16:9 aspect ratio container */}
      <div className="w-full max-w-[1280px] aspect-[16/9] bg-[oklch(0.269_0_0)] flex flex-col items-center justify-center gap-8 px-16">
        

        {/* Rounded oval image of landscape */}
        <div className="relative w-64 h-48 overflow-hidden rounded-[50%]">
         
          <img
            src="/images/design-mode/image.png"
            alt="Random pattern"
            className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-overlay"
          />
          <img
            src="/images/design-mode/image.png"
            alt="Sparkles"
            className="absolute inset-0 w-32 h-32 m-auto object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="font-semibold text-white text-center text-4xl">You've made to the end</h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-400 text-center">
          you can ask more questions or
          <br />
          end the lesson
        </p>

        {/* Button */}
        <Button size="lg" className="bg-white text-black hover:bg-gray-100 rounded-full px-12 py-6 text-lg font-medium">
          End
        </Button>
      </div>
    </div>
  )
}

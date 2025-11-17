import { GeneratedImage } from "@/components/generated-image"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5f0d4] p-8 md:p-16 flex flex-col md:pb-0 md:pt-3 md:pl-3 md:pr-3">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch h-full flex-1">
        {/* Left Content */}
        <div className="space-y-8 flex flex-col py-12 px-12 justify-between">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-gray-900 md:text-5xl">What is this?</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>
          </div>

          <p className="text-base text-gray-700 leading-relaxed max-w-md">
            Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense, detailed
            breakdown of the essential techniques you'll need for comprehensive system cleaning.
          </p>

          <div className="max-w-sm pt-8">
            <img
              src="/images/design-mode/image.png"
              alt="Decorative wavy border"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* Right Content - Browser Window */}
        <div className="relative flex items-center">
          <div className="border-2 border-gray-900 rounded-3xl p-6 bg-[#f5f0d4]">
            {/* Browser Dots */}
            <div className="flex gap-2 mb-4">
              <div className="w-4 h-4 rounded-full border-2 border-gray-900" />
              <div className="w-4 h-4 rounded-full border-2 border-gray-900" />
              <div className="w-4 h-4 rounded-full border-2 border-gray-900" />
            </div>

            <div className="rounded-2xl overflow-hidden">
              <GeneratedImage
                prompt="A modern, minimalist living room with a gray sofa, wooden coffee table, and a potted plant. Soft natural lighting through sheer curtains creates a calm, professional atmosphere. Clean interior design with muted tones."
                alt="Modern living room with gray sofa and coffee table"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

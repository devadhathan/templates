export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-7xl aspect-video bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[65%_35%] h-full">
          {/* Left side - Video/Image with background */}
          <div
            className="relative flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-APD1cIUJtTYne7KEBoD1W6U9UihYu7.png')",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="text-center space-y-4 p-8">
                <div className="w-24 h-24 mx-auto bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-white/90 text-sm font-medium">Veo3 Video Integration</p>
                <p className="text-white/70 text-xs max-w-xs">
                  Videos will be generated based on the topic using Gemini's Veo3
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="p-12 md:p-16 flex flex-col justify-start" style={{ backgroundColor: "#E5E4FA" }}>
            <div className="space-y-16">
              <div>
                <h1 className="text-4xl font-bold text-purple-900 mb-4 text-balance md:text-3xl">
                  The Final Inspection
                </h1>
                <p className="text-purple-700 leading-relaxed text-base">
                  A three-step process for quality assurance and system testing to guarantee peak performance.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl text-purple-800 font-medium">Heading</h2>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-purple-700 leading-relaxed">
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span className="text-base">
                      A three-step process for quality assurance and system testing to guarantee peak performance.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

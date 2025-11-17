export default function SlidePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-7xl aspect-video bg-[#b8b0e8] rounded-lg shadow-2xl overflow-hidden">
        <div className="h-full flex items-center px-16 gap-12">
          {/* Left side - Image */}
          <div className="flex-shrink-0">
            <svg width="0" height="0">
              <defs>
                <clipPath id="pentagonClip" clipPathUnits="objectBoundingBox">
  <path d="M 0.5 0.05 L 0.93 0.36 L 0.76 0.9 L 0.24 0.9 L 0.07 0.36 Z" />
</clipPath>
              </defs>
            </svg>
            <div
              className="w-[420px] h-[420px] overflow-hidden"
              style={{
                clipPath: "url(#pentagonClip)",
              }}
            >
              <img
                src="/hvac-technician-inspecting-air-duct-system-in-indu.jpg"
                alt="HVAC inspection professional at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <h1 className="font-bold text-gray-900 leading-tight text-5xl">The Final Inspection</h1>

            <p className="text-gray-700 leading-relaxed text-base">
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>

            <ul className="space-y-6">
              <li className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="text-xl mt-1">•</span>
                <span className="text-base">
                  Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                  detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
                </span>
              </li>
              <li className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="text-xl mt-1">•</span>
                <span className="text-base">
                  Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                  detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

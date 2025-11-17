'use client'

import { useState, useEffect } from 'react'
import { Settings } from 'lucide-react'

export default function SlidePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger fade-in animation after mount
    setTimeout(() => setIsVisible(true), 100)

    // Generate image using nano banana API
    const generateImage = async () => {
      try {
        const response = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: 'Beautiful landscape with green rolling hills and blue sky with white clouds'
          })
        })
        
        const data = await response.json()
        if (data.imageUrl) {
          setImageUrl(data.imageUrl)
        }
      } catch (error) {
        console.error('[v0] Error generating image:', error)
        // Fallback to placeholder
        setImageUrl('/landscape-with-rolling-green-hills-and-blue-sky.jpg')
      } finally {
        setIsLoading(false)
      }
    }

    generateImage()
  }, [])

  return (
    <div 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#FDB9B8' }}
    >
      {/* 16:9 Container */}
      <div 
        className={`relative w-full max-w-[1920px] transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ aspectRatio: '16/9' }}
      >
        <div className="absolute inset-0 p-12 md:p-16 flex md:py-6">
          {/* Left Content Section */}
          <div className="flex-1 flex flex-col justify-between pr-8">
            {/* Main Title */}
            <div className="space-y-6">
              <h1 
                className="text-5xl md:text-6xl font-bold text-gray-900 transition-all duration-700 delay-200 hover:scale-[1.02] lg:text-4xl"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                Case study : Topic
              </h1>
              
              {/* Subtext with monospace font */}
              <div 
                className="space-y-4 text-gray-700 font-mono text-base md:text-lg transition-all duration-700 delay-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                <p className="leading-relaxed font-sans">
                  A three-step process for quality assurance and system testing to guarantee peak performance.
                </p>
                
                <p className="leading-relaxed font-sans">
                  Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense, detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
                </p>
              </div>
            </div>

            {/* Bottom Card */}
            <div 
              className="w-full max-w-md rounded-3xl p-8 shadow-lg transition-all duration-700 delay-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer group"
              style={{
                backgroundColor: '#FFF8B8',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className="flex items-start gap-4">
                <Settings className="w-8 h-8 text-gray-900 transition-transform duration-300 group-hover:rotate-90" />
                <div className="space-y-3">
                  <h2 className="font-bold text-gray-900 text-lg">Ideas</h2>
                  <p className="text-gray-700 leading-relaxed text-base">
                    A three-step process for quality assurance and system testing to guarantee peak performance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div 
            className="w-2/5 flex items-center transition-all duration-700 delay-400 justify-start"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(20px)'
            }}
          >
            <div className="relative w-full h-full max-h-[85%] rounded-3xl overflow-hidden shadow-2xl group">
              {isLoading ? (
                <div 
                  className="absolute inset-0 animate-pulse"
                  style={{ backgroundColor: '#E0F2FE' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  </div>
                </div>
              ) : (
                <>
                  {/* Subtle blur overlay on hover */}
                  <div className="absolute inset-0 bg-white/0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500 z-10" />
                  
                  <img
                    src={imageUrl || '/placeholder.svg?height=720&width=640&query=landscape with rolling green hills and blue sky'}
                    alt="Landscape with rolling hills"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

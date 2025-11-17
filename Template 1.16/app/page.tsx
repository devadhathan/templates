'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function SlidePage() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Trigger content animations after a brief delay
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 100)

    // Fetch image from nano banana API
    fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt: 'Beautiful landscape with blue sky, white clouds, and green rolling hills'
      })
    })
      .then(res => res.json())
      .then(data => {
        setImageUrl(data.imageUrl)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('[v0] Error generating image:', error)
        setIsLoading(false)
      })

    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: '#AEA2FD' }}
    >
      {/* 16:9 Aspect Ratio Container */}
      <div className="w-full max-w-[1600px] aspect-video bg-[#AEA2FD] rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Content Grid */}
        <div className="h-full grid grid-cols-2 gap-12 p-16">
          {/* Left Column - Text Content */}
          <div className="flex flex-col space-y-8 justify-start">
            {/* Title with staggered animation */}
            <h1 
              className={`font-bold text-gray-900 transition-all duration-1000 text-4xl ${
                showContent 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Welcome to simulation
            </h1>
            
            {/* Subtitle with animation */}
            <p 
              className={`font-semibold text-gray-800 transition-all duration-1000 text-base ${
                showContent 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              A three-step process for quality assurance and system testing to guarantee peak performance.
            </p>
            
            {/* Description with animation */}
            <p 
              className={`text-lg text-gray-700 leading-relaxed transition-all duration-1000 ${
                showContent 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense, detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-center justify-start">
            <div 
              className={`w-full rounded-3xl overflow-hidden shadow-xl transition-all duration-1000 h-80 ${
                showContent 
                  ? 'opacity-100 scale-100 rotate-0' 
                  : 'opacity-0 scale-95 rotate-2'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              {isLoading ? (
                <div className="w-full h-full bg-gradient-to-br from-cyan-200 to-cyan-400 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
                </div>
              ) : (
                <img 
                  src={imageUrl || '/placeholder.svg?height=600&width=800&query=landscape+with+blue+sky+clouds+green+hills'}
                  alt="Beautiful landscape"
                  className="w-full object-cover h-96"
                />
              )}
            </div>
          </div>
        </div>

        {/* Next Button with animation */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <Button 
            size="lg"
            className={`bg-purple-900 hover:bg-purple-800 text-white px-12 py-6 text-xl rounded-full shadow-lg transition-all duration-1000 hover:scale-105 ${
              showContent 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

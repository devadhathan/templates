'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'

export default function RolePlaySlide() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [showCharacterScreen, setShowCharacterScreen] = useState(false)

  // Role-play themed image prompts for nano banana API
  const imagePrompts = [
    'fantasy medieval knight in armor',
    'futuristic space explorer character',
    'mystical wizard with magical staff',
    'cyberpunk hacker character',
    'detective in noir style'
  ]

  useEffect(() => {
    // Trigger entrance animations
    setIsVisible(true)

    // Cycle through images every 4 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imagePrompts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  if (showCharacterScreen) {
    return (
      <div 
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
        style={{ 
          backgroundColor: '#F5F3D4',
          aspectRatio: '16/9'
        }}
      >
        {/* Instructions Button */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <Info className="w-6 h-6 text-gray-800" />
          <span className="text-lg font-medium text-gray-800">Instructions</span>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-2xl px-8">
          {/* Scenario Title */}
          <h1 className="font-bold text-gray-900 mb-4 text-2xl">
            {'{{Scenario}}'}
          </h1>

          {/* Character Portrait */}
          <div className="relative w-52 h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={`https://image.pollinations.ai/prompt/professional portrait of a person named Alex, realistic photography style?width=400&height=400&nologo=true`}
              alt="Character Alex"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>

          {/* Character Name */}
          <h2 className="font-bold text-gray-900 text-3xl">
            Alex
          </h2>

          {/* Objective */}
          <p className="text-gray-600 text-lg">
            {'{{Objective}}'}
          </p>

          {/* Start Call Button */}
          <Button
            size="lg"
            className="px-16 text-xl font-semibold bg-green-700 hover:bg-green-600 text-white transition-all shadow-2xl hover:shadow-green-700/50 hover:scale-105 rounded-xl py-8 mt-4"
            onClick={() => {
              console.log('[v0] Start Call button clicked')
            }}
          >
            Start Call
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ 
        backgroundColor: '#AEA2FD',
        aspectRatio: '16/9'
      }}
    >
      {/* Instructions Button - Animated from top left */}
      <div 
        className={`absolute top-8 left-8 flex items-center gap-2 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}
      >
        <Info className="w-6 h-6 text-gray-800" />
        <span className="text-lg font-medium text-gray-800">Instructions</span>
      </div>

      <div 
        className={`absolute top-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        <h1 className="font-semibold text-gray-900 text-base">
          Welcome to Role-play
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-5xl px-8">
        {/* TV Container - Animated scale and fade */}
        <div 
          className={`relative transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-6'
          } hover:scale-105 hover:rotate-1 cursor-pointer`}
          style={{ 
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.35))',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Vintage TV Frame with wood texture */}
          <div className="relative w-[520px] h-[420px] rounded-2xl p-8 border-2 border-accent" 
            style={{
              background: 'linear-gradient(135deg, #2D2D51 2%, #2D2D51 25%, #2D2D51 50%, #2D2D51 75%, #2D2D51 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Wood grain texture overlay */}
            <div className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`
              }}
            />
            
            {/* Vintage speaker grill - left side */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-40 rounded-lg"
              style={{ 
                background: 'linear-gradient(180deg, #3D2817 0%, #2D1F12 100%)',
                backgroundImage: 'radial-gradient(circle at center, #2D1F12 1px, transparent 1px)',
                backgroundSize: '8px 8px'
              }}
            />
            
            {/* Vintage speaker grill - right side */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-40 rounded-lg"
              style={{ 
                background: 'linear-gradient(180deg, #3D2817 0%, #2D1F12 100%)',
                backgroundImage: 'radial-gradient(circle at center, #2D1F12 1px, transparent 1px)',
                backgroundSize: '8px 8px'
              }}
            />

            {/* TV Screen bezel */}
            <div className="relative w-full h-[300px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg p-3 border-2 border-gray-700"
              style={{
                boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Inner screen frame */}
              <div className="relative w-full h-full bg-black rounded overflow-hidden border border-gray-900">
                {/* CRT scanline effect */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-15">
                  <div className="w-full h-full bg-gradient-to-b from-transparent via-white to-transparent animate-scan" 
                    style={{
                      backgroundSize: '100% 3px',
                      animation: 'scan 6s linear infinite'
                    }}
                  />
                </div>
                
                {/* Curved glass reflection effect */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent rounded" />
                
                {/* Vignette effect */}
                <div className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
                  }}
                />
                
                {/* Generated Image Display */}
                <img
                  src={`https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompts[currentImageIndex])}?width=800&height=600&nologo=true`}
                  alt="Role-play character"
                  className={`w-full h-full object-cover transition-opacity duration-1000 ${
                    isVisible ? 'opacity-90' : 'opacity-0'
                  }`}
                  style={{ filter: 'contrast(1.1) saturate(1.2)' }}
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* Vintage control panel below screen */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-8 items-center px-8 py-3 rounded-lg"
              style={{
                background: 'linear-gradient(180deg, #2D2D51 0%, #2D2D51 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Power indicator light */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600 shadow-lg shadow-red-600/50 animate-pulse" />
                <span className="text-xs text-amber-200/70 font-mono">PWR</span>
              </div>
              
              {/* Vintage dial knobs */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border-2 border-amber-200/30 bg-gradient-to-br from-gray-700 to-gray-900 relative"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}
                >
                  <div className="absolute top-1 left-1/2 w-0.5 h-2 bg-amber-200/50 -translate-x-1/2" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-amber-200/30 bg-gradient-to-br from-gray-700 to-gray-900 relative"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}
                >
                  <div className="absolute top-1 left-1/2 w-0.5 h-2 bg-amber-200/50 -translate-x-1/2" />
                </div>
              </div>
              
              {/* Channel indicator */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-amber-200/70 font-mono">CH</span>
                <div className="text-sm text-amber-400 font-mono px-2 py-0.5 bg-black/30 rounded">
                  {currentImageIndex + 1}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h2 
            className={`font-bold text-gray-900 transition-all duration-1000 delay-700 text-4xl ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Are you ready?
          </h2>
          
          <p 
            className={`text-gray-700 transition-all duration-1000 delay-900 text-base ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Your journey starts here
          </p>
        </div>

        {/* Start Button - Animated from bottom */}
        <Button
          size="lg"
          className={`px-12 text-xl font-semibold bg-purple-900 hover:bg-purple-800 text-white transition-all duration-1000 delay-1100 shadow-2xl hover:shadow-purple-900/50 hover:scale-110 rounded-lg py-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          onClick={() => {
            setShowCharacterScreen(true)
          }}
        >
          Start
        </Button>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

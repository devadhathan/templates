'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'
import { SwipeableCardDeck } from '@/components/swipeable-card-deck'

export default function InspectionSlide() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#E5E4FA' }}>
      {/* 16:9 Container */}
      <div className="w-full max-w-[1600px] aspect-[16/9] shadow-2xl rounded-2xl overflow-hidden" style={{ backgroundColor: '#E5E4FA' }}>
        <div className="grid grid-cols-2 gap-16 h-full p-16">
          {/* Left Section */}
          <div className="flex flex-col space-y-12 justify-start">
            {/* Title */}
            <div className="space-y-4">
              <h1 className="font-bold text-balance text-4xl" style={{ color: '#470079' }}>
                The Final Inspection
              </h1>
              <p className="leading-relaxed text-pretty text-base" style={{ color: '#6b5b95' }}>
                A three-step process for quality assurance and system testing to
                guarantee peak performance.
              </p>
            </div>

            {/* Content Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="rounded-full flex items-center justify-center shadow-lg h-11 w-11" style={{ backgroundColor: '#470079' }}>
                  <Settings className="text-white h-6 w-6" />
                </div>
                <h2 className="font-semibold text-lg" style={{ color: '#470079' }}>
                  Heading
                </h2>
              </div>

              <ul className="space-y-3 ml-12">
                <li className="leading-relaxed text-base" style={{ color: '#6b5b95' }}>
                  A three-step process for quality assurance and system testing
                  to guarantee peak performance.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Card Deck */}
          <div className="flex items-center justify-center">
            <SwipeableCardDeck />
          </div>
        </div>
      </div>
    </div>
  )
}

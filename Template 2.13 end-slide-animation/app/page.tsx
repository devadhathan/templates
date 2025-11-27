"use client"

import { useEffect } from "react"

import { useState } from "react"

export default function EndSlide() {
  return (
    <div className="min-h-screen bg-[#E5E1F0] flex flex-col items-center justify-center p-8">
      <div className="mb-12 animate-slide-in-down">
        <img 
          src="/images/design-mode/image.png" 
          alt="Three-pointed star"
          className="w-40 h-20 drop-shadow-lg"
        />
      </div>

      <h1 className="font-bold text-[#5B1E8F] mb-6 text-center text-balance animate-slide-in-up animation-delay-200 text-4xl">
        You've made to the end
      </h1>

      <p className="text-[#4A4458] text-center max-w-2xl mb-12 leading-relaxed animate-slide-in-up animation-delay-400 text-base">
        A three-step process for quality assurance and system testing to guarantee peak performance.
      </p>

      <button className="bg-[#5B1E8F] text-white px-16 py-4 rounded-full text-lg font-medium hover:bg-[#4A1673] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 animate-slide-in-up animation-delay-600">
        End
      </button>
    </div>
  )
}

"use client"

import Image from "next/image"

export function DecorativeShapes() {
  return (
    <div
      className="absolute bottom-12 left-8 flex gap-8 animate-fade-in-up"
      style={{ animationDelay: "0.6s", opacity: 0 }}
    >
      {/* Outline shape */}
      <div className="relative w-32 h-32 animate-float" style={{ animationDelay: "0s" }}>
        <Image
          src="/shapes/outline-shape.png"
          alt=""
          width={128}
          height={128}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Filled purple blob */}
      <div className="relative w-40 h-40 animate-float" style={{ animationDelay: "1s" }}>
        <Image src="/shapes/purple-blob.png" alt="" width={160} height={160} className="w-full h-full object-contain" />
      </div>
    </div>
  )
}

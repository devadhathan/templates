"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

export default function InteractiveSlide() {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples([...ripples, { x, y, id }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 600)

    console.log("Presentation ended")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 ">
      <motion.div
        className="relative flex aspect-video w-full max-w-7xl justify-center overflow-hidden bg-black my-9 px-0 py-14 h-auto items-center mx-0"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src="/images/design-mode/image(1).png"
          alt=""
          className="absolute inset-0 object-cover my-28 py-0 h-max w-full mx-px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center px-8 text-center space-y-8">
          <motion.h1
            className="cursor-default text-5xl font-bold text-white md:text-6xl lg:text-5xl"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {Array.from("You've made to the end").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block text-5xl"
                whileHover={{
                  y: 0,
                  scale: 1.1,
                  color: "#93c5fd",
                  transition: { duration: 0.2 },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="max-w-2xl cursor-default text-gray-400 text-base"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.02, color: "#d1d5db" }}
          >
            A three-step process for quality assurance and system testing to guarantee peak performance.
          </motion.p>

          <motion.button
            className="relative overflow-hidden rounded-full bg-white px-20 py-4 text-lg font-semibold text-gray-900 shadow-lg md:px-14"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 25px 50px rgba(255, 255, 255, 0.3)",
              backgroundColor: "#f3f4f6",
            }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleButtonClick}
          >
            <motion.span
              className="relative z-10"
              animate={{
                scale: isHovered ? 1.08 : 1,
                letterSpacing: isHovered ? "0.05em" : "0em",
              }}
              transition={{ duration: 0.3 }}
            >
              End
            </motion.span>

            {/* Animated gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "100%" : "-100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Ripple effects on click */}
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                className="absolute rounded-full bg-blue-200/50"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 0,
                  height: 0,
                }}
                initial={{ width: 0, height: 0, opacity: 1 }}
                animate={{
                  width: 300,
                  height: 300,
                  opacity: 0,
                  x: -150,
                  y: -150,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </motion.button>
        </div>

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <motion.div
          className="absolute left-12 top-12 h-12 w-12 rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          whileHover={{ scale: 1.3, borderColor: "rgba(156, 163, 175, 0.3)" }}
        />
        <motion.div
          className="absolute bottom-12 right-12 h-16 w-16 rounded-full border border-white/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          whileHover={{ scale: 1.3, borderColor: "rgba(156, 163, 175, 0.3)" }}
        />
      </motion.div>
    </div>
  )
}

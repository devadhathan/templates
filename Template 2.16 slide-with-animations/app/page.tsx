"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function SimulationSlide() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const generateImage = async () => {
      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt:
              "beautiful landscape with green mountains and blue sky with white clouds, serene natural scenery, high quality, photorealistic",
          }),
        })
        const data = await response.json()
        setImageUrl(data.imageUrl)
      } catch (error) {
        console.error("Failed to generate image:", error)
        setImageUrl("/majestic-mountain-vista.png")
      } finally {
        setIsLoading(false)
      }
    }

    generateImage()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center p-8" style={{ backgroundColor: "#E5E4FA" }}>
      <motion.div
        className="relative w-full max-w-7xl aspect-video rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "#E5E4FA" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 gap-12 h-full p-16">
          {/* Left Content */}
          <motion.div
            className="flex flex-col space-y-6 justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1
              className="font-bold text-gray-900 leading-tight text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Welcome to simulation
            </motion.h1>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                A three-step process for quality assurance and system testing to guarantee peak performance.
              </p>

              <p className="text-base text-gray-600 leading-relaxed">
                Welcome to this lesson on the professional HVAC cleaning process. This training provides a dense,
                detailed breakdown of the essential techniques you'll need for comprehensive system cleaning.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex items-center justify-start flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-200"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-purple-900 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Scenic landscape with mountains"
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Next Button */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="px-12 py-6 text-lg rounded-full bg-purple-900 hover:bg-purple-800 text-white shadow-lg"
              onClick={() => console.log("Next slide")}
            >
              Next
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

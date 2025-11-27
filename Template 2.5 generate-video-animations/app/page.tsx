'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function Slide() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* 16:9 Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[1600px] aspect-video bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="h-full flex flex-col">
          {/* Video Section - Top 60% */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-[60%] relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden"
          >
            {/* Placeholder Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="/placeholder.mp4"
                type="video/mp4"
              />
              {/* Fallback content */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                <div className="text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"
                  />
                  <p className="text-muted-foreground">
                    {'Video Placeholder - Veo3 API Integration Ready'}
                  </p>
                </div>
              </div>
            </video>

            {/* Animated Overlay Decorations */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-8 right-16 w-16 h-16 bg-orange-400 rounded-full opacity-80"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                x: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute bottom-12 left-20 w-12 h-12 bg-purple-500 rounded-full opacity-70"
            />
          </motion.div>

          {/* Content Section - Bottom 40% */}
          <div className="flex items-center gap-8 px-16 bg-white py-4 h-6/12">
            {/* Left Card - Visual Inspection */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex-shrink-0"
            >
              <Card className="w-[280px] p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-300 cursor-pointer h-auto py-3 gap-1">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mb-6 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto"
                >
                  <Search className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-center mb-4 text-foreground">
                  Visual Inspection
                </h3>
                <p className="text-sm text-center text-muted-foreground leading-relaxed">
                  Inspect all accessible ductwork with cameras or flashlights
                  to confirm that no debris or blockages remain after cleaning.
                </p>
              </Card>
            </motion.div>

            {/* Right Content Area */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex-1"
            >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="font-bold mb-6 text-foreground bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent text-xl"
              >
                Quality Assurance Process
              </motion.h2>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex items-start gap-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 flex-shrink-0"
                />
                <p className="text-muted-foreground leading-relaxed text-base">
                  A three-step process for quality assurance and system testing
                  to guarantee peak performance.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

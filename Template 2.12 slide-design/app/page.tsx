"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Page() {
  return (
    <div className="h-screen w-full flex">
      {/* First Section - E5E4FA */}
      <motion.div
        className="w-1/2 flex flex-col px-16 justify-start my-0 py-44"
        style={{ backgroundColor: "#E5E4FA" }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="mb-6 text-4xl font-semibold"
          style={{ color: "#5B4B9C" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          The Final Inspection
        </motion.h1>
        <motion.p
          className="text-base"
          style={{ color: "#7A6BA8" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          A three-step process for quality assurance and system testing to guarantee peak performance.
        </motion.p>
      </motion.div>

      {/* Second Section - C1BFEC */}
      <motion.div
        className="w-1/2 flex items-center justify-center px-16"
        style={{ backgroundColor: "#C1BFEC" }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="rounded-2xl p-8 shadow-xl max-w-md w-full"
          style={{ backgroundColor: "#CF95FE" }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          whileHover={{
            scale: 1.02,
            y: -5,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="rounded-xl overflow-hidden mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/design-mode/image.png"
              alt="Aerial view of circuit board"
              width={400}
              height={300}
              className="w-full h-auto"
            />
          </motion.div>
          <motion.h2
            className="mb-4 text-gray-900 text-xl font-medium text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Address Deficiencies
          </motion.h2>
          <motion.p
            className="text-base leading-relaxed text-justify"
            style={{ color: "#6B4D8A" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            If any areas require more attention, they must be immediately addressed to ensure a complete and thorough
            cleaning.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}

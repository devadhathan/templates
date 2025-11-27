'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'

interface InspectionCard {
  id: number
  title: string
  description: string
  color: string
  imagePrompt: string
}

const CARDS: InspectionCard[] = [
  {
    id: 1,
    title: 'Visual Inspection',
    description:
      'Inspect all accessible ductwork with cameras or flashlights to confirm that no debris or blockages remain after cleaning.',
    color: '#F0FE94',
    imagePrompt: 'precision measurement tools calipers engineering equipment',
  },
  {
    id: 2,
    title: 'Airflow Testing',
    description:
      'Measure airflow rates at vents and registers to ensure optimal circulation and verify system efficiency.',
    color: '#A5C8E6',
    imagePrompt: 'airflow testing equipment hvac system ventilation',
  },
  {
    id: 3,
    title: 'System Diagnostics',
    description:
      'Run comprehensive diagnostic tests on the HVAC system to validate proper operation and performance metrics.',
    color: '#CF95FE',
    imagePrompt: 'hvac diagnostic tools digital testing equipment',
  },
  {
    id: 4,
    title: 'Final Report',
    description:
      'Generate detailed inspection report with findings, recommendations, and compliance verification documentation.',
    color: '#FE949D',
    imagePrompt: 'inspection report documentation clipboard checklist',
  },
]

export function SwipeableCardDeck() {
  const [cards, setCards] = useState(CARDS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleSwipe = (direction: 'left' | 'right') => {
    setCards((prevCards) => {
      const newCards = [...prevCards]
      const topCard = newCards.shift()
      if (topCard) {
        newCards.push(topCard)
      }
      return newCards
    })
    setCurrentIndex((prev) => (prev + 1) % CARDS.length)
  }

  return (
    <div 
      className="relative w-full h-full max-w-md max-h-[600px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {CARDS.map((_, index) => (
          <motion.div
            key={index}
            className="rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              backgroundColor: index === currentIndex ? '#470079' : '#b4a5c8',
              width: index === currentIndex ? '1.5rem' : '0.5rem',
            }}
            transition={{
              delay: index * 0.1,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            style={{ height: '0.5rem' }}
          />
        ))}
      </div>

      <div className="relative w-full h-full">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            onSwipe={handleSwipe}
            isTop={index === 0}
            isHovered={isHovered}
          />
        ))}
      </div>
    </div>
  )
}

interface CardProps {
  card: InspectionCard
  index: number
  onSwipe: (direction: 'left' | 'right') => void
  isTop: boolean
  isHovered: boolean
}

function Card({ card, index, onSwipe, isTop, isHovered }: CardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const swipeIndicatorOpacity = useTransform(x, [-100, 0, 100], [0, 0, 1])

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left')
    }
  }

  const scale = 1 - index * 0.04
  const baseYOffset = index * 20
  const baseXOffset = index * 16
  const yOffset = isHovered ? baseYOffset + index * 10 : baseYOffset
  const xOffset = isHovered ? baseXOffset + index * 8 : baseXOffset

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x: isTop ? x : xOffset,
        y: isTop ? y : yOffset,
        rotate: isTop ? rotate : 0,
        scale,
        zIndex: 10 - index,
      }}
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotateY: -30,
      }}
      animate={{
        opacity: 1,
        y: yOffset,
        x: xOffset,
        scale,
        rotateY: 0,
        rotate: 0,
      }}
      transition={{
        delay: index * 0.15,
        type: 'spring',
        stiffness: 200,
        damping: 25,
      }}
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileHover={
        isTop
          ? {
              scale: 1.02,
              transition: { duration: 0.2 },
            }
          : undefined
      }
    >
      <div
        className={`w-full h-full rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm ${!isTop ? 'pointer-events-none' : ''}`}
        style={{ backgroundColor: card.color }}
      >
        <div className="p-8 h-full flex flex-col">
          <motion.div 
            className="flex-1 rounded-2xl bg-white/90 overflow-hidden mb-6 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
          >
            <img
              src={`/.jpg?height=400&width=600&query=${encodeURIComponent(card.imagePrompt)}`}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div 
            className="space-y-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 text-balance">
              {card.title}
            </h3>
            <p className="text-base text-gray-700 leading-relaxed text-pretty">
              {card.description}
            </p>
          </motion.div>
        </div>
      </div>

      {isTop && (
        <motion.div
          className="absolute top-8 right-8 text-sm font-semibold pointer-events-none"
          style={{ 
            opacity: swipeIndicatorOpacity,
            color: '#470079'
          }}
        >
          Swipe →
        </motion.div>
      )}
    </motion.div>
  )
}

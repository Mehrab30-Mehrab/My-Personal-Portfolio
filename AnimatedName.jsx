import { motion } from 'framer-motion'
import { useState } from 'react'

const letters = 'Mehrab'.split('')

export default function AnimatedName() {
  const [isHovered, setIsHovered] = useState(false)

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.4,
      },
    },
  }

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      className="relative inline-block cursor-default select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated underline */}
      <motion.div
        className="absolute -bottom-1 left-0 h-[2px] rounded-full"
        style={{
          background: 'linear-gradient(90deg, #14b8a6, #10b981, #a855f7, #ec4899)',
          backgroundSize: '200% 100%',
        }}
        initial={{ width: '0%', opacity: 0 }}
        animate={{
          width: isHovered ? '100%' : '50%',
          opacity: 1,
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          width: { duration: 0.4, ease: 'easeOut' },
          opacity: { delay: 1, duration: 0.6 },
          backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Soft glow behind text on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-3xl -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(20,184,166,0.2), transparent 70%)',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Letters */}
      <div className="flex items-baseline">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
            variants={letterVariants}
            style={{
              background: `linear-gradient(135deg, 
                hsl(${165 + index * 12}, 75%, 42%), 
                hsl(${175 + index * 15}, 65%, 48%))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{
              y: isHovered ? [0, -6, 0] : 0,
              scale: isHovered ? [1, 1.08, 1] : 1,
            }}
            transition={{
              y: { delay: index * 0.04, duration: 0.35, ease: 'easeOut' },
              scale: { delay: index * 0.04, duration: 0.35, ease: 'easeOut' },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Subtle floating particles on hover */}
      {isHovered && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `hsl(${165 + i * 25}, 70%, 55%)`,
                left: `${20 + i * 20}%`,
                top: '40%',
              }}
              initial={{ opacity: 0, y: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -20],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 0.8,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}
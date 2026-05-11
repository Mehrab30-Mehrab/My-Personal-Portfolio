import { motion } from 'framer-motion'

const floatingShapes = [
  { type: 'circle', size: 18, x: '10%', y: '20%', delay: 0, duration: 8 },
  { type: 'circle', size: 12, x: '85%', y: '15%', delay: 1, duration: 10 },
  { type: 'circle', size: 22, x: '70%', y: '60%', delay: 2, duration: 9 },
  { type: 'circle', size: 14, x: '25%', y: '75%', delay: 3, duration: 11 },
  { type: 'square', size: 16, x: '90%', y: '40%', delay: 0.5, duration: 12 },
  { type: 'square', size: 20, x: '5%', y: '55%', delay: 2.5, duration: 9 },
  { type: 'square', size: 12, x: '50%', y: '10%', delay: 1.5, duration: 10 },
  { type: 'triangle', size: 20, x: '75%', y: '80%', delay: 1, duration: 11 },
  { type: 'triangle', size: 16, x: '30%', y: '35%', delay: 3.5, duration: 8 },
  { type: 'triangle', size: 18, x: '60%', y: '25%', delay: 2, duration: 13 },
  { type: 'ring', size: 28, x: '15%', y: '45%', delay: 0, duration: 14 },
  { type: 'ring', size: 24, x: '80%', y: '70%', delay: 2, duration: 10 },
  { type: 'cross', size: 16, x: '45%', y: '85%', delay: 1.5, duration: 9 },
  { type: 'cross', size: 14, x: '95%', y: '25%', delay: 3, duration: 11 },
]

function Shape({ type, size, className }) {
  if (type === 'circle') {
    return (
      <div
        className={`rounded-full border border-current ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }
  if (type === 'square') {
    return (
      <div
        className={`border border-current ${className}`}
        style={{ width: size, height: size, transform: 'rotate(45deg)' }}
      />
    )
  }
  if (type === 'triangle') {
    return (
      <div
        className={className}
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid currentColor`,
        }}
      />
    )
  }
  if (type === 'ring') {
    return (
      <div
        className={`rounded-full border-2 border-current ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }
  if (type === 'cross') {
    return (
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        <div
          className="absolute bg-current"
          style={{ width: '100%', height: 1.5, top: '50%', transform: 'translateY(-50%)' }}
        />
        <div
          className="absolute bg-current"
          style={{ height: '100%', width: 1.5, left: '50%', transform: 'translateX(-50%)' }}
        />
      </div>
    )
  }
  return null
}

export default function MeshBackground() {
  return (
    <div className="mesh-bg">
      {/* Subtle grid lines - teal in light, slate-blue in dark */}
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.6) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.4) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gradient blobs (enhanced) */}
      <div
        className="mesh-blob"
        style={{
          top: '-15%',
          left: '-5%',
          width: '45vw',
          height: '45vw',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3), rgba(16, 185, 129, 0.1))',
          animationDelay: '0s',
        }}
      />
      <div
        className="mesh-blob"
        style={{
          top: '35%',
          right: '-15%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25), rgba(52, 211, 153, 0.08))',
          animationDelay: '2s',
        }}
      />
      <div
        className="mesh-blob"
        style={{
          bottom: '-15%',
          left: '25%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.2), rgba(20, 184, 166, 0.05))',
          animationDelay: '4s',
        }}
      />

      {/* Floating geometric shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute text-teal-500/30 dark:text-teal-400/15"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 8, 0, -8, 0],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Shape type={shape.type} size={shape.size} className="" />
        </motion.div>
      ))}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(249,250,251,0.3) 100%)',
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(13,17,23,0.5) 100%)',
        }}
      />

      {/* Dot grid pattern - teal in light, slate in dark */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(20,184,166,0.18) 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(148,163,184,0.15) 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  )
}
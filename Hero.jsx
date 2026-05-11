import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import profileImg from '../../assets/mehrab.png'
import AnimatedName from './AnimatedName'

const socialLinksData = [
  { id: 1, platform: 'GitHub', url: 'https://github.com/Mehrab30-Mehrab', icon: 'fa-brands fa-github' },
  { id: 2, platform: 'LinkedIn', url: 'https://www.linkedin.com/in/mehrab-morshed-919445237', icon: 'fa-brands fa-linkedin' },
  { id: 3, platform: 'Facebook', url: 'https://www.facebook.com/share/1CTBgBJ8M2/', icon: 'fa-brands fa-facebook' },
  { id: 4, platform: 'Instagram', url: 'https://www.instagram.com/whothefuckismehrab', icon: 'fa-brands fa-instagram' },
  { id: 5, platform: 'WhatsApp', url: 'https://wa.me/qr/J54LFB7CAU2BP1', icon: 'fa-brands fa-whatsapp' },
]

export default function Hero({ bio, socialLinks }) {
  const [typedText, setTypedText] = useState('')
  const fullText = bio?.subtitle || 'Software & Robotics Enthusiast'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [fullText])

  const displaySocials = socialLinks && socialLinks.length > 0 ? socialLinks : socialLinksData
  const nameText = bio?.name?.split(' ')[0] || 'Mehrab'

  return (
    <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center pt-16 relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Text Content */}
          <motion.div
            className="lg:w-[55%] text-center lg:text-left z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md text-xs font-semibold tracking-widest uppercase mb-5 text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              Available for opportunities
            </motion.div>

            <div className="mb-3">
              <motion.h1
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {"Hi, I'm"}
              </motion.h1>
              <AnimatedName />
            </div>

            <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-500 dark:text-gray-400 mb-5 min-h-[2rem]">
              <span className="text-gray-800 dark:text-gray-200 relative">
                {typedText}
                <motion.span
                  className="text-accent-500 ml-0.5"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                >
                  |
                </motion.span>
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-7 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {bio?.description || 'An Undergraduate CSE Student at East West University passionate about technology and innovation.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold rounded-xl hover:bg-accent-600 dark:hover:bg-gray-100 transition-all transform hover:scale-[1.03] shadow-lg hover:shadow-accent-500/20 text-sm"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="w-full sm:w-auto px-7 py-3 bg-white/60 dark:bg-white/5 backdrop-blur-md text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/10 text-sm"
              >
                View My Work
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              {displaySocials.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-accent-600 dark:hover:text-accent-400 hover:border-accent-300 dark:hover:border-accent-500/30 transition-all hover:-translate-y-0.5"
                  title={link.platform}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.08 }}
                >
                  <i className={`${link.icon} text-sm`} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="lg:w-[45%] flex justify-center z-10"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Animated ring */}
              <motion.div
                className="absolute inset-[-6px] rounded-full border-2 border-dashed border-accent-300/40 dark:border-accent-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Subtle glow */}
              <div className="absolute inset-[-10%] rounded-full bg-gradient-to-br from-brand-400/15 via-accent-400/10 to-teal-400/15 dark:from-brand-500/10 dark:via-accent-500/8 dark:to-teal-500/10 blur-2xl" />

              <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-[3px] border-white/70 dark:border-white/10 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 relative z-10 p-1 shadow-xl">
                <img
                  src={profileImg}
                  alt="Mehrab Morshed Marjan"
                  className="w-full h-full rounded-full object-contain"
                  style={{ transform: 'scale(1.1)' }}
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-2 right-0 sm:right-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 px-3 py-2 rounded-xl z-20 flex items-center gap-2 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.i
                  className="fa-solid fa-code text-accent-500 text-base"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <div>
                  <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Passionate</p>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Developer</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'

export default function Skills({ skills }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Group skills by category
  const grouped = useMemo(() => {
    if (!skills) return { technical: [], tools: [] }
    if (Array.isArray(skills)) {
      return {
        technical: skills.filter(s => s.category === 'technical'),
        tools: skills.filter(s => s.category === 'tools'),
      }
    }
    return { technical: skills.technical || [], tools: skills.tools || [] }
  }, [skills])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  }

  return (
    <section id="skills" className="py-20 relative z-10" ref={ref}>
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gray-900 dark:text-white">My </span>
          <span className="text-gradient">Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Technical Stack */}
          <motion.div
            className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border border-gray-200/80 dark:border-white/10 p-6 lg:p-7 rounded-2xl shadow-lg dark:shadow-none"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-lg font-bold mb-5 text-gray-900 dark:text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center">
                <i className="fa-solid fa-laptop-code text-brand-500 text-sm" />
              </div>
              Technical Stack
            </h3>
            <motion.div
              className="grid grid-cols-3 gap-2.5"
              variants={container}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
            >
              {grouped.technical.map((skill) => (
                <motion.div
                  key={skill.id}
                  variants={item}
                  className="bg-gray-50/80 dark:bg-white/[0.04] border border-gray-100 dark:border-white/5 p-3 rounded-xl text-center hover:bg-white dark:hover:bg-white/[0.08] transition-all group cursor-default hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 dark:hover:border-white/10"
                >
                  <i
                    className="text-xl mb-1.5 block transition-transform group-hover:scale-110"
                    style={{ color: skill.color }}
                  >
                    <span className={skill.icon} />
                  </i>
                  <p className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{skill.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Tools & Engineering */}
          <motion.div
            className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border border-gray-200/80 dark:border-white/10 p-6 lg:p-7 rounded-2xl shadow-lg dark:shadow-none"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-lg font-bold mb-5 text-gray-900 dark:text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center">
                <i className="fa-solid fa-toolbox text-pink-500 text-sm" />
              </div>
              Tools & Engineering
            </h3>
            <motion.div
              className="grid grid-cols-3 gap-2.5"
              variants={container}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
            >
              {grouped.tools.map((skill) => (
                <motion.div
                  key={skill.id}
                  variants={item}
                  className="bg-gray-50/80 dark:bg-white/[0.04] border border-gray-100 dark:border-white/5 p-3 rounded-xl text-center hover:bg-white dark:hover:bg-white/[0.08] transition-all group cursor-default hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 dark:hover:border-white/10"
                >
                  <i
                    className="text-xl mb-1.5 block transition-transform group-hover:scale-110"
                    style={{ color: skill.color }}
                  >
                    <span className={skill.icon} />
                  </i>
                  <p className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{skill.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
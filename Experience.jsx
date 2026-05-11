import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Experience({ experience }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 relative z-10" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gradient">Experience</span>{' '}
          <span className="text-gray-900 dark:text-white">Roadmap</span>
        </motion.h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-brand-500 via-pink-500 to-transparent" />

          <div className="space-y-12">
            {experience?.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * index }}
              >
                {/* Dot */}
                <div
                  className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-4 z-10 shadow-lg transition-colors"
                  style={{ borderColor: exp.color || '#7c3aed' }}
                />

                {/* Card */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:w-5/12 md:pr-10' : 'md:w-5/12 md:pl-10 md:ml-auto'}`}>
                  <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:shadow-lg transition-all group">
                    <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="font-medium text-sm mb-3" style={{ color: exp.color || '#7c3aed' }}>
                      {exp.organization}
                    </p>
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-xs text-gray-500 dark:text-gray-400 mb-3 border border-gray-200 dark:border-white/5">
                      {exp.start_date} - {exp.end_date || 'Present'}
                    </span>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-light">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
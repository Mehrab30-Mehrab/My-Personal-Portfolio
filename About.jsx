import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import aboutImg from '../../assets/mehrab2.jpeg'

export default function About({ bio }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-20 relative z-10" ref={ref}>
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gradient">About</span>{' '}
          <span className="text-gray-900 dark:text-white">Me</span>
        </motion.h2>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-center max-w-6xl mx-auto">
          {/* Image */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={aboutImg}
                alt="Mehrab Morshed Marjan"
                className="w-full aspect-[3/4] object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-accent-400/30 rounded-2xl -z-10" />
            <div className="absolute -top-3 -left-3 w-16 h-16 border-2 border-brand-400/20 rounded-xl -z-10" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="lg:col-span-3 bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-gray-200 dark:border-white/10 p-7 lg:p-9 rounded-2xl shadow-lg dark:shadow-none"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="font-display text-xl lg:text-2xl font-bold mb-5 text-gray-900 dark:text-white">
              A Passionate Tech Enthusiast
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-[15px] lg:text-base">
              {bio?.about_text || 'I am a passionate technology enthusiast with a strong interest in robotics, software engineering, and creative problem-solving. Currently pursuing my B.Sc. in Computer Science and Engineering at East West University, I enjoy exploring innovative ideas and continuously expanding my technical skills.'}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-7 leading-relaxed text-[15px] lg:text-base">
              {bio?.about_text_2 || 'As a General Member of East West University Robotics Club and a Senior General Member of East West Telecommunications Club, I actively participate in technical activities, collaborative projects, and learning opportunities that encourage innovation and real-world impact.'}
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: 'fa-robot', label: 'Robotics', color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-500/10' },
                { icon: 'fa-code', label: 'Software Dev', color: 'text-accent-600 dark:text-accent-400', bg: 'bg-accent-50 dark:bg-accent-500/10' },
                { icon: 'fa-lightbulb', label: 'Problem Solving', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className={`${item.bg} border border-gray-100 dark:border-white/5 p-3 lg:p-4 rounded-xl flex flex-col items-center justify-center text-center group cursor-default`}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <i className={`fas ${item.icon} ${item.color} text-xl lg:text-2xl mb-2 group-hover:scale-110 transition-transform`} />
                  <p className="font-semibold text-xs text-gray-700 dark:text-gray-300">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web App' },
  { key: 'app', label: 'Applications' },
  { key: 'hardware', label: 'Hardware' },
]

export default function Projects({ projects }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [filter, setFilter] = useState('all')

  const filteredProjects = filter === 'all'
    ? projects
    : projects?.filter(p => p.category === filter)

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'web': return 'text-brand-600 dark:text-brand-400'
      case 'app': return 'text-pink-600 dark:text-pink-400'
      case 'hardware': return 'text-blue-600 dark:text-blue-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <section id="projects" className="py-24 relative z-10" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            <span className="text-gray-900 dark:text-white">Featured </span>
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Explore some of my recent work across web development, software applications, and hardware engineering.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex justify-center mb-12 flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === cat.key
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg'
                  : 'bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredProjects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              layout
            >
              <a
                href={project.live_url || project.source_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="fa-solid fa-code text-4xl text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-white/10 px-3 py-1 rounded-full">
                    <span className={`text-xs font-semibold capitalize ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-display font-bold mb-2 text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow font-light leading-relaxed">
                    {project.description}
                  </p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.split(',').map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-md border border-gray-200 dark:border-white/5"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-white/5">
                    <span>{project.live_url ? 'View Live' : 'Source Code'}</span>
                    <i className={`${project.live_url ? 'fa-solid fa-arrow-up-right-from-square' : 'fa-brands fa-github'} text-gray-400 group-hover:text-brand-500 transition-colors`} />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
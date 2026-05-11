import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function Contact({ bio }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      await axios.post(`${API_URL}/contact`, formData)
      setStatus({ type: 'success', message: 'Thank you! Message sent successfully.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.error || 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
      setTimeout(() => setStatus({ type: '', message: '' }), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 relative z-10" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gray-900 dark:text-white">Let's </span>
          <span className="text-gradient">Connect</span>
        </motion.h2>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-3xl font-bold mb-6 text-gray-900 dark:text-white">Reach Out</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed font-light">
              I'm currently looking for new opportunities and collaborations. Whether you have a question, a project idea, or just want to say hi, my inbox is always open!
            </p>

            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/30 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all mr-4">
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-gray-900 dark:text-white font-medium text-sm">{bio?.email || 'mehrab@example.com'}</p>
                </div>
              </div>
              <div className="flex items-center group">
                <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-800/30 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all mr-4">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-gray-900 dark:text-white font-medium text-sm">{bio?.location || 'Dhaka, Bangladesh'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-white/10 relative overflow-hidden shadow-xl dark:shadow-none"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-5 py-4 bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                required
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-4 bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-bold py-4 rounded-xl hover:bg-brand-600 dark:hover:bg-gray-100 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-sm font-medium text-center rounded-xl py-3 px-4 border ${
                  status.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/30'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30'
                }`}
              >
                {status.message}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
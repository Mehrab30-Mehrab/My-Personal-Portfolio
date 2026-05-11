import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import ScrollProgress from '../components/ScrollProgress'
import MeshBackground from '../components/MeshBackground'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function Home({ darkMode, toggleDarkMode }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/portfolio/data`)
      setData(res.data)
    } catch (err) {
      console.error('Failed to fetch portfolio data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0f]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  const visibleSections = data?.sections?.filter(s => s.visible) || []
  const isSectionVisible = (key) => {
    if (!data?.sections || data.sections.length === 0) return true
    return visibleSections.some(s => s.key === key)
  }

  return (
    <div className="relative">
      <ScrollProgress />
      <MeshBackground />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {isSectionVisible('hero') && (
        <Hero bio={data?.bio} socialLinks={data?.socialLinks} />
      )}
      {isSectionVisible('about') && (
        <About bio={data?.bio} />
      )}
      {isSectionVisible('skills') && (
        <Skills skills={data?.skills} />
      )}
      {isSectionVisible('projects') && (
        <Projects projects={data?.projects} />
      )}
      {isSectionVisible('experience') && (
        <Experience experience={data?.experience} />
      )}
      {isSectionVisible('contact') && (
        <Contact bio={data?.bio} />
      )}

      <Footer bio={data?.bio} socialLinks={data?.socialLinks} />
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function AdminDashboard() {
  const { user, logout, getAuthHeaders } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('bio')
  const [bio, setBio] = useState(null)
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [experience, setExperience] = useState([])
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const [newSkill, setNewSkill] = useState({ name: '', category: 'technical', icon: '', color: '#14b8a6' })
  const [newProject, setNewProject] = useState({ title: '', description: '', category: 'web', image_url: '', live_url: '', source_url: '', technologies: '' })
  const [projectImageFile, setProjectImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [newExperience, setNewExperience] = useState({ title: '', organization: '', description: '', start_date: '', end_date: '', color: '#14b8a6' })
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      const headers = getAuthHeaders()
      const [bioRes, skillsRes, projectsRes, expRes, sectionsRes] = await Promise.all([
        axios.get(`${API_URL}/admin/bio`, headers),
        axios.get(`${API_URL}/admin/skills`, headers),
        axios.get(`${API_URL}/admin/projects`, headers),
        axios.get(`${API_URL}/admin/experience`, headers),
        axios.get(`${API_URL}/admin/sections`, headers),
      ])
      setBio(bioRes.data)
      setSkills(skillsRes.data)
      setProjects(projectsRes.data)
      setExperience(expRes.data)
      setSections(sectionsRes.data)
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: '' }), 3000)
  }

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  const saveBio = async () => {
    setSaving(true)
    try {
      await axios.put(`${API_URL}/admin/bio`, bio, getAuthHeaders())
      showMessage('Bio updated successfully!')
    } catch (err) {
      showMessage('Failed to update bio', 'error')
    } finally {
      setSaving(false)
    }
  }

  const addSkill = async () => {
    if (!newSkill.name) return showMessage('Please enter a skill name', 'error')
    try {
      await axios.post(`${API_URL}/admin/skills`, newSkill, getAuthHeaders())
      setNewSkill({ name: '', category: 'technical', icon: '', color: '#14b8a6' })
      fetchAllData()
      showMessage('Skill added!')
      setShowAddForm(false)
    } catch (err) {
      showMessage('Failed to add skill', 'error')
    }
  }

  const deleteSkill = async (id) => {
    if (!confirm('Delete this skill?')) return
    try {
      await axios.delete(`${API_URL}/admin/skills/${id}`, getAuthHeaders())
      setSkills(skills.filter(s => s.id !== id))
      showMessage('Skill deleted!')
    } catch (err) {
      showMessage('Failed to delete skill', 'error')
    }
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProjectImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const addProject = async () => {
    if (!newProject.title) return showMessage('Please enter a project title', 'error')
    try {
      const formData = new FormData()
      formData.append('title', newProject.title)
      formData.append('description', newProject.description)
      formData.append('category', newProject.category)
      formData.append('live_url', newProject.live_url)
      formData.append('source_url', newProject.source_url)
      formData.append('technologies', newProject.technologies)
      if (projectImageFile) {
        formData.append('image', projectImageFile)
      } else if (newProject.image_url) {
        formData.append('image_url', newProject.image_url)
      }
      const headers = getAuthHeaders()
      await axios.post(`${API_URL}/admin/projects`, formData, {
        headers: { ...headers.headers, 'Content-Type': 'multipart/form-data' }
      })
      setNewProject({ title: '', description: '', category: 'web', image_url: '', live_url: '', source_url: '', technologies: '' })
      setProjectImageFile(null)
      setImagePreview('')
      fetchAllData()
      showMessage('Project added!')
      setShowAddForm(false)
    } catch (err) {
      showMessage('Failed to add project', 'error')
    }
  }

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await axios.delete(`${API_URL}/admin/projects/${id}`, getAuthHeaders())
      setProjects(projects.filter(p => p.id !== id))
      showMessage('Project deleted!')
    } catch (err) {
      showMessage('Failed to delete project', 'error')
    }
  }

  const addExperience = async () => {
    if (!newExperience.title) return showMessage('Please enter a title', 'error')
    try {
      await axios.post(`${API_URL}/admin/experience`, newExperience, getAuthHeaders())
      setNewExperience({ title: '', organization: '', description: '', start_date: '', end_date: '', color: '#14b8a6' })
      fetchAllData()
      showMessage('Experience added!')
      setShowAddForm(false)
    } catch (err) {
      showMessage('Failed to add experience', 'error')
    }
  }

  const deleteExperience = async (id) => {
    if (!confirm('Delete this experience?')) return
    try {
      await axios.delete(`${API_URL}/admin/experience/${id}`, getAuthHeaders())
      setExperience(experience.filter(e => e.id !== id))
      showMessage('Experience deleted!')
    } catch (err) {
      showMessage('Failed to delete experience', 'error')
    }
  }

  const toggleSection = async (section) => {
    try {
      const newVisible = section.visible ? 0 : 1
      await axios.put(`${API_URL}/admin/sections/${section.id}`, { visible: newVisible }, getAuthHeaders())
      setSections(sections.map(s => s.id === section.id ? { ...s, visible: newVisible } : s))
      showMessage(`Section ${newVisible ? 'shown' : 'hidden'}!`)
    } catch (err) {
      showMessage('Failed to update section', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0f]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-teal-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { key: 'bio', label: 'Bio', icon: 'fa-user', count: null },
    { key: 'skills', label: 'Skills', icon: 'fa-code', count: skills.length },
    { key: 'projects', label: 'Projects', icon: 'fa-folder-open', count: projects.length },
    { key: 'experience', label: 'Experience', icon: 'fa-briefcase', count: experience.length },
    { key: 'sections', label: 'Sections', icon: 'fa-eye', count: null },
  ]

  const inputClass = "w-full px-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-sm"
  const labelClass = "block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider"
  const cardClass = "bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-xl"

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <i className="fas fa-cog text-white text-xs" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-gray-900 dark:text-white leading-none">Dashboard</h1>
              <p className="text-[10px] text-gray-400 mt-0.5">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link to="/admin/inbox" className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
              <i className="fas fa-inbox mr-1.5" />
              <span className="hidden sm:inline">Inbox</span>
            </Link>
            <a href="/" target="_blank" className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all hidden sm:flex items-center">
              <i className="fas fa-external-link-alt mr-1.5" />Site
            </a>
            <button onClick={handleLogout} className="px-3 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all ml-1">
              <i className="fas fa-sign-out-alt mr-1.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-16 left-1/2 z-[100] px-5 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 ${
              message.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-teal-500 text-white'
            }`}
          >
            <i className={`fas ${message.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}`} />
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setShowAddForm(false) }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <i className={`fas ${tab.icon} text-xs`} />
              {tab.label}
              {tab.count !== null && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >

          {/* BIO TAB */}
          {activeTab === 'bio' && bio && (
            <div className={`${cardClass} p-6 lg:p-8`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">Edit Bio</h3>
                <button onClick={saveBio} disabled={saving} className="px-5 py-2.5 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-all disabled:opacity-50 text-sm shadow-lg shadow-teal-500/20">
                  <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'} mr-2`} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input className={inputClass} value={bio.name || ''} onChange={(e) => setBio({...bio, name: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Title</label>
                  <input className={inputClass} value={bio.title || ''} onChange={(e) => setBio({...bio, title: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Subtitle (Typing Text)</label>
                  <input className={inputClass} value={bio.subtitle || ''} onChange={(e) => setBio({...bio, subtitle: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input className={inputClass} type="email" value={bio.email || ''} onChange={(e) => setBio({...bio, email: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input className={inputClass} value={bio.location || ''} onChange={(e) => setBio({...bio, location: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Avatar URL</label>
                  <input className={inputClass} value={bio.avatar_url || ''} onChange={(e) => setBio({...bio, avatar_url: e.target.value})} />
                </div>
              </div>
              <div className="mt-5">
                <label className={labelClass}>Hero Description</label>
                <textarea className={inputClass} rows="3" value={bio.description || ''} onChange={(e) => setBio({...bio, description: e.target.value})} />
              </div>
              <div className="mt-5">
                <label className={labelClass}>About Text (Paragraph 1)</label>
                <textarea className={inputClass} rows="4" value={bio.about_text || ''} onChange={(e) => setBio({...bio, about_text: e.target.value})} />
              </div>
              <div className="mt-5">
                <label className={labelClass}>About Text (Paragraph 2)</label>
                <textarea className={inputClass} rows="4" value={bio.about_text_2 || ''} onChange={(e) => setBio({...bio, about_text_2: e.target.value})} />
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">Skills ({skills.length})</h3>
                <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2.5 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-all text-sm shadow-lg shadow-teal-500/20">
                  <i className={`fas ${showAddForm ? 'fa-times' : 'fa-plus'} mr-2`} />
                  {showAddForm ? 'Cancel' : 'Add Skill'}
                </button>
              </div>

              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`${cardClass} p-5`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className={labelClass}>Name</label>
                          <input className={inputClass} placeholder="e.g. React" value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} />
                        </div>
                        <div>
                          <label className={labelClass}>Category</label>
                          <select className={inputClass} value={newSkill.category} onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}>
                            <option value="technical">Technical</option>
                            <option value="tools">Tools</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Icon Class</label>
                          <input className={inputClass} placeholder="fa-brands fa-react" value={newSkill.icon} onChange={(e) => setNewSkill({...newSkill, icon: e.target.value})} />
                        </div>
                        <div className="flex items-end">
                          <button onClick={addSkill} className="w-full px-4 py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-all text-sm">
                            <i className="fas fa-plus mr-2" />Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((skill) => (
                  <div key={skill.id} className={`${cardClass} px-4 py-3 flex items-center justify-between group hover:border-teal-500/30 transition-colors`}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <i className={`${skill.icon} text-base`} style={{ color: skill.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{skill.category}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteSkill(skill.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <i className="fas fa-trash text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">Projects ({projects.length})</h3>
                <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2.5 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-all text-sm shadow-lg shadow-teal-500/20">
                  <i className={`fas ${showAddForm ? 'fa-times' : 'fa-plus'} mr-2`} />
                  {showAddForm ? 'Cancel' : 'Add Project'}
                </button>
              </div>

              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`${cardClass} p-5 space-y-4`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>Title</label>
                          <input className={inputClass} placeholder="Project name" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} />
                        </div>
                        <div>
                          <label className={labelClass}>Category</label>
                          <select className={inputClass} value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})}>
                            <option value="web">Web App</option>
                            <option value="app">Application</option>
                            <option value="hardware">Hardware</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Live URL</label>
                          <input className={inputClass} placeholder="https://..." value={newProject.live_url} onChange={(e) => setNewProject({...newProject, live_url: e.target.value})} />
                        </div>
                        <div>
                          <label className={labelClass}>Source URL</label>
                          <input className={inputClass} placeholder="https://github.com/..." value={newProject.source_url} onChange={(e) => setNewProject({...newProject, source_url: e.target.value})} />
                        </div>
                        <div>
                          <label className={labelClass}>Technologies</label>
                          <input className={inputClass} placeholder="React, Node.js, etc." value={newProject.technologies} onChange={(e) => setNewProject({...newProject, technologies: e.target.value})} />
                        </div>
                        <div>
                          <label className={labelClass}>Image URL</label>
                          <input className={inputClass} placeholder="https://... (or upload)" value={newProject.image_url} onChange={(e) => setNewProject({...newProject, image_url: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Upload Image</label>
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                            <i className="fas fa-image mr-2" />
                            {projectImageFile ? projectImageFile.name : 'Choose File'}
                            <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                          </label>
                          {imagePreview && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                              <button onClick={() => { setProjectImageFile(null); setImagePreview('') }} className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 flex items-center justify-center text-[8px] rounded-full">×</button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Description</label>
                        <textarea className={inputClass} placeholder="Brief project description..." rows="2" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} />
                      </div>
                      <button onClick={addProject} className="px-5 py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-all text-sm">
                        <i className="fas fa-plus mr-2" />Add Project
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {projects.map((project) => (
                  <div key={project.id} className={`${cardClass} p-4 flex gap-4 group hover:border-teal-500/30 transition-colors`}>
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                      {project.image_url ? (
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fas fa-image text-gray-300 dark:text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{project.title}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{project.category}</p>
                        </div>
                        <button onClick={() => deleteProject(project.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex-shrink-0">
                          <i className="fas fa-trash text-xs" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{project.description}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.split(',').slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded">{t.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">Experience ({experience.length})</h3>
                <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2.5 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-all text-sm shadow-lg shadow-teal-500/20">
                  <i className={`fas ${showAddForm ? 'fa-times' : 'fa-plus'} mr-2`} />
                  {showAddForm ? 'Cancel' : 'Add Experience'}
                </button>
              </div>

              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`${cardClass} p-5 space-y-4`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>Title / Role</label>
                          <input className={inputClass} placeholder="e.g. General Member" value={newExperience.title} onChange={(e) => setNewExperience({...newExperience, title: e.target.value})} />
                        </div>
                        <div>
                          <label className={labelClass}>Organization</label>
                          <input className={inputClass} placeholder="e.g. Robotics Club" value={newExperience.organization} onChange={(e) => setNewExperience({...newExperience, organization: e.target.value})} />
                        </div>
                        <div>
                          <label className={labelClass}>Start Date</label>
                          <input className={inputClass} placeholder="e.g. 2024" value={newExperience.start_date} onChange={(e) => setNewExperience({...newExperience, start_date: e.target.value})} />
                        </div>
                        <div>
                          <label className={labelClass}>End Date</label>
                          <input className={inputClass} placeholder="Leave empty for Present" value={newExperience.end_date} onChange={(e) => setNewExperience({...newExperience, end_date: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Description</label>
                        <textarea className={inputClass} placeholder="Brief description..." rows="2" value={newExperience.description} onChange={(e) => setNewExperience({...newExperience, description: e.target.value})} />
                      </div>
                      <button onClick={addExperience} className="px-5 py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-all text-sm">
                        <i className="fas fa-plus mr-2" />Add Experience
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className={`${cardClass} px-5 py-4 flex items-center justify-between group hover:border-teal-500/30 transition-colors`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${exp.color}15` }}>
                        <i className="fas fa-briefcase text-sm" style={{ color: exp.color }} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{exp.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{exp.organization} · {exp.start_date} – {exp.end_date || 'Present'}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteExperience(exp.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <i className="fas fa-trash text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTIONS TAB */}
          {activeTab === 'sections' && (
            <div className={`${cardClass} p-6`}>
              <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-2">Section Visibility</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Control which sections appear on the public portfolio.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sections.map((section) => (
                  <div key={section.id} className={`flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all ${
                    section.visible
                      ? 'bg-teal-50 dark:bg-teal-900/10 border-teal-200 dark:border-teal-800/30'
                      : 'bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        section.visible ? 'bg-teal-100 dark:bg-teal-900/30' : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <i className={`fas fa-${section.visible ? 'eye' : 'eye-slash'} text-xs ${
                          section.visible ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white capitalize">{section.label}</p>
                    </div>
                    <button
                      onClick={() => toggleSection(section)}
                      className={`relative w-11 h-6 rounded-full transition-all ${
                        section.visible ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                        section.visible ? 'left-[22px]' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  )
}
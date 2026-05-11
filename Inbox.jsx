import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function AdminInbox() {
  const { getAuthHeaders } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/messages`, getAuthHeaders())
      setMessages(res.data)
    } catch (err) {
      console.error('Failed to fetch messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      await axios.put(`${API_URL}/admin/messages/${id}/read`, {}, getAuthHeaders())
      setMessages(messages.map(m => m.id === id ? { ...m, read: 1 } : m))
    } catch (err) {
      console.error('Failed to mark as read:', err)
    }
  }

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${API_URL}/admin/messages/${id}`, getAuthHeaders())
      setMessages(messages.filter(m => m.id !== id))
      if (selectedMessage?.id === id) setSelectedMessage(null)
    } catch (err) {
      console.error('Failed to delete message:', err)
    }
  }

  const openMessage = (msg) => {
    setSelectedMessage(msg)
    if (!msg.read) markAsRead(msg.id)
  }

  const unreadCount = messages.filter(m => !m.read).length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0f]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f]">
      <header className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="text-gray-500 hover:text-brand-500 transition-colors">
              <i className="fas fa-arrow-left mr-2" />Back
            </Link>
            <h1 className="font-display text-xl font-bold text-gray-900 dark:text-white">
              Inbox
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-medium rounded-full">
                  {unreadCount}
                </span>
              )}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {messages.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-inbox text-5xl text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Message List */}
            <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => openMessage(msg)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedMessage?.id === msg.id
                      ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800/30'
                      : msg.read
                        ? 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10'
                        : 'bg-white dark:bg-white/5 border-brand-200 dark:border-brand-800/30 hover:bg-brand-50/50 dark:hover:bg-brand-900/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className={`text-sm font-medium ${!msg.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                      {!msg.read && <span className="inline-block w-2 h-2 bg-brand-500 rounded-full mr-2" />}
                      {msg.name}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id) }}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <i className="fas fa-times text-xs" />
                    </button>
                  </div>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 truncate">{msg.subject}</p>
                  <p className="text-xs text-gray-400 truncate">{msg.message}</p>
                  <p className="text-[10px] text-gray-400 mt-2">
                    {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-3">
              {selectedMessage ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 lg:p-8"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-1">
                        {selectedMessage.subject}
                      </h3>
                      <p className="text-sm text-gray-500">
                        From: <span className="font-medium text-gray-700 dark:text-gray-300">{selectedMessage.name}</span>
                        {' '}&lt;{selectedMessage.email}&gt;
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(selectedMessage.created_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-500 border border-red-200 dark:border-red-800/30 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                      <i className="fas fa-trash mr-1" />Delete
                    </button>
                  </div>
                  <div className="border-t border-gray-200 dark:border-white/10 pt-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/25"
                    >
                      <i className="fas fa-reply" />Reply via Email
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-12 text-center">
                  <i className="fas fa-envelope-open text-4xl text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Select a message to read</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
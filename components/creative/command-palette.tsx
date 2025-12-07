"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Command, Search, Zap, GraduationCap, Brain, Shield, ArrowRight, Sparkles } from "lucide-react"

interface Site {
  id: string
  name: string
  url: string
  icon: React.ReactNode
  description: string
  gradient: string
  shortcuts: string[]
}

const sites: Site[] = [
  {
    id: "consulting",
    name: "CS-Learning.me",
    url: "https://cs-learning.me",
    icon: <Zap className="w-5 h-5" />,
    description: "AI Automation & Consulting",
    gradient: "from-teal-400 to-cyan-400",
    shortcuts: ["Work With Me", "Case Studies", "Projects"],
  },
  {
    id: "learning",
    name: "High Encode Learning",
    url: "https://highencodelearning.com",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "CS & Cybersecurity Education",
    gradient: "from-blue-400 to-indigo-400",
    shortcuts: ["Programs", "Apply", "Resources"],
  },
  {
    id: "csbrain",
    name: "CSBrainAI",
    url: "https://csbrain.ai",
    icon: <Brain className="w-5 h-5" />,
    description: "AI Learning Assistant",
    gradient: "from-purple-400 to-pink-400",
    shortcuts: ["Start Chat", "Documentation"],
  },
  {
    id: "defenders",
    name: "Prompt Defenders",
    url: "https://prompt-defenders.com",
    icon: <Shield className="w-5 h-5" />,
    description: "AI Security Testing",
    gradient: "from-orange-400 to-red-400",
    shortcuts: ["Try Demo", "Leaderboard"],
  },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % sites.length)
        }
        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + sites.length) % sites.length)
        }
        if (e.key === "Enter") {
          window.open(sites[selectedIndex].url, "_blank")
          setIsOpen(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex])

  const filteredSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.description.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 glass rounded-2xl px-4 py-3 flex items-center gap-3 group hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center">
          <Command className="w-4 h-4 text-black" />
        </div>
        <span className="text-white/80 text-sm font-medium hidden sm:block">Navigate Ecosystem</span>
        <kbd className="hidden sm:flex items-center gap-1 text-xs text-white/40 bg-white/5 px-2 py-1 rounded-lg">
          <Command className="w-3 h-3" />K
        </kbd>
      </motion.button>

      {/* Command palette modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                {/* Search header */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-white/10">
                  <Search className="w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search ecosystem..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none text-lg"
                    autoFocus
                  />
                  <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
                </div>

                {/* Sites list */}
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                  <p className="text-xs text-white/30 uppercase tracking-wider px-3 mb-3">Properties</p>

                  <div className="space-y-2">
                    {filteredSites.map((site, index) => (
                      <motion.a
                        key={site.id}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-4 rounded-2xl transition-all ${
                          selectedIndex === index ? "bg-white/10 ring-1 ring-white/20" : "hover:bg-white/5"
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${site.gradient} flex items-center justify-center text-black`}
                          >
                            {site.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-white font-semibold">{site.name}</h3>
                              <ArrowRight className="w-4 h-4 text-white/30" />
                            </div>
                            <p className="text-white/50 text-sm">{site.description}</p>
                          </div>
                          <div className="hidden sm:flex gap-2">
                            {site.shortcuts.slice(0, 2).map((shortcut) => (
                              <span key={shortcut} className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-lg">
                                {shortcut}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-white/30">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="bg-white/10 px-1.5 py-0.5 rounded">↑</kbd>
                      <kbd className="bg-white/10 px-1.5 py-0.5 rounded">↓</kbd>
                      navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="bg-white/10 px-1.5 py-0.5 rounded">↵</kbd>
                      open
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white/10 px-1.5 py-0.5 rounded">esc</kbd>
                    close
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

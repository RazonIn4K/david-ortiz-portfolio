"use client"

import { motion } from "framer-motion"
import { BookOpen, Code, Shield, Rocket, Trophy } from "lucide-react"

const milestones = [
  { id: 1, icon: BookOpen, label: "Foundations", desc: "CS fundamentals", complete: true },
  { id: 2, icon: Code, label: "Build", desc: "Real projects", complete: true },
  { id: 3, icon: Shield, label: "Secure", desc: "Security mindset", complete: false, current: true },
  { id: 4, icon: Rocket, label: "Deploy", desc: "Ship to prod", complete: false },
  { id: 5, icon: Trophy, label: "Master", desc: "Lead teams", complete: false },
]

export function LearningPath() {
  return (
    <div className="relative py-12">
      {/* Path line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/40 to-purple-500/20 -translate-y-1/2 rounded-full" />

      {/* Progress overlay */}
      <motion.div
        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 -translate-y-1/2 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: "45%" }}
        transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
      />

      {/* Milestones */}
      <div className="relative flex justify-between items-center">
        {milestones.map((m, i) => (
          <motion.div
            key={m.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
          >
            <motion.div
              className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                m.complete
                  ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
                  : m.current
                    ? "bg-gradient-to-br from-indigo-500/50 to-purple-500/50 text-white ring-2 ring-indigo-400 ring-offset-2 ring-offset-[#0a0e1a]"
                    : "glass text-white/40"
              }`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <m.icon className="w-7 h-7" />
              {m.current && (
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-indigo-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
              {m.complete && (
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                >
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
            <div className="mt-4 text-center">
              <p className={`font-semibold text-sm ${m.complete || m.current ? "text-white" : "text-white/40"}`}>
                {m.label}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

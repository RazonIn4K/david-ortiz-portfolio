"use client"

import { motion } from "framer-motion"
import { Bot, Database, Workflow, FileText, Shield } from "lucide-react"

const orbitItems = [
  { icon: FileText, label: "Typeform", color: "#2dd4bf", orbit: 1, delay: 0 },
  { icon: Workflow, label: "Zapier", color: "#ff6b6b", orbit: 1, delay: 1.5 },
  { icon: Database, label: "Notion", color: "#a78bfa", orbit: 2, delay: 0.5 },
  { icon: Bot, label: "GPT-4o", color: "#22d3ee", orbit: 2, delay: 2 },
  { icon: Shield, label: "Security", color: "#feca57", orbit: 2, delay: 3 },
]

export function OrbitVisualization() {
  return (
    <div className="relative w-full max-w-lg aspect-square mx-auto">
      {/* Center node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center shadow-lg glow-teal"
        >
          <span className="text-2xl font-bold text-[#060a14]">AI</span>
        </motion.div>
      </div>

      {/* Orbit rings */}
      {[1, 2].map((ring) => (
        <div
          key={ring}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{
            width: `${ring * 35 + 20}%`,
            height: `${ring * 35 + 20}%`,
          }}
        />
      ))}

      {/* Orbiting items */}
      {orbitItems.map((item, i) => {
        const radius = item.orbit * 35 + 20
        const duration = 15 + item.orbit * 5

        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            animate={{ rotate: 360 }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: item.delay,
            }}
            style={{
              width: `${radius}%`,
              height: `${radius}%`,
              marginLeft: `-${radius / 2}%`,
              marginTop: `-${radius / 2}%`,
            }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: -360 }}
              transition={{
                duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: item.delay,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl glass flex items-center justify-center border-2 group cursor-pointer hover:scale-110 transition-transform"
                style={{ borderColor: item.color }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap"
                style={{ color: item.color }}
              >
                {item.label}
              </motion.div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

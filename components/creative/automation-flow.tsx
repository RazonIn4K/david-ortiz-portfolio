"use client"

import { motion } from "framer-motion"
import { FileText, Workflow, Database, Bot, CheckCircle2 } from "lucide-react"

const nodes = [
  { id: 1, icon: FileText, label: "Typeform", x: 0, y: 50, color: "#2dd4bf" },
  { id: 2, icon: Workflow, label: "Zapier", x: 25, y: 20, color: "#22d3ee" },
  { id: 3, icon: Database, label: "Notion", x: 50, y: 60, color: "#a78bfa" },
  { id: 4, icon: Bot, label: "GPT-4o", x: 75, y: 30, color: "#f87171" },
  { id: 5, icon: CheckCircle2, label: "Automated", x: 100, y: 50, color: "#2dd4bf" },
]

const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
]

export function AutomationFlow() {
  return (
    <div className="relative w-full max-w-2xl aspect-[2/1] mx-auto">
      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {connections.map((conn, i) => {
          const from = nodes.find((n) => n.id === conn.from)!
          const to = nodes.find((n) => n.id === conn.to)!
          const x1 = (from.x / 100) * 400
          const y1 = (from.y / 100) * 200
          const x2 = (to.x / 100) * 400
          const y2 = (to.y / 100) * 200
          const midX = (x1 + x2) / 2
          const midY = (y1 + y2) / 2 - 30

          return (
            <g key={i}>
              <motion.path
                d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                fill="none"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: i * 0.3, duration: 1, ease: "easeOut" }}
              />
              {/* Animated data particle */}
              <motion.circle
                r="4"
                fill="#22d3ee"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  offsetDistance: ["0%", "100%"],
                }}
                transition={{
                  delay: 1 + i * 0.5,
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
                style={{
                  offsetPath: `path("M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}")`,
                }}
              />
            </g>
          )
        })}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity"
              style={{ backgroundColor: node.color, transform: "scale(1.5)" }}
            />
            {/* Node */}
            <div
              className="relative w-14 h-14 rounded-2xl glass flex items-center justify-center border-2"
              style={{ borderColor: node.color }}
            >
              <node.icon className="w-6 h-6" style={{ color: node.color }} />
            </div>
            {/* Label */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <span className="text-xs font-medium text-white/70">{node.label}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Live indicator */}
      <motion.div
        className="absolute top-2 right-2 flex items-center gap-2 glass px-3 py-1.5 rounded-full"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
        </span>
        <span className="text-xs text-white/60">Live</span>
      </motion.div>
    </div>
  )
}

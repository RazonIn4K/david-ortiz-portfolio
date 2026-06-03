"use client"

import { motion } from "framer-motion"
import { ExternalLink, Sparkles, Briefcase, Shield, Brain, NotebookPen } from "lucide-react"

const ecosystemItems = [
  {
    name: "cs-learning.me",
    description: "Personal notes, experiments, and learning-in-public",
    icon: NotebookPen,
    url: "https://cs-learning.me",
    gradient: "from-teal-500 to-cyan-600",
    features: ["Personal Voice", "Build Logs", "Abstraction Notes"],
  },
  {
    name: "High Encode Learning",
    description: "Business-facing demos, scoping, and implementation notes",
    icon: Briefcase,
    url: "https://highencodelearning.com",
    gradient: "from-blue-500 to-indigo-600",
    features: ["Services", "Demos", "Scoped work"],
  },
  {
    name: "CSBrainAI",
    description: "Retrieval and explanation experiments",
    icon: Brain,
    url: "https://csbrain.ai",
    gradient: "from-purple-500 to-pink-500",
    features: ["Grounded answers", "Knowledge interfaces", "Explanation quality"],
  },
  {
    name: "Prompt Defenders",
    description: "AI Security Testing",
    icon: Shield,
    url: "https://prompt-defenders.com",
    gradient: "from-orange-500 to-red-500",
    features: ["Prompt injection", "Safety tests", "LLM behavior"],
  },
]

export function EcosystemLinks() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {ecosystemItems.map((item, i) => (
        <motion.a
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -8 }}
          className="group relative"
        >
          <div className="glass rounded-2xl p-6 h-full border border-white/5 group-hover:border-white/20 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
            <p className="text-white/50 text-sm mb-4">{item.description}</p>

            {/* Features */}
            <div className="space-y-2">
              {item.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-xs text-white/40">
                  <Sparkles className="w-3 h-3 text-[#2dd4bf]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Hover glow */}
          <div
            className={`absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity blur-2xl bg-gradient-to-br ${item.gradient}`}
          />
        </motion.a>
      ))}
    </div>
  )
}

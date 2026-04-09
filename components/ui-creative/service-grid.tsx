"use client"

import { motion } from "framer-motion"
import { HolographicCard } from "./holographic-card"
import { ArrowRight } from "lucide-react"

const services = [
  {
    icon: "⚡",
    title: "Automation behavior",
    description:
      "Studying how workflows behave in practice with n8n, MCP integrations, orchestration boundaries, and cleanup passes.",
    tags: ["MCP flows", "n8n", "Operator guardrails"],
    color: "#2dd4bf",
    gradient: "from-[#2dd4bf] to-[#22d3ee]",
  },
  {
    icon: "🤖",
    title: "Retrieval quality",
    description:
      "Experiments in grounded retrieval, explanation quality, and how context changes what an AI system can actually answer.",
    tags: ["RAG patterns", "Grounding", "Answer quality"],
    color: "#22d3ee",
    gradient: "from-[#22d3ee] to-[#a78bfa]",
  },
  {
    icon: "🛡️",
    title: "Prompt safety",
    description:
      "Notes and experiments around prompt injection, misuse resistance, and the guardrails that keep AI workflows from getting sloppy.",
    tags: ["Prompt injection", "Red-team notes", "Safer delivery"],
    color: "#a78bfa",
    gradient: "from-[#a78bfa] to-[#ff6b6b]",
  },
  {
    icon: "🎬",
    title: "Delivery systems",
    description:
      "Thinking through how demos, sites, media assets, deployment, and domain boundaries connect the personal site to the business site.",
    tags: ["Sites", "Domains", "Operations"],
    color: "#ff6b6b",
    gradient: "from-[#ff6b6b] to-[#feca57]",
  },
]

export function ServiceGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {services.map((service, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <HolographicCard accentColor={service.color}>
            <div className="space-y-4">
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-2xl`}
              >
                {service.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${service.color}15`,
                      color: service.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="flex items-center gap-2 text-sm font-medium group" style={{ color: service.color }}>
                Current thread
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </HolographicCard>
        </motion.div>
      ))}
    </div>
  )
}

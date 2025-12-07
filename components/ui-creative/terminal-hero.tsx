"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const codeLines = [
  { text: "// Initializing AI Automation Pipeline...", color: "#6b7280" },
  { text: "import { typeform, zapier, notion, gpt4 } from '@automation';", color: "#22d3ee" },
  { text: "", color: "" },
  { text: "const pipeline = await createPipeline({", color: "#f8f8f2" },
  { text: "  source: typeform.onSubmit('lead-capture'),", color: "#a78bfa" },
  { text: "  enrich: gpt4.analyze({ context: 'lead-scoring' }),", color: "#a78bfa" },
  { text: "  destination: notion.addToDatabase('Leads'),", color: "#a78bfa" },
  { text: "  notify: slack.send('#sales-team')", color: "#a78bfa" },
  { text: "});", color: "#f8f8f2" },
  { text: "", color: "" },
  { text: "// 🚀 Pipeline active — saving 12hrs/week", color: "#2dd4bf" },
]

export function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(lineTimer)
          return prev
        }
        return prev + 1
      })
    }, 150)

    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => {
      clearInterval(lineTimer)
      clearInterval(cursorTimer)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative w-full max-w-2xl"
    >
      {/* Terminal window */}
      <div className="code-block overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2dd4bf]/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff6b6b]" />
            <div className="w-3 h-3 rounded-full bg-[#feca57]" />
            <div className="w-3 h-3 rounded-full bg-[#2dd4bf]" />
          </div>
          <span className="text-xs text-white/30 ml-2 terminal-text">automation.ts</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2dd4bf]" />
            </span>
            <span className="text-xs text-[#2dd4bf]">Live</span>
          </div>
        </div>

        {/* Code content */}
        <div className="p-4 terminal-text text-sm leading-relaxed min-h-[280px]">
          {codeLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <span className="w-8 text-white/20 select-none">{i + 1}</span>
              <span style={{ color: line.color }}>{line.text}</span>
            </motion.div>
          ))}

          {/* Cursor */}
          {visibleLines >= codeLines.length && (
            <div className="flex">
              <span className="w-8 text-white/20 select-none">{codeLines.length + 1}</span>
              <span
                className={`w-2 h-5 bg-[#2dd4bf] ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                style={{ transition: "opacity 0.1s" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#2dd4bf]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#a78bfa]/10 rounded-full blur-3xl" />
    </motion.div>
  )
}

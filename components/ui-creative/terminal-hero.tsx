"use client"

import { motion } from "framer-motion"

export function TerminalHero() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-navy-dark shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <div className="ml-2 text-xs text-white/30 font-mono">david@ecosystem:~/automations</div>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed text-white/80">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-teal-400">$</span> init ecosystem --mode=unified
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-2"
        >
          <span className="text-white/50">{'>'} Loading modules...</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-1"
        >
           <span className="text-green-400">✔</span> CS Learning loaded<br/>
           <span className="text-green-400">✔</span> High Encode Learning loaded<br/>
           <span className="text-green-400">✔</span> CSBrainAI connected
        </motion.div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-4 animate-pulse"
        >
            <span className="text-teal-400">$</span> _
        </motion.div>
      </div>
    </div>
  )
}

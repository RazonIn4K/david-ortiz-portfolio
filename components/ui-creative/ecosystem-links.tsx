"use client"

import Link from "next/link"

export function EcosystemLinks() {
  const links = [
    { title: "High Encode Learning", desc: "CS & Cybersecurity Education", href: "https://highencodelearning.com" },
    { title: "CSBrainAI", desc: "AI Learning Assistant", href: "https://csbrain.ai" },
    { title: "Prompt Defenders", desc: "Secure Prompt Engineering", href: "https://prompt-defenders.com" },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {links.map((link) => (
        <a
          key={link.title}
          href={link.href}
          className="group block p-6 rounded-2xl glass border border-white/10 hover:border-teal-500/50 transition relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-teal-400 transition">{link.title}</h3>
          <p className="text-white/50 text-sm">{link.desc}</p>
        </a>
      ))}
    </div>
  )
}

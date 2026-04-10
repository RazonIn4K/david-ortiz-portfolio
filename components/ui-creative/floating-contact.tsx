"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarDays, BriefcaseBusiness, ExternalLink, Mail, MessageCircle } from "lucide-react"

import { floatingContactLinks, type ContactLink } from "@/lib/contact-links"

function iconFor(link: ContactLink) {
  switch (link.id) {
    case "email":
      return Mail
    case "calendly":
      return CalendarDays
    case "upwork":
      return BriefcaseBusiness
    default:
      return ExternalLink
  }
}

function isExternal(href: string) {
  return href.startsWith("http")
}

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="mb-3 w-[18rem] rounded-3xl border border-white/10 bg-[#08101e]/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#2dd4bf]">Contact</p>
                <h3 className="mt-1 text-sm font-semibold text-white">Talk to David directly</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/50">
                  Quick paths for follow-up, scheduling, and business conversations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/60 transition-colors hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              {floatingContactLinks.map(link => {
                const Icon = iconFor(link)

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target={isExternal(link.href) ? "_blank" : undefined}
                    rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] text-[#060a14]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-white">{link.label}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-white/55">{link.description}</span>
                    </span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="group flex items-center gap-3 rounded-full border border-white/10 bg-[#0c1424]/90 px-5 py-3 shadow-xl backdrop-blur-xl transition-colors hover:border-white/20"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Open contact menu"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ff8e8e] text-white shadow-lg shadow-[#ff6b6b]/20">
          <MessageCircle className="h-5 w-5" />
        </span>
        <span className="hidden sm:block text-left">
          <span className="block text-sm font-semibold text-white">Contact</span>
          <span className="block text-xs text-white/45">Email, book, hire</span>
        </span>
      </motion.button>
    </div>
  )
}

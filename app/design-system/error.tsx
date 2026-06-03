"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function DesignSystemError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Design system error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060a14] px-4">
      <div className="glass rounded-2xl p-8 max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#a78bfa]/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[#a78bfa]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          Design System Error
        </h1>

        <p className="text-white/60 mb-6">
          Failed to load the design system components. This may be a temporary issue.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-[#a78bfa] to-[#818cf8] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#a78bfa] focus:ring-offset-2 focus:ring-offset-[#060a14]"
          >
            Try again
          </button>

          <Link
            href="/"
            className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#060a14]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

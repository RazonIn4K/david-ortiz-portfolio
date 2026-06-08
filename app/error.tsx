"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060a14] px-4">
      <div className="glass rounded-2xl p-8 max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#ff6b6b]/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[#ff6b6b]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          Something went wrong
        </h1>

        <p className="text-white/60 mb-6">
          We encountered an unexpected error. Don&apos;t worry, your data is safe.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-[#2dd4bf] to-[#22d3ee] text-[#060a14] font-semibold rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:ring-offset-2 focus:ring-offset-[#060a14]"
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

        {process.env.NODE_ENV === "development" && error.message && (
          <details className="mt-6 text-left">
            <summary className="text-white/75 text-sm cursor-pointer hover:text-white/60">
              Error details (dev only)
            </summary>
            <pre className="mt-2 p-3 bg-black/30 rounded-lg text-xs text-[#ff6b6b] overflow-auto max-h-32">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

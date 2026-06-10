"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ThemeShell } from "@/components/theme-shell"

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
    <ThemeShell>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className="rounded-3xl border p-8 max-w-md text-center"
          style={{
            borderColor: "var(--dtz-border)",
            background: "var(--dtz-panel)",
            boxShadow: "var(--dtz-shadow)",
          }}
        >
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: "var(--dtz-accent-soft)" }}
          >
            <svg
              className="w-8 h-8"
              style={{ color: "var(--dtz-accent-2)" }}
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

          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>

          <p className="mb-6" style={{ color: "var(--dtz-muted)" }}>
            We encountered an unexpected error. Don&apos;t worry, your data is safe.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 font-semibold rounded-xl transition-opacity hover:opacity-90"
              style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }}
            >
              Try again
            </button>

            <Link
              href="/"
              className="px-6 py-3 border font-semibold rounded-xl transition-colors"
              style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
            >
              Go home
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && error.message && (
            <details className="mt-6 text-left">
              <summary className="text-sm cursor-pointer" style={{ color: "var(--dtz-muted)" }}>
                Error details (dev only)
              </summary>
              <pre
                className="mt-2 p-3 rounded-lg text-xs overflow-auto max-h-32"
                style={{ background: "var(--dtz-panel-2)", color: "var(--dtz-accent-2)" }}
              >
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </ThemeShell>
  )
}

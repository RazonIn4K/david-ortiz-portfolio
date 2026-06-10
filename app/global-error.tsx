"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#ddebe6" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              background: "#f4fbf7",
              backdropFilter: "blur(20px)",
              borderRadius: "1rem",
              padding: "2rem",
              maxWidth: "28rem",
              textAlign: "center",
              border: "1px solid #6f8f88",
            }}
          >
            <div
              style={{
                width: "4rem",
                height: "4rem",
                margin: "0 auto 1.5rem",
                borderRadius: "50%",
                background: "#cceee6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="#9b352d"
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

            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#061513",
                marginBottom: "0.5rem",
              }}
            >
              Application Error
            </h1>

            <p
              style={{
                color: "#243c38",
                marginBottom: "1.5rem",
                lineHeight: 1.5,
              }}
            >
              Something went wrong with the application. Please try refreshing the page.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={reset}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#00585d",
                  color: "#ffffff",
                  fontWeight: 600,
                  borderRadius: "0.75rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Try again
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "transparent",
                  color: "#243c38",
                  fontWeight: 600,
                  borderRadius: "0.75rem",
                  border: "1px solid #6f8f88",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

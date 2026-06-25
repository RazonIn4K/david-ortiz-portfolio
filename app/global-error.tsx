"use client"

import { useEffect } from "react"

const themeVariables = `
  :root {
    --bg: #f4efe6;
    --panel: #fbf7f0;
    --border: #d8cbb8;
    --accent-soft: #efe2d0;
    --accent-2: #c2872f;
    --fg: #1c1714;
    --muted: #4a423b;
    --accent: #9b352d;
    --on-accent: #ffffff;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #16110d;
      --panel: #221a14;
      --border: #4a3f34;
      --accent-soft: #3a241d;
      --accent-2: #e0a955;
      --fg: #f4efe6;
      --muted: #c9bdae;
      --accent: #e0795f;
      --on-accent: #1c1714;
    }
  }
`

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
      <head>
        <style>{themeVariables}</style>
      </head>
      <body style={{ margin: 0, backgroundColor: "var(--bg)" }}>
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
              background: "var(--panel)",
              backdropFilter: "blur(20px)",
              borderRadius: "1rem",
              padding: "2rem",
              maxWidth: "28rem",
              textAlign: "center",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: "4rem",
                height: "4rem",
                margin: "0 auto 1.5rem",
                borderRadius: "50%",
                background: "var(--accent-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="var(--accent-2)"
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
                color: "var(--fg)",
                marginBottom: "0.5rem",
              }}
            >
              Application Error
            </h1>

            <p
              style={{
                color: "var(--muted)",
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
                  background: "var(--accent)",
                  color: "var(--on-accent)",
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
                  color: "var(--muted)",
                  fontWeight: 600,
                  borderRadius: "0.75rem",
                  border: "1px solid var(--border)",
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

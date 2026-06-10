import Link from "next/link"
import { ThemeShell } from "@/components/theme-shell"

export default function NotFound() {
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
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: "var(--dtz-accent-soft)" }}
          >
            <span className="text-4xl font-bold" style={{ color: "var(--dtz-accent)" }}>
              404
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-2">Page not found</h1>

          <p className="mb-6" style={{ color: "var(--dtz-muted)" }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 font-semibold rounded-xl transition-opacity hover:opacity-90"
              style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }}
            >
              Go home
            </Link>

            <Link
              href="/#notes"
              className="px-6 py-3 border font-semibold rounded-xl transition-colors"
              style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
            >
              Current focus
            </Link>
          </div>

          <p className="mt-8 text-sm" style={{ color: "var(--dtz-muted)" }}>
            Looking for something specific?{" "}
            <Link href="/#contact" className="hover:underline" style={{ color: "var(--dtz-accent)" }}>
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </ThemeShell>
  )
}

import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

const mutedText = { color: "var(--dtz-muted)" } as const

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 mb-3 text-2xl font-bold" style={{ color: "var(--dtz-text)" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-7 mb-2 text-lg font-semibold" style={{ color: "var(--dtz-text)" }}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-relaxed" style={mutedText}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-6" style={mutedText}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6" style={mutedText}>
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2"
      style={{ color: "var(--dtz-accent)" }}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong style={{ color: "var(--dtz-text)" }}>{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="my-5 rounded-2xl border-l-4 px-5 py-3 text-sm"
      style={{
        borderColor: "var(--dtz-accent)",
        background: "var(--dtz-accent-soft)",
        color: "var(--dtz-muted)",
      }}
    >
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre
      className="my-5 overflow-x-auto rounded-2xl border p-4 text-sm leading-relaxed"
      style={{
        borderColor: "var(--dtz-border)",
        background: "var(--dtz-panel-2)",
        fontFamily: "var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
      }}
    >
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const text = String(children ?? "")
    const isBlock = (className?.includes("language-") ?? false) || text.includes("\n")
    if (isBlock) {
      return <code className={className}>{children}</code>
    }
    return (
      <code
        style={{
          fontFamily: "var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
          background: "var(--dtz-panel-2)",
          padding: "0.1rem 0.35rem",
          borderRadius: "0.3rem",
          fontSize: "0.9em",
        }}
      >
        {children}
      </code>
    )
  },
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse text-sm" style={mutedText}>
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th
      className="border px-3 py-2 text-left font-semibold"
      style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-text)" }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border px-3 py-2 align-top" style={{ borderColor: "var(--dtz-border)" }}>
      {children}
    </td>
  ),
}

export function WriteupContent({ content }: { content: string }) {
  return (
    <div className="text-base">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

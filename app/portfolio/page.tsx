import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";

import { businessSiteUrl } from "@/lib/site-config";
import { contact } from "@/data/content";
import { ThemeShell } from "@/components/theme-shell";

export const metadata: Metadata = {
  title: "Portfolio | David Ortiz",
  description:
    "Proof index for David Ortiz: Gray Swan Arena prompt-injection results, NCL Fall 2025 ranking, PromptDefenders, CTF writeups, RayBridge, and a shipped client site.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio | David Ortiz",
    description:
      "Proof index for David Ortiz: Gray Swan Arena prompt-injection results, NCL Fall 2025 ranking, PromptDefenders, CTF writeups, RayBridge, and a shipped client site.",
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Portfolio | David Ortiz",
    description:
      "Proof index for David Ortiz: Gray Swan Arena prompt-injection results, NCL Fall 2025 ranking, PromptDefenders, CTF writeups, RayBridge, and a shipped client site.",
  },
};

type ProofEntry = {
  category: string;
  title: string;
  result: string;
  links: { href: string; label: string; external?: boolean }[];
};

const proofEntries: ProofEntry[] = [
  {
    category: "AI security",
    title: "Gray Swan Arena: frontier-model breaks",
    result:
      "42 unique breaks across authorized arenas, including 21 in the Indirect Prompt Injection Q2 2026 wave (76th of 232) and waves for agent red-teaming, safeguards, and machine-in-the-middle. Winner's Circle member. Independent research, not client pentests.",
    links: [
      {
        href: "https://app.grayswan.ai/arena/user/67d3110be637c128d0cca612",
        label: "Public arena profile",
        external: true,
      },
    ],
  },
  {
    category: "CTF",
    title: "National Cyber League, Fall 2025",
    result:
      "24th of 620 overall in the Experienced bracket, 97th percentile. 1st of 620 in Log Analysis, 3rd in Network Traffic Analysis, 7th in Web Application Exploitation.",
    links: [
      {
        href: "https://cyberskyline.com/report/BC2QQYBBP3L3",
        label: "Official score report",
        external: true,
      },
    ],
  },
  {
    category: "Product",
    title: "PromptDefenders",
    result:
      "A live prompt-injection scanner that scores text against a versioned rule pack: instruction override, data exfiltration, and tool misuse, flagged before a model sees them.",
    links: [
      { href: "https://prompt-defenders.vercel.app", label: "Run the scanner", external: true },
      { href: "https://github.com/RazonIn4K/prompt-defenders", label: "Source", external: true },
    ],
  },
  {
    category: "Writeups",
    title: "CTF technique writeups",
    result:
      "7 dated writeups across log analysis, forensics, binary exploitation, and web, with flags and live details redacted.",
    links: [{ href: "/writeups", label: "Read the writeups" }],
  },
  {
    category: "Open source",
    title: "RayBridge",
    result: "An MCP server that bridges Raycast extensions to any MCP-compatible client.",
    links: [
      { href: "https://github.com/RazonIn4K/raybridge", label: "Repository", external: true },
      { href: contact.github, label: "All repos", external: true },
    ],
  },
  {
    category: "Client build",
    title: "Hernandez Landscape",
    result:
      "A bilingual services site for a real landscaping business: quote flow, gallery, and local SEO. Live and owner-run. Similar web work scopes through highencodelearning.com.",
    links: [
      { href: "https://hernandezlandscapeservices.com", label: "Live site", external: true },
      { href: `${businessSiteUrl}/contact`, label: "Scope a build", external: true },
    ],
  },
];

const panelStyle = {
  borderColor: "var(--dtz-border)",
  background: "var(--dtz-panel)",
} as const;
const mutedText = { color: "var(--dtz-muted)" } as const;
const primaryCtaStyle = {
  background: "var(--dtz-accent)",
  color: "var(--dtz-on-accent)",
} as const;

export default function PortfolioPage() {
  return (
    <ThemeShell>
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <nav className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
              style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={primaryCtaStyle}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact David
            </a>
          </nav>

          <header className="max-w-3xl py-14">
            <p className="dtz-section-label">Portfolio</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Proof index
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={mutedText}>
              Security results, live products, and shipped builds. Every entry
              links to its source.
            </p>
          </header>

          <section className="grid gap-4 pb-16 md:grid-cols-2" aria-label="Proof entries">
            {proofEntries.map((entry) => (
              <article key={entry.title} className="rounded-3xl border p-6" style={panelStyle}>
                <p className="dtz-section-label">{entry.category}</p>
                <h2 className="mt-3 text-xl font-semibold">{entry.title}</h2>
                <p className="mt-3 text-sm leading-relaxed" style={mutedText}>
                  {entry.result}
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  {entry.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: "var(--dtz-accent)" }}
                      >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: "var(--dtz-accent)" }}
                      >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ),
                  )}
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </ThemeShell>
  );
}

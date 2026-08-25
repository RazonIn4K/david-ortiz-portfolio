export type HomeLink = {
  label: string
  href: string
}

export type HomeEvidence = HomeLink & {
  status: "Checked-in record" | "Published" | "Implemented"
  note: string
}

export type HomeProofRecord = {
  id: string
  sequence: string
  eyebrow: string
  title: string
  problem: string
  role: string
  decision: string
  tradeoff: string
  evidence: HomeEvidence
  tags: string[]
}

export const homeNavigation: HomeLink[] = [
  { label: "Work", href: "#work" },
  { label: "How I work", href: "#process" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
]

export const homePrimaryActions: HomeLink[] = [
  { label: "View selected work", href: "#work" },
  { label: "Read operating notes", href: "#notes" },
]

export const homeProofRecords: HomeProofRecord[] = [
  {
    id: "hernandez-landscape",
    sequence: "01",
    eyebrow: "Web delivery",
    title: "A bilingual quote path for Hernandez Landscape",
    problem:
      "The public surface needed to explain landscaping services in English and Spanish, show real project work, and carry an estimate into the quote form.",
    role:
      "I structured the bilingual paths, trust surface, estimator-to-form handoff, and the portfolio record around the build.",
    decision:
      "Keep one visible customer path from service context to estimate request instead of scattering several competing calls to action.",
    tradeoff:
      "The narrower path carries less campaign copy, but it makes the customer task and owner handoff easier to inspect.",
    evidence: {
      label: "Open the portfolio record",
      href: "/portfolio",
      status: "Checked-in record",
      note: "David's recorded account and three local assets are stored in this repository.",
    },
    tags: ["Bilingual web", "Quote flow", "Handoff"],
  },
  {
    id: "security-writeups",
    sequence: "02",
    eyebrow: "Security practice",
    title: "Seven technique-focused CTF writeups",
    problem:
      "A solved challenge is hard to learn from when the method disappears behind a flag or a single screenshot.",
    role:
      "I reconstructed the paths from binaries, logs, and challenge artifacts, then wrote the reasoning step by step with flags redacted.",
    decision: "Publish the technique, boundary, and reasoning instead of secret values.",
    tradeoff:
      "Redaction limits exact replay of the final secret, but keeps the writeups useful and safer to share.",
    evidence: {
      label: "Read the writeups",
      href: "/writeups",
      status: "Published",
      note: "Seven local writeups cover exploitation, escalation, cryptography, and forensics.",
    },
    tags: ["Exploit analysis", "Forensics", "Redacted proof"],
  },
  {
    id: "screened-contact",
    sequence: "03",
    eyebrow: "Operational guardrail",
    title: "A screened WhatsApp route for personal contact",
    problem:
      "A public personal contact path needs to stay usable without exposing a bare phone number to simple scraping, replay, and burst traffic.",
    role:
      "I built the short-lived cookie and token challenge, replay blocking, light abuse scoring, and an optional shared-state path.",
    decision:
      "Require a challenge before the redirect while keeping email and GitHub available as direct alternatives.",
    tradeoff:
      "Without shared Redis, replay and burst state is per instance, so the route does not claim stronger enforcement than it has.",
    evidence: {
      label: "Inspect the contact path",
      href: "/contact",
      status: "Implemented",
      note: "The guarded route and its characterization tests live in this repository.",
    },
    tags: ["Abuse guard", "Replay control", "Direct contact"],
  },
]

export type HomeLink = {
  label: string
  href: string
}

export type HomeEvidence = HomeLink & {
  status: "Checked-in record" | "Published" | "Implemented"
  note: string
}

export type HomeProofVisual = {
  src: string
  alt: string
  label: string
  browserPath: string
  width: number
  height: number
}

export type HomeProofRecord = {
  id: string
  sequence: string
  eyebrow: string
  year: string
  title: string
  summary: string
  problem: string
  role: string
  decision: string
  tradeoff: string
  evidence: HomeEvidence
  visual: HomeProofVisual
  tags: string[]
}

export const homeNavigation: HomeLink[] = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
]

export const homePrimaryActions: HomeLink[] = [
  { label: "Explore selected work", href: "#work" },
  { label: "Read the field notes", href: "#notes" },
]

export const homeProofRecords: HomeProofRecord[] = [
  {
    id: "hernandez-landscape",
    sequence: "01",
    eyebrow: "Web delivery",
    year: "2026",
    title: "A bilingual quote path for Hernandez Landscape",
    summary:
      "A focused English-and-Spanish website flow that helps visitors understand the work, estimate a project, and carry that context into a quote request.",
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
    visual: {
      src: "/portfolio/hernandez/site-screenshot.png",
      alt: "Saved screenshot of the Hernandez Landscape bilingual website interface",
      label: "Checked-in website capture",
      browserPath: "hernandezlandscape / saved interface",
      width: 1440,
      height: 1000,
    },
    tags: ["Bilingual web", "Quote flow", "Handoff"],
  },
  {
    id: "uplink-heap-overwrite",
    sequence: "02",
    eyebrow: "Binary exploitation",
    year: "2026",
    title: "Uplink: a data-only path through a hardened binary",
    summary:
      "A step-by-step account of turning an unbounded scanf into a heap task overwrite when the usual control-flow shortcuts were unavailable.",
    problem:
      "The target enabled modern mitigations, so the useful path required understanding the program's data model instead of reaching for a familiar control-flow exploit.",
    role:
      "I reconstructed the binary, validated the exploit in a containerized replica, and documented the full reasoning with live details redacted.",
    decision: "Follow the size-field corruption into the heap task the program was already preparing to execute.",
    tradeoff:
      "The writeup omits the live target and flag, but keeps the complete technique and validation path visible.",
    evidence: {
      label: "Read the Uplink writeup",
      href: "/writeups/uplink-heap-overwrite-pwn",
      status: "Published",
      note: "Published from a locally validated, containerized replica.",
    },
    visual: {
      src: "/portfolio/proof/uplink-writeup.webp",
      alt: "Screenshot of David Ortiz's published Uplink binary exploitation writeup",
      label: "Published page capture",
      browserPath: "davidtiz.com / writeups / uplink",
      width: 1440,
      height: 1000,
    },
    tags: ["Heap", "Ghidra", "pwntools"],
  },
  {
    id: "stolen-swipe",
    sequence: "03",
    eyebrow: "Log forensics",
    year: "2025",
    title: "Stolen Swipe: finding fraud across ATM and EMV logs",
    summary:
      "A forensic walkthrough that combines fragmented payment-card records, reconstructs missing digits with Luhn checks, and separates legitimate chip use from magstripe fraud.",
    problem:
      "No single artifact contained the full story, and the relevant payment-card evidence was split across customer, ATM, and EMV records.",
    role:
      "I correlated the records, reconstructed redacted identifiers with checksums, interpreted EMV tags, and documented the analysis without exposing competition data.",
    decision:
      "Treat the logs as one connected timeline and use transaction mode—not location alone—to distinguish the fraudulent withdrawal.",
    tradeoff:
      "Sensitive names, account identifiers, and card numbers stay redacted, while the complete reasoning remains reproducible.",
    evidence: {
      label: "Read the Stolen Swipe writeup",
      href: "/writeups/stolen-swipe-emv-forensics",
      status: "Published",
      note: "Published with all competition identities and payment-card data redacted.",
    },
    visual: {
      src: "/portfolio/proof/stolen-swipe-writeup.webp",
      alt: "Screenshot of David Ortiz's published Stolen Swipe log forensics writeup",
      label: "Published page capture",
      browserPath: "davidtiz.com / writeups / stolen swipe",
      width: 1440,
      height: 1000,
    },
    tags: ["EMV", "Luhn", "Log analysis"],
  },
]

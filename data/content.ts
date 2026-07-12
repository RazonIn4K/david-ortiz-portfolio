// Homepage "Selected systems" tier: 3 flagship builds, each in the spec format
// problem -> what I built -> what it proves (docs/IDENTITY-AND-DESIGN-DIRECTION.md).
// Keep claims honest and links live; badges are Status / Type per the spec.
export type FlagshipSystem = {
  badges: string[]
  title: string
  problem: string
  built: string
  proves: string
  image: string
  alt: string
  href: string
  linkLabel: string
  external?: boolean
}

export const flagshipSystems: FlagshipSystem[] = [
  {
    badges: ["Client", "Live"],
    title: "Local-business web system",
    problem:
      "A real local service business needed a credible web surface with clear services and a direct quote path.",
    built:
      "A bilingual site with service pages, photos, and quote flows, plus the working layer around it: domain, official inbox, social and WhatsApp paths, and a security-minded handoff.",
    proves: "I can ship a customer-facing system end to end and leave the owner able to run it.",
    image: "/portfolio/hernandez/site-trust-screenshot.png",
    alt: "Screenshot of the Hernandez Landscape website trust and services section.",
    href: "/portfolio",
    linkLabel: "Inspect the live build",
  },
  {
    badges: ["Product", "Live demo"],
    title: "PromptDefenders",
    problem: "AI-assisted workflows trust untrusted input by default, and prompt injection exploits exactly that.",
    built:
      "A prompt-injection defense project: evaluation methodology, safe test cases, and checklists for hardening AI-assisted workflows.",
    proves: "Security thinking applied to AI systems as working artifacts, not just claims.",
    image: "/visuals/proof-asset-gallery.svg",
    alt: "Illustration of a gallery of proof assets for prompt-defense work.",
    href: "https://prompt-defenders.vercel.app",
    linkLabel: "Open the live demo",
    external: true,
  },
  {
    badges: ["Lab", "Live"],
    title: "Razon Live Lab",
    problem: "Learning in private leaves no evidence, and unverifiable skill claims are worth little.",
    built:
      "A public lab for AI security and systems: streams, writeups, and sanitized demos, in English and Spanish.",
    proves: "Consistent learning in public, with artifacts people can check.",
    image: "/visuals/generated-lanes.webp",
    alt: "Illustration of parallel working lanes in a live lab.",
    href: "https://razonlab.com",
    linkLabel: "Visit the lab",
    external: true,
  },
]

// The rest of the bench: working lanes that back the flagship systems.
export type WorkLane = {
  label: string
  title: string
  line: string
  href?: string
  linkLabel?: string
}

export const workLanes: WorkLane[] = [
  {
    label: "Delivery",
    title: "Multi-AI delivery workflow",
    line: "Research, implementation, review, QA, and documentation split into visible steps instead of one prompt.",
  },
  {
    label: "Knowledge",
    title: "RAG and notes tools",
    line: "Retrieval, cited answers, and the habit of checking the source before trusting a generated answer.",
  },
  {
    label: "Ops",
    title: "Automation and cleanup",
    line: "Small automations for intake, follow-up, and deployment checks, documented before they count as done.",
  },
  {
    label: "Demos",
    title: "Spanish-first local-business demos",
    line: "Pedidos, citas, servicios: flows for owners and customers who live on mobile, WhatsApp, and social.",
    href: "/demo",
    linkLabel: "Open the demos",
  },
]

// Hero NOW/LAST SHIPPED strip and the Notes section's current-focus list live
// together so there is one honest update point: refresh `now` + `currentFocus`
// when the working focus shifts, and `lastShipped` whenever something real ships.
export const heroStatus = {
  now: "prompt-defense evals · multi-AI delivery workflows · learning in public",
  lastShipped: {
    label: "CTF writeups + proof cards",
    href: "/writeups",
    date: "Jun 2026",
  },
}

export const currentFocus = [
  "Cleaner local-business websites with quote, order, or contact flows that do not feel overbuilt.",
  "Repeatable AI-assisted delivery: research, implementation, review, browser QA, and a written handoff.",
  "AI-security workflow habits, especially prompt injection, tool boundaries, and validation.",
  "Better notes that preserve what worked, what failed, and what should happen in the next session.",
]

export const chatConfig = {
  title: 'PORTFOLIO GUIDE',
  subtitle: 'Ask about the work, current experiments, or how he approaches projects',
  placeholder: 'Ask about projects, automation workflows, or how David works.',
  welcomeMessage:
    "Hi! This is David's personal portfolio. Ask about what he's building, how he works, or what he's exploring next.",
}

// Centralized contact details. A public business number/email is not a secret;
// keep these here (not in .env) so links stay consistent across the site.
export const contact = {
  whatsappNumber: '17792124220', // country code + number, used by the screened WhatsApp redirect
  email: 'hello@davidtiz.com',
  github: 'https://github.com/RazonIn4K',
}

export const whatsappHref = '/contact/whatsapp?intent=portfolio'

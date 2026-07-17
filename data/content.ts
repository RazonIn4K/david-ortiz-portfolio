import { businessSiteUrl } from "@/lib/site-config"

// Hero credential chips. Each one must stay checkable against a source that is
// linked somewhere on the page (the proof cards below).
export const heroChips = [
  "NCL Fall 2025: 24th of 620, Experienced",
  "Gray Swan: 42 unique breaks",
  "3 production systems live",
]

// Homepage proof tier: one artifact, one result, one link per card.
// Numbers come from the linked source or they do not ship.
export type ProofCard = {
  badges: string[]
  title: string
  result: string
  context?: string
  href: string
  linkLabel: string
  external?: boolean
  secondaryHref?: string
  secondaryLabel?: string
}

export const proofCards: ProofCard[] = [
  {
    badges: ["AI security", "Arena"],
    title: "Gray Swan Arena: frontier-model breaks",
    result:
      "42 unique breaks across authorized arenas, including 21 in the Indirect Prompt Injection Q2 2026 wave (76th of 232). Winner's Circle member.",
    context:
      "Authorized competition and independent research against frontier-model agents, not client pentests.",
    href: "https://app.grayswan.ai/arena/user/67d3110be637c128d0cca612",
    linkLabel: "Public arena profile",
    external: true,
  },
  {
    badges: ["CTF", "Ranked"],
    title: "National Cyber League, Fall 2025",
    result:
      "24th of 620 overall in the Experienced bracket, 97th percentile. 1st of 620 in Log Analysis, 3rd in Network Traffic Analysis, 7th in Web Application Exploitation.",
    href: "https://cyberskyline.com/report/BC2QQYBBP3L3",
    linkLabel: "Official score report",
    external: true,
  },
  {
    badges: ["Product", "Live"],
    title: "PromptDefenders",
    result:
      "A prompt-injection scanner that scores text against a versioned rule pack: instruction override, data exfiltration, and tool misuse, flagged before a model sees them.",
    href: "https://prompt-defenders.vercel.app",
    linkLabel: "Run the live scanner",
    external: true,
    secondaryHref: "https://github.com/RazonIn4K/prompt-defenders",
    secondaryLabel: "Source",
  },
  {
    badges: ["Client build", "Live"],
    title: "Hernandez Landscape",
    result:
      "A bilingual services site for a real landscaping business: quote flow, gallery, and local SEO. Shipped, handed off, and running without me.",
    href: "https://hernandezlandscapeservices.com",
    linkLabel: "Visit the live site",
    external: true,
    secondaryHref: `${businessSiteUrl}/contact`,
    secondaryLabel: "Scope similar work",
  },
]

export const chatConfig = {
  title: 'SITE GUIDE',
  subtitle: 'Ask about the security work, the builds, or how to reach David',
  placeholder: 'Ask about the arena results, PromptDefenders, or the builds.',
  welcomeMessage:
    "Hi! This is David's personal site. Ask about the AI-security work, the builds, or how to get in touch.",
}

// Centralized contact details. A public business number/email is not a secret;
// keep these here (not in .env) so links stay consistent across the site.
export const contact = {
  whatsappNumber: '17792124220', // country code + number, used by the screened WhatsApp redirect
  email: 'hello@davidtiz.com',
  github: 'https://github.com/RazonIn4K',
}

export const whatsappHref = '/contact/whatsapp?intent=portfolio'

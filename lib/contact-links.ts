import { businessSiteUrl } from "@/lib/site-config"

export type ContactLink = {
  id: string
  label: string
  href: string
  description: string
}

export const quickReachLinks: ContactLink[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:hello@highencodelearning.com",
    description: "Best async path for introductions, follow-up, and project questions.",
  },
  {
    id: "calendly",
    label: "Book a call",
    href: "https://calendly.com/davidinfosec07",
    description: "Use this if you want to talk live and get into the actual problem quickly.",
  },
  {
    id: "business-inbox",
    label: "Business inbox",
    href: `${businessSiteUrl}/contact`,
    description: "Go straight to the business-facing contact flow on High Encode Learning.",
  },
]

export const hireMeLinks: ContactLink[] = [
  {
    id: "upwork",
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/davido174",
    description: "Use this if you want a scoped freelance project or contract path.",
  },
  {
    id: "fiverr",
    label: "Fiverr",
    href: "https://www.fiverr.com/razonnet",
    description: "Use this if a productized package or smaller entry point makes more sense.",
  },
  {
    id: "high-encode",
    label: "High Encode Learning",
    href: businessSiteUrl,
    description: "Business-facing demos, services, and project scoping live there.",
  },
]

export const followWorkLinks: ContactLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/RazonIn4K",
    description: "Code, experiments, repositories, and working implementation history.",
  },
  {
    id: "csbrainai",
    label: "CSBrainAI",
    href: "https://csbrain.ai",
    description: "Retrieval and explanation experiments around technical knowledge delivery.",
  },
  {
    id: "prompt-defenders",
    label: "Prompt Defenders",
    href: "https://prompt-defenders.com",
    description: "Prompt-safety and AI security testing work.",
  },
]

export const floatingContactLinks: ContactLink[] = [
  quickReachLinks[0],
  quickReachLinks[1],
  hireMeLinks[0],
  hireMeLinks[2],
]

export const footerPrimaryLinks: ContactLink[] = [
  quickReachLinks[0],
  quickReachLinks[1],
  hireMeLinks[0],
  hireMeLinks[1],
  followWorkLinks[0],
]

export const footerEcosystemLinks: ContactLink[] = [
  hireMeLinks[2],
  followWorkLinks[1],
  followWorkLinks[2],
]

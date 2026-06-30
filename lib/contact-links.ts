export type ContactLink = {
  id: string
  label: string
  href: string
  description: string
}

export const socialProfileLinks = [
  "https://github.com/RazonIn4K",
  "https://www.youtube.com/@razonlab",
  "https://www.twitch.tv/razonlab",
  "https://x.com/Razonapp",
  "https://www.linkedin.com/in/davidortiz-dekalb/",
  "https://www.facebook.com/profile.php?id=61581646236939",
  "https://www.instagram.com/ra.z.on",
] as const

export const quickReachLinks: ContactLink[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "/contact/whatsapp?intent=portfolio",
    description: "Start with a screened, context-first message that keeps the phone out of public pages.",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:hello@davidtiz.com",
    description: "Best async path for introductions, follow-up, and project questions.",
  },
  {
    id: "calendly",
    label: "Book a call",
    href: "https://calendly.com/davidinfosec07",
    description: "Use this if you want to talk live and get into the actual problem quickly.",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61581646236939",
    description: "Fastest social path if someone met me locally and wants to reconnect there.",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/ra.z.on",
    description: "Use this if Instagram DM is the easiest way to continue the conversation.",
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
]

export const followWorkLinks: ContactLink[] = [
  {
    id: "youtube",
    label: "YouTube: Razon Live Lab",
    href: "https://www.youtube.com/@razonlab",
    description: "AI security explainers, live build VODs, and stream highlights from the lab.",
  },
  {
    id: "twitch",
    label: "Twitch",
    href: "https://www.twitch.tv/razonlab",
    description: "Live deep-work blocks and sanitized build sessions, in real time.",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/Razonapp",
    description: "Clips, AI security takes, and go-live announcements.",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/RazonIn4K",
    description: "Code, experiments, repositories, and working implementation history.",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/davidortiz-dekalb/",
    description: "Professional profile, background, and another clean way to connect.",
  },
]

export const floatingContactLinks: ContactLink[] = [
  quickReachLinks[0],
  quickReachLinks[1],
  quickReachLinks[2],
  quickReachLinks[3],
  hireMeLinks[0],
]

export const footerPrimaryLinks: ContactLink[] = [
  quickReachLinks[0],
  quickReachLinks[1],
  quickReachLinks[2],
  quickReachLinks[3],
  hireMeLinks[0],
  hireMeLinks[1],
  followWorkLinks[0],
  followWorkLinks[1],
]

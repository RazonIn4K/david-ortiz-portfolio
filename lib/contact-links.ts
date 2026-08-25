export type ContactLink = {
  id: string
  label: string
  href: string
  description: string
}

// `Person.sameAs` must contain owner-person profiles, not Razon Lab publication channels.
export const socialProfileLinks = [
  "https://github.com/RazonIn4K",
  "https://www.linkedin.com/in/davidortiz-dekalb/",
  "https://www.facebook.com/profile.php?id=61581646236939",
  "https://www.instagram.com/ra.z.on",
] as const

export const quickReachLinks: ContactLink[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:hello@davidtiz.com",
    description: "The simplest way to share an introduction, a thoughtful question, or a reason to connect.",
  },
  {
    id: "calendly",
    label: "Schedule a conversation",
    href: "https://calendly.com/davidinfosec07",
    description: "Pick a time when a live conversation would be more useful than another message.",
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

export const followWorkLinks: ContactLink[] = [
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@razonlab",
    description: "Technical explainers, build recordings, and selected stream highlights.",
  },
  {
    id: "twitch",
    label: "Twitch",
    href: "https://www.twitch.tv/razonlab",
    description: "Live deep-work blocks and sanitized build sessions.",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/Razonapp",
    description: "Short technical notes, clips, and session announcements.",
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

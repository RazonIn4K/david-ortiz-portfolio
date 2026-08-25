import { contact } from "@/data/content"

export type ContactLink = {
  id: string
  label: string
  href: string
  description: string
}

// `Person.sameAs` must contain owner-person profiles, not Razon Lab publication channels.
export const socialProfileLinks = [
  contact.github,
  contact.linkedin,
  contact.facebook,
  contact.instagram,
] as const

export const quickReachLinks: ContactLink[] = [
  {
    id: "email",
    label: "Email",
    href: `mailto:${contact.email}`,
    description: "The simplest way to share an introduction, a thoughtful question, or a reason to connect.",
  },
  {
    id: "calendly",
    label: "Schedule a conversation",
    href: contact.calendly,
    description: "Pick a time when a live conversation would be more useful than another message.",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: contact.facebook,
    description: "Fastest social path if someone met me locally and wants to reconnect there.",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: contact.instagram,
    description: "Use this if Instagram DM is the easiest way to continue the conversation.",
  },
]

export const followWorkLinks: ContactLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: contact.github,
    description: "Code, experiments, repositories, and working implementation history.",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: contact.linkedin,
    description: "Professional profile, background, and another clean way to connect.",
  },
]

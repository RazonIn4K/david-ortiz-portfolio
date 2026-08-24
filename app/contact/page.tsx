import type { Metadata } from "next"
import { ContactPageClient } from "./contact-client"

export const metadata: Metadata = {
  title: "Contact | David Ortiz",
  description:
    "Direct contact hub for David Ortiz. Email, booking, and direct work-intake paths.",
}

export default function ContactPage() {
  return <ContactPageClient />
}

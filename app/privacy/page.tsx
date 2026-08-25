import Link from "next/link"
import type { Metadata } from "next"
import { ThemeShell } from "@/components/theme-shell"

export const metadata: Metadata = {
  title: "Privacy Policy | David Ortiz",
  description:
    "Privacy policy for davidtiz.com and David Ortiz's WhatsApp contact messaging, including data deletion instructions.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | David Ortiz",
    description:
      "Privacy policy for davidtiz.com and David Ortiz's WhatsApp contact messaging, including data deletion instructions.",
    url: "/privacy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | David Ortiz",
    description:
      "Privacy policy for davidtiz.com and David Ortiz's WhatsApp contact messaging, including data deletion instructions.",
  },
}

const wrapper: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "48px 20px 64px",
  lineHeight: 1.65,
  fontSize: 16,
}

export default function PrivacyPage() {
  return (
    <ThemeShell>
      <article style={wrapper}>
      <h1>Privacy Policy</h1>
      <p>
        <em>Effective date: August 25, 2026</em>
      </p>
      <p>
        This site, davidtiz.com, is the personal portfolio of David Ortiz. This page explains what
        information is collected when you visit the site or contact me, how it is used, and how you
        can have it deleted. Questions: <a href="mailto:hello@davidtiz.com">hello@davidtiz.com</a>.
      </p>

      <h2>Information collected on this website</h2>
      <p>
        The site uses Vercel Analytics to count page views in aggregate. I do not run advertising
        trackers and I do not sell personal data. Your light/dark theme preference is stored only in
        your own browser (localStorage) and is never transmitted to me.
      </p>

      <h2>WhatsApp contact messaging</h2>
      <p>
        If you contact me on WhatsApp (including through the buttons on this site), I receive your
        phone number, your WhatsApp profile name, and the messages you send through WhatsApp. I use
        this information to respond to your personal contact request, such as an introduction,
        employment conversation, collaboration, speaking, referral, or peer discussion.
        Conversation details may be stored as a contact record so I can follow up.
      </p>
      <p>
        Commercial service inquiries belong with RazonWorks. I may direct an inquiry there instead
        of treating this personal portfolio as client intake.
      </p>
      <p>
        The providers used by this public path are Meta Platforms for WhatsApp delivery and Vercel
        for website hosting and aggregate analytics. Each processes data under its own terms. I do
        not sell your information. Optional webhook and workflow integrations are not described as
        active here unless they are enabled and this notice is updated.
      </p>

      <h2>Retention</h2>
      <p>
        Messages and contact records are kept only as long as needed to handle your conversation
        and maintain ordinary correspondence, and are deleted on request as described below.
      </p>

      <h2>Data deletion instructions</h2>
      <p>
        You can request deletion of your data at any time, using either of these channels:
      </p>
      <ul>
        <li>
          Email <a href="mailto:hello@davidtiz.com">hello@davidtiz.com</a> with the subject
          &quot;Delete my data&quot;, or
        </li>
        <li>Send &quot;Delete my data&quot; in a WhatsApp message to the same number you contacted.</li>
      </ul>
      <p>
        I will delete your contact records and stored messages within 30 days and confirm when it is
        done. Note that WhatsApp messages on Meta&apos;s own servers are governed by Meta&apos;s
        retention rules and your own WhatsApp app.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the new version will be posted at this address with an updated
        effective date.
      </p>

      <p>
        <Link href="/">&larr; Back to davidtiz.com</Link>
      </p>
      </article>
    </ThemeShell>
  )
}

import Link from "next/link"
import type { Metadata } from "next"
import { ThemeShell } from "@/components/theme-shell"
import { contact } from "@/data/content"

export const metadata: Metadata = {
  title: "Privacy Policy | David Ortiz",
  description:
    "Privacy policy for davidtiz.com, including analytics, direct contact, and data deletion instructions.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | David Ortiz",
    description:
      "Privacy policy for davidtiz.com, including analytics, direct contact, and data deletion instructions.",
    url: "/privacy",
    type: "website",
    images: [
      {
        url: "/visuals/david-og-card.png",
        width: 1200,
        height: 630,
        alt: "David Ortiz, builder, learner, and documentarian portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | David Ortiz",
    description:
      "Privacy policy for davidtiz.com, including analytics, direct contact, and data deletion instructions.",
    images: ["/visuals/david-og-card.png"],
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
        can have it deleted. Questions: <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>Information collected on this website</h2>
      <p>
        The site uses Vercel Analytics to count page views in aggregate. I do not run advertising
        trackers and I do not sell personal data. Your light/dark theme preference is stored only in
        your own browser (localStorage) and is never transmitted to me.
      </p>

      <h2>Direct contact</h2>
      <p>
        If you email me, schedule a conversation, or contact me through one of the external profiles
        linked from this site, I receive the information you choose to share through that provider.
        I use it only to respond and maintain ordinary correspondence.
      </p>
      <p>
        Email, scheduling, and social platforms process messages under their own terms. I do not
        sell your information or use personal correspondence for advertising.
      </p>

      <h2>Retention</h2>
      <p>
        Messages and contact records are kept only as long as needed to handle your conversation
        and maintain ordinary correspondence, and are deleted on request as described below.
      </p>

      <h2>Data deletion instructions</h2>
      <p>
        You can request deletion of your contact records at any time:
      </p>
      <ul>
        <li>
          Email <a href={`mailto:${contact.email}`}>{contact.email}</a> with the subject
          &quot;Delete my data&quot;.
        </li>
      </ul>
      <p>
        I will delete the contact records I control within 30 days and confirm when it is done.
        Copies held by an email, scheduling, or social provider follow that provider&apos;s retention
        rules and account controls.
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

"use client"

import { motion, useReducedMotion } from "framer-motion"

import { ProtectedEmailLink, RevealedEmail } from "@/components/contact/protected-email-link"
import { Reveal } from "@/components/motion/site-motion"
import { SubpageNav, SubpageShell } from "@/components/motion/subpage-shell"

export function PrivacyMotion() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <SubpageShell>
      <SubpageNav backHref="/" backLabel="Back to home" contactSubject="Privacy inquiry" />

      <Reveal direction="up">
        <header className="dtz-subpage-hero dtz-subpage-hero-compact">
          <p className="dtz-section-label">
            <span className="dtz-index-badge" aria-hidden="true">
              Legal
            </span>
            Privacy
          </p>
          <h1 className="mt-4">What this site collects and how to delete it.</h1>
          <p className="dtz-section-lead mt-4">
            Plain-language notes for davidtiz.com. Effective June 4, 2026. Questions:{" "}
            <ProtectedEmailLink subject="Privacy inquiry" className="font-semibold dtz-link-arrow">
              <RevealedEmail />
            </ProtectedEmailLink>
            .
          </p>
        </header>
      </Reveal>

      <div className="dtz-section-rule" aria-hidden="true" />

      <Reveal direction="up" delay={0.05}>
        <motion.article
          className="rounded-3xl border p-6 md:p-8 dtz-glass-panel dtz-subpage-prose"
          style={{ borderColor: "var(--dtz-border)" }}
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
        >
          <h2>Information collected on this website</h2>
          <p>
            The site uses Vercel Analytics to count page views in aggregate. I do not run advertising
            trackers and I do not sell personal data. Your light/dark theme preference is stored only in
            your own browser (localStorage) and is never transmitted to me.
          </p>

          <h2>Email and scheduling</h2>
          <p>
            If you email me or book a call through Calendly, I receive the contact details and message
            content you choose to share so I can respond. Inquiry details may be kept only as long as
            needed to handle your request and maintain ordinary business records.
          </p>

          <h2>WhatsApp business messaging</h2>
          <p>
            WhatsApp is not linked from the public site, but I may still receive messages on WhatsApp
            Business from people who have my number from prior contact. In that case I receive your phone
            number, WhatsApp profile name, and the messages you send through Meta&apos;s WhatsApp Business
            Platform. I use this information to respond to your inquiry. Service providers that may
            process this data on my behalf include Meta Platforms (message delivery), Vercel (website and
            webhook hosting), and Google Cloud (workflow processing and storage). I do not sell or share
            your information with anyone else.
          </p>

          <h2>Retention</h2>
          <p>
            Messages and inquiry records are kept only as long as needed to handle your request and
            maintain ordinary business records, and are deleted on request as described below.
          </p>

          <h2>Data deletion instructions</h2>
          <p>You can request deletion of your data at any time:</p>
          <ul>
            <li>
              Email{" "}
              <ProtectedEmailLink subject="Delete my data" className="font-semibold">
                <RevealedEmail />
              </ProtectedEmailLink>{" "}
              with the subject &quot;Delete my data&quot;, or
            </li>
            <li>
              If you previously contacted me on WhatsApp, send &quot;Delete my data&quot; in a WhatsApp
              message to the same number you used.
            </li>
          </ul>
          <p>
            I will delete your inquiry records and stored messages within 30 days and confirm when it is
            done. WhatsApp messages on Meta&apos;s own servers are governed by Meta&apos;s retention
            rules and your WhatsApp app settings.
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes, the new version will be posted at this address with an updated
            effective date.
          </p>
        </motion.article>
      </Reveal>
    </SubpageShell>
  )
}

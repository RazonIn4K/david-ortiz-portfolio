import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Mail, Tv, Video, MessageCircle, Camera, Globe } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Nitro Camden — Concept Page",
  description: "Private concept page for Nitro Camden. Not official.",
  robots: {
    index: false,
    follow: false,
  },
};

const socialLinks = [
  { label: "Twitch", href: "https://www.twitch.tv/nitro_camden", icon: Tv },
  { label: "Kick", href: "https://kick.com/nitrocamden", icon: Video },
  { label: "YouTube", href: "https://www.youtube.com/@StlCam", subLabel: "@StlCam", icon: Video },
  { label: "YouTube", href: "https://www.youtube.com/@Cam314_", subLabel: "@Cam314_", icon: Video },
  { label: "X", href: "https://x.com/CamFrmDaLou", subLabel: "@CamFrmDaLou", icon: Globe },
  { label: "Instagram", href: "https://instagram.com/camfrmdalou", subLabel: "@camfrmdalou", icon: Camera },
  { label: "TikTok", href: "https://tiktok.com/@camfrmdalou", subLabel: "@camfrmdalou", icon: Video },
  { label: "Discord", href: "https://discord.gg/camstl", icon: MessageCircle },
];

const supportLinks = [
  { label: "Merch", href: "https://nitro-camden-merch.creator-spring.com" },
  { label: "Streamlabs", href: "https://streamlabs.com/nitrocamden" },
  { label: "Cash App", href: null, display: "$CamFrmDaLou" },
];

export default function NitroCamdenPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.backLink}>
            ← davidtiz.com
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.avatarRing}>
            <div className={styles.avatar}>NC</div>
          </div>
          <h1 className={styles.title}>Nitro Camden</h1>
          <p className={styles.tagline}>Content creator. Born in St. Louis. #Stl #314</p>
          <p className={styles.bio}>That funny dude from STL. IRL / Just Chatting.</p>

          <div className={styles.primaryCta}>
            <a
              href="https://www.twitch.tv/nitro_camden"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnTwitch}`}
            >
              <Tv className={styles.btnIcon} aria-hidden="true" />
              Watch on Twitch
            </a>
            <a
              href="https://kick.com/nitrocamden"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnKick}`}
            >
              <Video className={styles.btnIcon} aria-hidden="true" />
              Watch on Kick
            </a>
          </div>
        </section>

        <section className={styles.embedSection}>
          <div className={styles.embedWrapper}>
            <iframe
              src="https://player.twitch.tv/?channel=nitro_camden&parent=davidtiz.com"
              height="300"
              width="100%"
              allowFullScreen
              title="Nitro Camden Twitch Stream"
              className={styles.embedIframe}
            />
          </div>
          <a
            href="https://www.twitch.tv/nitro_camden"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.embedFallback}
          >
            <Tv className={styles.btnIcon} aria-hidden="true" />
            Open Twitch
          </a>
        </section>

        <section className={styles.socials}>
          <h2 className={styles.sectionTitle}>Connect</h2>
          <div className={styles.socialGrid}>
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Icon className={styles.socialIcon} aria-hidden="true" />
                  <span className={styles.socialLabel}>
                    {link.label}
                    {link.subLabel && <span className={styles.socialSub}>{link.subLabel}</span>}
                  </span>
                  <ExternalLink className={styles.externalIcon} aria-hidden="true" />
                </a>
              );
            })}
            <div className={`${styles.socialLink} ${styles.socialStatic}`}>
              <Camera className={styles.socialIcon} aria-hidden="true" />
              <span className={styles.socialLabel}>
                Snapchat
                <span className={styles.socialSub}>stlmadecam</span>
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Support</h2>
          <div className={styles.supportGrid}>
            {supportLinks.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.supportLink}
                >
                  {link.label}
                  <ExternalLink className={styles.externalIcon} aria-hidden="true" />
                </a>
              ) : (
                <span key={link.label} className={`${styles.supportLink} ${styles.supportStatic}`}>
                  {link.label}: {link.display}
                </span>
              )
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.disclaimer}>
          Private concept from{" "}
          <a href="https://razonworks.com" target="_blank" rel="noopener noreferrer">
            RazonWorks
          </a>
          . Not managed by Nitro Camden. Not official.
        </p>
        <div className={styles.footerLinks}>
          <a href="https://razonworks.com" target="_blank" rel="noopener noreferrer">
            razonworks.com
          </a>
          <a href="https://davidtiz.com/portfolio">davidtiz.com/portfolio</a>
          <a href="mailto:hello@davidtiz.com">
            <Mail className={styles.footerIcon} aria-hidden="true" />
            hello@davidtiz.com
          </a>
        </div>
      </footer>
    </div>
  );
}

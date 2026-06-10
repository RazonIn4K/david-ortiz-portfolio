import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  MousePointerClick,
  Quote,
  Star,
} from "lucide-react";

import { businessSiteUrl } from "@/lib/site-config";
import { contact } from "@/data/content";
import { ThemeShell } from "@/components/theme-shell";

export const metadata: Metadata = {
  title: "Portfolio | David Ortiz",
  description:
    "Portfolio for David Ortiz, including the Hernandez Landscape website, sourced customer review links, and local-business quote flow.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio | David Ortiz",
    description:
      "Portfolio for David Ortiz, including the Hernandez Landscape website, sourced customer review links, and local-business quote flow.",
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Portfolio | David Ortiz",
    description:
      "Portfolio for David Ortiz, including the Hernandez Landscape website, sourced customer review links, and local-business quote flow.",
  },
};

const highlights = [
  "Bilingual English and Spanish paths",
  "Instant estimate and prefilled quote capture flow",
  "Service pages for lawn care, tree service, landscaping, and snow removal",
  "Project gallery, sourced public review, and local service-area content",
];

const packageExamples = [
  {
    title: "Website launch",
    description:
      "Mobile-first service site with calls, quote forms, gallery sections, and local SEO basics.",
  },
  {
    title: "Local growth",
    description:
      "Website plus Google Maps, social proof, follow-up flow, and lead generation setup.",
  },
  {
    title: "Ongoing care",
    description:
      "Monthly updates, seasonal service changes, tracking, and campaign support.",
  },
];

const referenceLinks = [
  {
    title: "Live landscaping website",
    description:
      "The Hernandez site lets visitors inspect the finished landscaping example in its live form.",
    href: "https://hernandezlandscapeservices.com",
    icon: MapPin,
  },
  {
    title: "Services and work page",
    description:
      "A broader work page with supporting local-business examples and delivery context.",
    href: `${businessSiteUrl}/work`,
    icon: ExternalLink,
  },
  {
    title: "Hernandez case note",
    description:
      "Detailed breakdown of bilingual copy, service structure, trust signals, and quote capture.",
    href: `${businessSiteUrl}/projects/hernandez-landscape-local-business-site`,
    icon: FileText,
  },
];

const stackSignals = [
  "HTML, CSS, and JavaScript",
  "Vanilla bilingual i18n",
  "Web3Forms lead capture",
  "Service-to-quote prefill behavior",
  "Responsive service-card layout",
  "Local SEO and service-area copy",
];

const liveProofUpdates = [
  {
    title: "Sourced review links",
    description:
      "The Hernandez trust section now references a public review instead of generic placeholder testimonials.",
    icon: Star,
  },
  {
    title: "Better quote intent",
    description:
      "Service chips now send visitors into the form with the relevant service already selected.",
    icon: MousePointerClick,
  },
  {
    title: "Aligned reference links",
    description:
      "This page, the services page, and the case note now point to the same current live example.",
    icon: Quote,
  },
];

const panelStyle = {
  borderColor: "var(--dtz-border)",
  background: "var(--dtz-panel)",
} as const;
const panelDeepStyle = {
  borderColor: "var(--dtz-border)",
  background: "var(--dtz-panel-2)",
} as const;
const iconChipStyle = {
  background: "var(--dtz-accent-soft)",
  color: "var(--dtz-accent)",
} as const;
const mutedText = { color: "var(--dtz-muted)" } as const;
const primaryCtaStyle = {
  background: "var(--dtz-accent)",
  color: "var(--dtz-on-accent)",
} as const;

export default function PortfolioPage() {
  return (
    <ThemeShell>
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <nav className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
              style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={primaryCtaStyle}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact David
            </a>
          </nav>

          <section className="grid gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="dtz-section-label">Portfolio</p>
              <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
                Real local-business work, starting with Hernandez Landscape
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={mutedText}>
                This page gives visitors a direct reference point. Hernandez
                Landscape & Tree Service is a live landscaping website with
                bilingual content, service positioning, project photos, and a
                quote flow built around local customer calls, sourced trust
                signals, and estimate requests.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://hernandezlandscapeservices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-transform hover:scale-[1.01]"
                  style={primaryCtaStyle}
                >
                  View live Hernandez site
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={`${businessSiteUrl}/projects/hernandez-landscape-local-business-site`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3 font-semibold transition-colors"
                  style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
                >
                  Read case note
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div
              className="rounded-3xl border p-4"
              style={{ ...panelStyle, boxShadow: "var(--dtz-shadow)" }}
            >
              <Image
                src="/portfolio/hernandez/site-screenshot.png"
                alt="Screenshot of the Hernandez Landscape website"
                width={1440}
                height={1000}
                className="h-auto w-full rounded-2xl border"
                style={{ borderColor: "var(--dtz-border)" }}
                priority
              />
            </div>
          </section>

          <section className="grid gap-4 pb-10 md:grid-cols-3">
            {liveProofUpdates.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-3xl border p-6" style={panelStyle}>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={iconChipStyle}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed" style={mutedText}>
                    {item.description}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border p-6" style={panelStyle}>
              <p className="dtz-section-label">What the example shows</p>
              <div className="mt-6 space-y-4">
                {highlights.map((highlight) => (
                  <div key={highlight} className="flex gap-3">
                    <span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: "var(--dtz-accent)" }}
                    />
                    <p className="text-sm leading-relaxed" style={mutedText}>
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {packageExamples.map((item) => (
                <article key={item.title} className="rounded-3xl border p-6" style={panelStyle}>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed" style={mutedText}>
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border p-6 md:p-8" style={panelStyle}>
              <p className="dtz-section-label">Reference links</p>
              <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                Each link answers a different question about the work.
              </h2>
              <div className="mt-6 grid gap-4">
                {referenceLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 rounded-2xl border p-4 transition-colors"
                      style={panelDeepStyle}
                    >
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                        style={iconChipStyle}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          {item.title}
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            style={{ color: "var(--dtz-subtle)" }}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed" style={mutedText}>
                          {item.description}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border p-6 md:p-8" style={panelStyle}>
              <p className="dtz-section-label">Build signals</p>
              <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                Concrete stack, not placeholder labels.
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={mutedText}>
                Clients do not need the whole implementation story, but they
                should see that the site was built with real production pieces and
                not just a static mockup.
              </p>
              <div className="mt-6 grid gap-3">
                {stackSignals.map((signal) => (
                  <div
                    key={signal}
                    className="flex items-center gap-3 rounded-2xl border px-4 py-3"
                    style={panelDeepStyle}
                  >
                    <CheckCircle2
                      className="h-4 w-4 shrink-0"
                      style={{ color: "var(--dtz-accent)" }}
                      aria-hidden="true"
                    />
                    <span className="text-sm" style={mutedText}>
                      {signal}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 py-16 lg:grid-cols-3">
            <div className="overflow-hidden rounded-3xl border" style={panelStyle}>
              <Image
                src="/portfolio/hernandez/landscape-work-hero.jpeg"
                alt="Landscaping project photo used for Hernandez Landscape"
                width={1600}
                height={1000}
                loading="eager"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold">Real project imagery</h2>
                <p className="mt-2 text-sm leading-relaxed" style={mutedText}>
                  The site uses real work photos instead of generic stock imagery,
                  so prospects can inspect the type of landscaping work the
                  business actually performs.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border" style={panelStyle}>
              <Image
                src="/portfolio/hernandez/site-trust-screenshot.png"
                alt="Sourced customer feedback section from the Hernandez Landscape website"
                width={1440}
                height={729}
                loading="eager"
                className="aspect-[16/10] w-full object-cover object-top"
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold">Sourced trust section</h2>
                <p className="mt-2 text-sm leading-relaxed" style={mutedText}>
                  The trust section now points to a public review source, keeping
                  the sales page credible and easy to defend.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border" style={panelStyle}>
              <Image
                src="/portfolio/hernandez/sergio-landscaping-marketing-clean.png"
                alt="Clean marketing visual for landscaping and snow removal outreach"
                width={1080}
                height={1080}
                loading="eager"
                className="aspect-square w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold">
                  Clean outreach collateral
                </h2>
                <p className="mt-2 text-sm leading-relaxed" style={mutedText}>
                  The share image is built with clean rendered text, avoiding
                  distorted lettering when it is sent through Messenger or social
                  DMs.
                </p>
              </div>
            </div>
          </section>

          <section className="pb-12">
            <div
              className="rounded-3xl border p-6 md:p-8"
              style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-accent-soft)" }}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="dtz-section-label">Next step</p>
                  <h2 className="mt-3 text-2xl font-bold">
                    Want something like this for your local business?
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={mutedText}>
                    Use the services-facing contact flow for formal scoping,
                    project questions, and local-business delivery.
                  </p>
                </div>
                <a
                  href={`${businessSiteUrl}/contact`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-transform hover:scale-[1.01]"
                  style={primaryCtaStyle}
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </ThemeShell>
  );
}

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

export const metadata: Metadata = {
  title: "Portfolio | David Ortiz",
  description:
    "Portfolio proof for David Ortiz, including the Hernandez Landscape website, sourced review proof, and local-business quote flow.",
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

const proofChain = [
  {
    title: "Direct landscaping proof",
    description:
      "The live Hernandez site is the first link when a contractor wants to inspect same-industry work.",
    href: "https://hernandezlandscapeservices.com",
    icon: MapPin,
  },
  {
    title: "High Encode work index",
    description:
      "Use this when the prospect should see the broader local-business proof page.",
    href: `${businessSiteUrl}/work`,
    icon: ExternalLink,
  },
  {
    title: "Full case note",
    description:
      "Shows the thinking behind bilingual copy, service proof, trust signals, and quote capture.",
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
    title: "Sourced review proof",
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
    title: "Cleaner proof chain",
    description:
      "This page, High Encode Work, and the case note now point to the same current live proof.",
    icon: Quote,
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#060a14] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:border-white/25 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <a
            href="mailto:hello@highencodelearning.com"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#ff6b6b]/10"
          >
            <Mail className="h-4 w-4" />
            Contact David
          </a>
        </nav>

        <section className="grid gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2dd4bf]">
              Portfolio
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Real local-business work, starting with Hernandez Landscape
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
              This page gives prospects a direct proof point. Hernandez
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
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7ac943] to-[#2dd4bf] px-6 py-3 font-semibold text-[#06140e] transition-transform hover:scale-[1.01]"
              >
                View live Hernandez site
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={`${businessSiteUrl}/projects/hernandez-landscape-local-business-site`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3 font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white"
              >
                Read case note
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/8 bg-[#08101e]/80 p-4 shadow-2xl shadow-black/30">
            <Image
              src="/portfolio/hernandez/site-screenshot.png"
              alt="Screenshot of the Hernandez Landscape website"
              width={1440}
              height={1000}
              className="h-auto w-full rounded-2xl border border-white/10"
              priority
            />
          </div>
        </section>

        <section className="grid gap-4 pb-10 md:grid-cols-3">
          {liveProofUpdates.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-3xl border border-white/8 bg-white/[0.035] p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2dd4bf]/10 text-[#2dd4bf]">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {item.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b8f28e]">
              What the example shows
            </p>
            <div className="mt-6 space-y-4">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#7ac943]" />
                  <p className="text-sm leading-relaxed text-white/65">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {packageExamples.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/8 bg-white/[0.03] p-6"
              >
                <h2 className="text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-white/8 bg-[#08101e]/80 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2dd4bf]">
              Proof chain
            </p>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              The right link depends on what the prospect needs to believe.
            </h2>
            <div className="mt-6 grid gap-4">
              {proofChain.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4 transition-colors hover:border-[#2dd4bf]/40 hover:bg-white/[0.06]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#2dd4bf]/10 text-[#2dd4bf]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="flex items-center gap-2 text-sm font-semibold text-white">
                        {item.title}
                        <ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-white/50">
                        {item.description}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b8f28e]">
              Build signals
            </p>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Concrete stack, not placeholder labels.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Clients do not need the whole implementation story, but they
              should see that the site was built with real production pieces and
              not just a static mockup.
            </p>
            <div className="mt-6 grid gap-3">
              {stackSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-[#0b1424]/75 px-4 py-3"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#7ac943]" />
                  <span className="text-sm text-white/65">{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-16 lg:grid-cols-3">
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03]">
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
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                The site uses real work photos instead of generic stock imagery,
                so prospects can inspect the type of landscaping work the
                business actually performs.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03]">
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
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                The testimonial proof now points to a public review source,
                keeping the sales page credible and easy to defend.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03]">
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
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                The share image is built with clean rendered text, avoiding
                distorted lettering when it is sent through Messenger or social
                DMs.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-12">
          <div className="rounded-3xl border border-[#2dd4bf]/20 bg-[#2dd4bf]/10 p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9ae6db]">
                  Next step
                </p>
                <h2 className="mt-3 text-2xl font-bold">
                  Want this proof turned into a local-business project?
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
                  Use High Encode Learning for formal scoping, project
                  questions, and local-business delivery.
                </p>
              </div>
              <a
                href={`${businessSiteUrl}/contact`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2dd4bf] to-[#22d3ee] px-6 py-3 font-semibold text-[#06140e] transition-transform hover:scale-[1.01]"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

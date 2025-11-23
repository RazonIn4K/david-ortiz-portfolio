import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Keap to GoHighLevel Migration | David Ortiz',
  description: 'How we migrated a membership entrepreneur from Keap to GoHighLevel, rebuilding campaigns, cleaning up tags, and establishing streamlined automations for monthly launches.'
};

const challenges = [
  {
    title: 'Platform Split',
    description: 'Business operations fragmented across Keap, separate email tools, and manual spreadsheets. No single source of truth for contacts or campaigns.'
  },
  {
    title: 'Multiple Pricing Tiers',
    description: 'Three membership levels with different access rights, billing cycles, and communication flows—all requiring precise segmentation.'
  },
  {
    title: 'Monthly Launches',
    description: 'Recurring enrollment windows demanded repeatable campaigns, but legacy workflows were copy-pasted and prone to errors.'
  },
  {
    title: 'Tag Chaos',
    description: 'Years of accumulated tags with inconsistent naming, duplicates, and orphaned entries made segmentation unreliable.'
  },
  {
    title: 'Outdated Automations',
    description: 'Legacy sequences referenced old products, broken links, and contacts who had long since churned.'
  }
];

const solutions = [
  {
    title: 'Campaign Rebuilds',
    description: 'Rebuilt all critical campaigns from scratch in GoHighLevel—welcome sequences, launch funnels, re-engagement flows, and win-back automations.',
    details: [
      'Mapped existing Keap campaigns to GHL workflow builder',
      'Implemented conditional branching based on membership tier',
      'Added engagement triggers for opens, clicks, and replies',
      'Created reusable campaign templates for monthly launches'
    ]
  },
  {
    title: 'Tagging Cleanup & Taxonomy',
    description: 'Audited 400+ tags, consolidated duplicates, and established a clear naming convention for sustainable growth.',
    details: [
      'Categorized tags: source, interest, tier, engagement, lifecycle',
      'Merged duplicate and near-duplicate tags',
      'Removed orphaned tags with zero contacts',
      'Documented taxonomy for team onboarding'
    ]
  },
  {
    title: 'Smart Lists & Segmentation',
    description: 'Rebuilt smart lists with proper filter logic so the right message hits the right audience every time.',
    details: [
      'Active members by tier (Starter, Pro, Elite)',
      'Launch prospects vs. existing customers',
      'Engagement-based segments (hot, warm, cold)',
      'Churn-risk and win-back cohorts'
    ]
  },
  {
    title: 'Newsletter Migration',
    description: 'Transferred newsletter templates, rebuilt email sequences, and improved deliverability with proper domain authentication.',
    details: [
      'Migrated 50+ email templates with brand consistency',
      'Set up DKIM, SPF, and DMARC for new sending domain',
      'Implemented engagement-based sending for list hygiene',
      'Created modular template blocks for faster content creation'
    ]
  },
  {
    title: 'Social Automations',
    description: 'Connected GoHighLevel social planner to automate content distribution across channels.',
    details: [
      'Linked Facebook, Instagram, and LinkedIn accounts',
      'Built content calendar with recurring post templates',
      'Automated launch announcements across all platforms',
      'Set up social DM triggers for lead capture'
    ]
  }
];

const results = [
  { metric: '1 Platform', label: 'Unified operations' },
  { metric: '60%', label: 'Fewer tags (400 → 160)' },
  { metric: '4 hrs', label: 'Launch prep (was 2 days)' },
  { metric: '15%', label: 'Higher open rates' },
  { metric: '0', label: 'Missed automations' }
];

const timeline = [
  { phase: 'Discovery & Audit', duration: 'Week 1', description: 'Full audit of Keap setup, tagging, campaigns, and integrations. Mapped migration plan.' },
  { phase: 'Tag Cleanup & Export', duration: 'Week 2', description: 'Consolidated tags, exported clean contact list with proper field mapping.' },
  { phase: 'GHL Setup & Campaigns', duration: 'Weeks 3-4', description: 'Built workflows, pipelines, smart lists, and email templates in GoHighLevel.' },
  { phase: 'Testing & Launch', duration: 'Week 5', description: 'End-to-end testing, soft launch to small segment, full cutover.' },
  { phase: 'Optimization', duration: 'Week 6+', description: 'Monitored deliverability, refined segments, handed off documentation.' }
];

export default function KeapGHLMigrationPage() {
  return (
    <div className="bg-ink text-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-ink to-slate py-24 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/case-studies" className="text-sm text-white/60 hover:text-white/80 transition">
            ← Back to Case Studies
          </Link>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/60">Case Study</p>
          <h1 className="mt-3 text-4xl font-semibold">
            Keap → GoHighLevel Migration for{' '}
            <span className="bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent">
              Membership Entrepreneur
            </span>
          </h1>
          <p className="mt-4 text-lg text-white/80">
            A holistic platform migration that unified operations, cleaned up years of technical debt,
            and established scalable automations for monthly membership launches.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['GoHighLevel', 'Keap', 'Email Marketing', 'CRM Migration', 'Automation'].map((tag) => (
              <span key={tag} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/60">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold text-white">The Client</h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            A membership entrepreneur running a thriving online education business with three pricing tiers,
            monthly enrollment windows, and an engaged community. After years on Keap, the platform had become
            a patchwork of workarounds, outdated campaigns, and a tagging system that made segmentation nearly impossible.
          </p>
          <p className="mt-4 text-white/80 leading-relaxed">
            The goal: migrate to GoHighLevel without disrupting active campaigns, preserve years of contact history,
            and establish a clean foundation for the next phase of growth.
          </p>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-16 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold text-white">Challenges</h2>
          <p className="mt-2 text-white/60">What we were up against</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {challenges.map((challenge) => (
              <div key={challenge.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-semibold text-teal-400">{challenge.title}</h3>
                <p className="mt-2 text-sm text-white/70">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold text-white">Solutions</h2>
          <p className="mt-2 text-white/60">How we solved each challenge</p>
          <div className="mt-8 space-y-8">
            {solutions.map((solution, index) => (
              <div key={solution.title} className="rounded-xl border border-white/10 bg-white/5 p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-sm font-semibold text-teal-400">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{solution.title}</h3>
                    <p className="mt-2 text-white/80">{solution.description}</p>
                    <ul className="mt-4 space-y-2">
                      {solution.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach - Communication Focus */}
      <section className="py-16 border-b border-white/10 bg-gradient-to-b from-slate/50 to-ink">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold text-white">Our Approach</h2>
          <p className="mt-2 text-white/60">Holistic strategy meets constant communication</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-teal-400/30 bg-teal-400/5 p-6">
              <h3 className="font-semibold text-teal-400">Holistic Strategy</h3>
              <p className="mt-2 text-sm text-white/70">
                We didn&apos;t just move data—we rethought the entire marketing stack. Every campaign, tag,
                and automation was evaluated against current business goals, not legacy decisions.
              </p>
            </div>
            <div className="rounded-xl border border-teal-400/30 bg-teal-400/5 p-6">
              <h3 className="font-semibold text-teal-400">Constant Communication</h3>
              <p className="mt-2 text-sm text-white/70">
                Weekly Loom updates, shared Notion workspace, and Slack channel for async questions.
                The client always knew exactly where we were in the migration.
              </p>
            </div>
            <div className="rounded-xl border border-teal-400/30 bg-teal-400/5 p-6">
              <h3 className="font-semibold text-teal-400">Zero-Downtime Migration</h3>
              <p className="mt-2 text-sm text-white/70">
                Ran both systems in parallel during transition. Active sequences completed in Keap
                while new enrollments entered GHL workflows.
              </p>
            </div>
            <div className="rounded-xl border border-teal-400/30 bg-teal-400/5 p-6">
              <h3 className="font-semibold text-teal-400">Documentation & Training</h3>
              <p className="mt-2 text-sm text-white/70">
                Delivered comprehensive SOPs, video walkthroughs, and a 1-on-1 training session
                so the team could confidently manage the new system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold text-white">Timeline</h2>
          <p className="mt-2 text-white/60">From audit to handoff</p>
          <div className="mt-8 relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2" />
            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div key={phase.phase} className={`relative flex flex-col md:flex-row gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-teal-400 border-2 border-ink" />
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <p className="text-xs font-semibold text-teal-400">{phase.duration}</p>
                    <h3 className="mt-1 font-semibold text-white">{phase.phase}</h3>
                    <p className="mt-1 text-sm text-white/70">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold text-white">Results</h2>
          <p className="mt-2 text-white/60">Measurable impact</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {results.map((result) => (
              <div key={result.label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-2xl font-bold text-teal-400">{result.metric}</p>
                <p className="mt-1 text-xs text-white/60">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Placeholder */}
      <section className="py-16 border-b border-white/10 bg-gradient-to-b from-slate/50 to-ink">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="text-lg italic text-white/80 leading-relaxed">
              &ldquo;David didn&apos;t just migrate our data—he rebuilt our entire marketing infrastructure.
              The tagging cleanup alone saved us hours every launch. Communication was exceptional;
              I always knew exactly where we stood. Our monthly launches now take a fraction of the time,
              and everything just works.&rdquo;
            </p>
            <div className="mt-6">
              <p className="font-semibold text-white">[Client Name]</p>
              <p className="text-sm text-white/60">[Title] · [Company]</p>
            </div>
            <p className="mt-4 text-xs text-white/40">Testimonial pending client approval</p>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-16 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold text-white">Key Takeaways</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold text-white">Platform migrations are strategy projects</h3>
              <p className="mt-2 text-sm text-white/70">
                Moving data is the easy part. The real value is in rethinking workflows
                and building for where the business is headed.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold text-white">Clean data compounds</h3>
              <p className="mt-2 text-sm text-white/70">
                A proper tagging taxonomy and segmentation strategy pays dividends
                on every campaign, forever.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold text-white">Communication prevents disasters</h3>
              <p className="mt-2 text-sm text-white/70">
                Weekly updates and async access meant no surprises.
                The client could focus on running their business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-semibold text-white">
            Planning a platform migration?
          </h2>
          <p className="mt-4 text-white/70">
            Let&apos;s talk about your current setup and map out a clean transition.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/davidinfosec07"
              target="_blank"
              className="rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-400 transition"
            >
              Book a discovery call
            </a>
            <Link
              href="/case-studies"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5 hover:border-white/40 transition"
            >
              View more case studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { UPWORK_URL } from '@/lib/constants';
import { TealGradientText } from '@/components/ui/TealGradientText';
import { ProofMetrics } from '@/components/ProofMetrics';
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';

export function Hero() {
  return (
    <section className="bg-navy py-20 text-white lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 lg:flex-row lg:items-center lg:gap-16">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
            Ship <TealGradientText>AI automations</TealGradientText> that{' '}
            <TealGradientText>save hours</TealGradientText> without adding headcount
          </h1>

          <p className="mt-6 text-lg text-white/70 lg:text-xl">
            Build with <strong className="text-white/90">Typeform</strong>, <strong className="text-white/90">Zapier</strong>, <strong className="text-white/90">Notion</strong>, <strong className="text-white/90">GPT-4o</strong> — plus scraping pipelines and AI security guardrails to keep your automations safe at scale.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="https://calendly.com/davidinfosec07"
              target="_blank"
              className="rounded-lg bg-teal-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/30"
            >
              Book discovery call
            </Link>
            <Link
              href={UPWORK_URL}
              target="_blank"
              className="rounded-lg border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-teal-400 hover:bg-white/5"
            >
              View Upwork offers
            </Link>
          </div>

          {/* Proof Metrics Badges */}
          <div className="mt-10">
            <ProofMetrics />
          </div>
        </div>

        {/* Right Side - Dashboard Mockup with Glass Morphism */}
        <div className="flex-1">
          <GlassmorphismCard className="p-6 backdrop-blur-md">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              <span className="ml-2 text-xs text-white/60">Automation Dashboard</span>
            </div>

            {/* Dashboard Content */}
            <div className="space-y-4">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-gradient-to-br from-teal-500/20 to-transparent p-4">
                  <div className="text-2xl font-bold text-teal-400">120</div>
                  <div className="text-xs text-white/60">Leads/Week</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-gradient-to-br from-cyan-400/20 to-transparent p-4">
                  <div className="text-2xl font-bold text-cyan-400">5m</div>
                  <div className="text-xs text-white/60">Response Time</div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Recent Activity</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-white/80">Lead scored & routed</span>
                    <span className="ml-auto text-xs text-white/50">2m ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-teal-400"></div>
                    <span className="text-white/80">GPT summary sent</span>
                    <span className="ml-auto text-xs text-white/50">8m ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                    <span className="text-white/80">Notion task created</span>
                    <span className="ml-auto text-xs text-white/50">12m ago</span>
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="rounded-lg border border-white/10 bg-gradient-to-r from-teal-500/10 to-cyan-400/10 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">All systems operational</span>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassmorphismCard>
        </div>
      </div>
    </section>
  );
}

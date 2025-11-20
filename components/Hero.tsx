import Link from 'next/link';
import { UPWORK_URL } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-20 text-white lg:pt-48 lg:pb-32">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
         <div className="absolute top-20 left-20 w-72 h-72 bg-teal/20 rounded-full blur-[100px]" />
         <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 lg:flex-row lg:items-start">
        <div className="flex-1 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-teal backdrop-blur-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
            </span>
            Available for new projects
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Ship <span className="bg-gradient-to-r from-teal to-cyan-300 bg-clip-text text-transparent">AI automations</span> that <span className="bg-gradient-to-r from-teal to-cyan-300 bg-clip-text text-transparent">save hours</span> without adding headcount.
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto lg:mx-0">
            I build Typeform → Zapier → Notion systems, GPT-4o chatbots, scraping pipelines, and AI security guardrails so founders and agencies can scale calmly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="https://calendly.com/davidinfosec07"
              target="_blank"
              className="rounded-full bg-teal px-8 py-4 text-sm font-bold text-ink transition hover:bg-teal/90 hover:-translate-y-0.5 shadow-[0_0_20px_rgba(20,184,166,0.3)]"
            >
              Book a discovery call
            </Link>
            <Link
              href="#services"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              View Offers
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/50">
            Trusted by forward-thinking teams at FleetShield, SignalBridge, and more.
          </p>
        </div>

        {/* Visual Dashboard Mockup */}
        <div className="flex-1 w-full max-w-lg lg:max-w-xl z-10 relative">
          <div className="relative rounded-2xl border border-white/10 bg-slate/30 backdrop-blur-xl p-6 shadow-2xl">
             {/* Mockup Header */}
             <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="h-2 w-20 rounded-full bg-white/10" />
             </div>

             {/* Mockup Content - Stats Row */}
             <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                   <p className="text-xs text-white/50 mb-1">Hours Saved</p>
                   <p className="text-2xl font-bold text-teal">128h</p>
                   <p className="text-[10px] text-teal/80 flex items-center gap-1 mt-1">
                     <span className="inline-block rotate-180">↓</span> 12% vs last week
                   </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                   <p className="text-xs text-white/50 mb-1">Active Workflows</p>
                   <p className="text-2xl font-bold text-white">24</p>
                   <p className="text-[10px] text-green-400/80 flex items-center gap-1 mt-1">
                     <span>●</span> All systems operational
                   </p>
                </div>
             </div>

             {/* Mockup Content - Recent Activity */}
             <div className="space-y-3">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Live Activity</p>

                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/20 text-teal text-xs">⚡</div>
                   <div className="flex-1">
                      <p className="text-xs font-medium text-white">New Lead Qualified</p>
                      <p className="text-[10px] text-white/40">Typeform → OpenAI → Slack</p>
                   </div>
                   <p className="text-[10px] text-white/40">Just now</p>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xs">🤖</div>
                   <div className="flex-1">
                      <p className="text-xs font-medium text-white">Support Ticket Resolved</p>
                      <p className="text-[10px] text-white/40">Chatbot → Knowledge Base</p>
                   </div>
                   <p className="text-[10px] text-white/40">2m ago</p>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs">📄</div>
                   <div className="flex-1">
                      <p className="text-xs font-medium text-white">Contract Generated</p>
                      <p className="text-[10px] text-white/40">DocuSign → Google Drive</p>
                   </div>
                   <p className="text-[10px] text-white/40">15m ago</p>
                </div>
             </div>

             {/* Glass Reflection Overlay */}
             <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>

          {/* Decorative Elements behind mockup */}
          <div className="absolute -z-10 -right-10 -bottom-10 h-64 w-64 rounded-full bg-teal/20 blur-[80px]" />
        </div>
      </div>
    </section>
  );
}

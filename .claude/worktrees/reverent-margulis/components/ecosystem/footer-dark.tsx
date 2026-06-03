import { AutomationIcon, ChatbotIcon, SecurityIcon, VideoIcon } from "./service-icons"

export function FooterDark() {
  return (
    <footer className="bg-[#050810] border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2dd4bf] to-[#14b8a6] flex items-center justify-center">
                <span className="text-[#0c1222] font-bold text-sm">DO</span>
              </div>
              <span className="text-[#e2e8f0] font-semibold">David Ortiz</span>
            </div>
            <p className="text-[#64748b] text-sm leading-relaxed mb-4">
              AI automation consultant helping lean teams ship intelligent workflows without adding headcount.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#475569]">
              <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse"></span>
              Available for projects
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3">
              {[
                { icon: AutomationIcon, label: "AI Automation Agents", href: "/services#automation" },
                { icon: ChatbotIcon, label: "Custom RAG Chatbots", href: "/services#chatbots" },
                { icon: SecurityIcon, label: "SaaS Security Audits", href: "/services#security" },
                { icon: VideoIcon, label: "AI Video & UGC", href: "/services#video" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-[#94a3b8] hover:text-[#2dd4bf] transition-colors text-sm group"
                  >
                    <item.icon className="w-4 h-4 text-[#475569] group-hover:text-[#2dd4bf] transition-colors" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem Column */}
          <div>
            <h4 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-4">Ecosystem</h4>
            <ul className="space-y-3">
              {[
                { label: "High Encode Learning", href: "https://highencodelearning.com", desc: "Education" },
                { label: "CSBrainAI", href: "https://csbrain.ai", desc: "AI Assistant" },
                { label: "Prompt Defenders", href: "https://prompt-defenders.com", desc: "Security" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between text-[#94a3b8] hover:text-[#2dd4bf] transition-colors text-sm group"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#475569] group-hover:text-[#2dd4bf]/70">{item.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: "Case Studies", href: "/case-studies" },
                { label: "Work With Me", href: "/work-with-me" },
                { label: "Blog", href: "https://highencodelearning.com/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-[#94a3b8] hover:text-[#2dd4bf] transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#1e293b] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#475569] text-xs">© {new Date().getFullYear()} David Ortiz. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-[#475569]">
            <a href="/privacy" className="hover:text-[#94a3b8] transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-[#94a3b8] transition-colors">
              Terms
            </a>
            <span>Atlanta, GA</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

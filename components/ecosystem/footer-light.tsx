import { CurriculumIcon, LabIcon, AICopilotIcon } from "./service-icons"

export function FooterLight() {
  return (
    <footer className="bg-white border-t border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#111827] font-bold text-lg">High Encode Learning</span>
            </div>
            <p className="text-[#6b7280] text-sm leading-relaxed mb-4">
              Accelerate your CS & Cybersecurity learning with structured curriculum, real-world labs, and AI tools.
            </p>
            <a
              href="/programs"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3b82f6] hover:text-[#2563eb] transition-colors"
            >
              View Programs
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Programs Column */}
          <div>
            <h4 className="text-[#111827] text-xs font-semibold uppercase tracking-wider mb-4">Programs</h4>
            <ul className="space-y-3">
              {[
                { icon: CurriculumIcon, label: "Starter Program", href: "/programs#starter" },
                { icon: LabIcon, label: "Pro Cohort", href: "/programs#pro" },
                { icon: AICopilotIcon, label: "Team Training", href: "/programs#team" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-[#6b7280] hover:text-[#3b82f6] transition-colors text-sm group"
                  >
                    <item.icon className="w-4 h-4 text-[#9ca3af] group-hover:text-[#3b82f6] transition-colors" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Column */}
          <div>
            <h4 className="text-[#111827] text-xs font-semibold uppercase tracking-wider mb-4">AI Tools</h4>
            <ul className="space-y-3">
              {[
                { label: "CSBrainAI", href: "https://csbrain.ai", desc: "Learning Assistant" },
                { label: "Prompt Defenders", href: "https://prompt-defenders.com", desc: "Security Testing" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between text-[#6b7280] hover:text-[#3b82f6] transition-colors text-sm group"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#9ca3af] group-hover:text-[#3b82f6]/70">{item.desc}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-[#111827] text-xs font-semibold uppercase tracking-wider mt-8 mb-4">Consulting</h4>
            <a href="https://cs-learning.me" className="text-[#6b7280] hover:text-[#3b82f6] transition-colors text-sm">
              cs-learning.me →
            </a>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-[#111827] text-xs font-semibold uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Newsletter", href: "/newsletter" },
                { label: "Contact", href: "/contact" },
                { label: "Apply Now", href: "/apply" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-[#6b7280] hover:text-[#3b82f6] transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#e5e7eb] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9ca3af] text-xs">
            © {new Date().getFullYear()} High Encode Learning. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#9ca3af]">
            <a href="/privacy" className="hover:text-[#6b7280] transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-[#6b7280] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { CurriculumIcon, LabIcon, AICopilotIcon } from "./service-icons"
import { footerEcosystemLinks, footerPrimaryLinks } from "@/lib/contact-links"

export function FooterLight() {
  return (
    <footer className="bg-white border-t border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#111827] font-bold text-lg">David Ortiz Personal Site</span>
            </div>
            <p className="text-[#6b7280] text-sm leading-relaxed mb-4">
              Personal notes, experiments, and systems thinking across browsers, APIs, automation, and delivery.
            </p>
            <a
              href="/#focus"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3b82f6] hover:text-[#2563eb] transition-colors"
            >
              View current focus
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Themes Column */}
          <div>
            <h4 className="text-[#111827] text-xs font-semibold uppercase tracking-wider mb-4">Themes</h4>
            <ul className="space-y-3">
              {[
                { icon: CurriculumIcon, label: "Abstraction Layers", href: "/#learning" },
                { icon: LabIcon, label: "Browser + Runtime", href: "/#focus" },
                { icon: AICopilotIcon, label: "AI Systems", href: "/#learning" },
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

          {/* Business Column */}
          <div>
            <h4 className="text-[#111827] text-xs font-semibold uppercase tracking-wider mb-4">High Encode Learning</h4>
            <ul className="space-y-3">
              {footerEcosystemLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between text-[#6b7280] hover:text-[#3b82f6] transition-colors text-sm group"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#9ca3af] group-hover:text-[#3b82f6]/70">{item.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-[#111827] text-xs font-semibold uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-3">
              {footerPrimaryLinks.map((item) => (
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
            © {new Date().getFullYear()} David Ortiz. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#9ca3af]">
            <a href="https://highencodelearning.com/privacy" className="hover:text-[#6b7280] transition-colors">
              Business Privacy
            </a>
            <a href="https://highencodelearning.com/terms" className="hover:text-[#6b7280] transition-colors">
              Business Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

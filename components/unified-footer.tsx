import { AutomationIcon, BookIcon, ShieldIcon, ToolsIcon, ExternalLinkIcon } from "./icons/ecosystem-icons"

const footerSections = {
  consulting: {
    title: "Consulting",
    links: [
      { name: "AI Automation", href: "https://cs-learning.me/work-with-me#automation" },
      { name: "RAG Chatbots", href: "https://cs-learning.me/work-with-me#chatbots" },
      { name: "Security Audits", href: "https://cs-learning.me/work-with-me#security" },
      { name: "Case Studies", href: "https://cs-learning.me/case-studies" },
    ],
  },
  learning: {
    title: "Learning",
    links: [
      { name: "Starter Program", href: "https://highencodelearning.com/programs#starter" },
      { name: "Pro Cohort", href: "https://highencodelearning.com/programs#pro" },
      { name: "Team Training", href: "https://highencodelearning.com/programs#team" },
      { name: "Articles", href: "https://highencodelearning.com/articles" },
    ],
  },
  tools: {
    title: "Tools",
    links: [
      { name: "CSBrainAI", href: "https://csbrain.ai", external: true },
      { name: "Prompt Defenders", href: "https://prompt-defenders.com", external: true },
    ],
  },
  connect: {
    title: "Connect",
    links: [
      { name: "LinkedIn", href: "https://linkedin.com/in/davidortiz", external: true },
      { name: "Twitter/X", href: "https://twitter.com/davidortiz", external: true },
      { name: "GitHub", href: "https://github.com/davidortiz", external: true },
      { name: "Contact", href: "https://cs-learning.me/work-with-me" },
    ],
  },
}

interface UnifiedFooterProps {
  variant?: "light" | "dark"
}

export function UnifiedFooter({ variant = "dark" }: UnifiedFooterProps) {
  const bgClass = variant === "dark" ? "bg-slate-950 text-slate-200" : "bg-slate-100 text-slate-800"
  const mutedClass = variant === "dark" ? "text-slate-400" : "text-slate-500"
  const borderClass = variant === "dark" ? "border-slate-800" : "border-slate-200"
  const hoverClass = variant === "dark" ? "hover:text-sky-400" : "hover:text-sky-600"

  return (
    <footer className={`${bgClass} border-t ${borderClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Consulting */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AutomationIcon className="h-5 w-5 text-sky-500" />
              <h3 className="font-semibold">{footerSections.consulting.title}</h3>
            </div>
            <ul className="space-y-2">
              {footerSections.consulting.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={`text-sm ${mutedClass} ${hoverClass} transition-colors`}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookIcon className="h-5 w-5 text-teal-500" />
              <h3 className="font-semibold">{footerSections.learning.title}</h3>
            </div>
            <ul className="space-y-2">
              {footerSections.learning.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={`text-sm ${mutedClass} ${hoverClass} transition-colors`}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ToolsIcon className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold">{footerSections.tools.title}</h3>
            </div>
            <ul className="space-y-2">
              {footerSections.tools.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-sm ${mutedClass} ${hoverClass} transition-colors`}
                  >
                    {link.name}
                    <ExternalLinkIcon className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldIcon className="h-5 w-5 text-emerald-500" />
              <h3 className="font-semibold">{footerSections.connect.title}</h3>
            </div>
            <ul className="space-y-2">
              {footerSections.connect.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center gap-1 text-sm ${mutedClass} ${hoverClass} transition-colors`}
                  >
                    {link.name}
                    {link.external && <ExternalLinkIcon className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-12 pt-8 border-t ${borderClass}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DO</span>
              </div>
              <div>
                <p className="font-semibold">David Ortiz</p>
                <p className={`text-xs ${mutedClass}`}>AI Automation & Education</p>
              </div>
            </div>

            {/* Trust signals */}
            <div className={`flex items-center gap-4 text-xs ${mutedClass}`}>
              <span>Based in Illinois, USA</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Est. 2023</span>
            </div>

            {/* Copyright */}
            <p className={`text-sm ${mutedClass}`}>© {new Date().getFullYear()} David Ortiz. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

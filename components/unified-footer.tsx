import { AutomationIcon, BookIcon, ShieldIcon, ToolsIcon, ExternalLinkIcon } from "./icons/ecosystem-icons"

const footerSections = {
  notebook: {
    title: "Personal Site",
    links: [
      { name: "Focus", href: "https://davidtiz.com/#focus" },
      { name: "Learning", href: "https://davidtiz.com/#learning" },
      { name: "Design System", href: "https://davidtiz.com/design-system" },
      { name: "Projects", href: "https://davidtiz.com/projects" },
    ],
  },
  business: {
    title: "High Encode Learning",
    links: [
      { name: "Services", href: "https://highencodelearning.com/services" },
      { name: "Learning Notes", href: "https://highencodelearning.com/learning" },
      { name: "Demos", href: "https://highencodelearning.com/demos" },
      { name: "Contact", href: "https://highencodelearning.com/contact" },
    ],
  },
  tools: {
    title: "Tools",
    links: [
      { name: "CSBrainAI", href: "https://csbrain.ai", external: true },
      { name: "Prompt Defenders", href: "https://prompt-defenders.vercel.app", external: true },
    ],
  },
  connect: {
    title: "Connect",
    links: [
      { name: "Email", href: "mailto:hello@highencodelearning.com", external: false },
      { name: "Calendly", href: "https://calendly.com/davidinfosec07", external: true },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/david-ortiz-210190205/", external: true },
      { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61581646236939", external: true },
      { name: "Instagram", href: "https://www.instagram.com/ra.z.on", external: true },
      { name: "Upwork", href: "https://www.upwork.com/freelancers/davido174", external: true },
      { name: "Fiverr", href: "https://www.fiverr.com/razonnet", external: true },
      { name: "GitHub", href: "https://github.com/RazonIn4K", external: true },
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
          {/* Personal site */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookIcon className="h-5 w-5 text-sky-500" />
              <h3 className="font-semibold">{footerSections.notebook.title}</h3>
            </div>
            <ul className="space-y-2">
              {footerSections.notebook.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={`text-sm ${mutedClass} ${hoverClass} transition-colors`}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AutomationIcon className="h-5 w-5 text-teal-500" />
              <h3 className="font-semibold">{footerSections.business.title}</h3>
            </div>
            <ul className="space-y-2">
              {footerSections.business.links.map((link) => (
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
                <p className={`text-xs ${mutedClass}`}>Personal notes + systems learning</p>
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

import { ArrowRight } from "lucide-react"

interface CrossSiteCtaProps {
  variant: "to-consulting" | "to-learning"
  context?: string
}

export function CrossSiteCta({ variant, context }: CrossSiteCtaProps) {
  if (variant === "to-consulting") {
    // Show on highencodelearning.com articles/pages
    return (
      <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-6 my-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[#0c4a6e] font-semibold text-sm mb-1">Need this built for your team?</p>
            <p className="text-[#0369a1] text-sm">
              {context || "I help companies implement these systems. Let's talk."}
            </p>
          </div>
          <a
            href="https://cs-learning.me/work-with-me"
            className="inline-flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
          >
            Work With Me
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    )
  }

  // Show on cs-learning.me case studies/pages - matches dark theme
  return (
    <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-[#e2e8f0] font-semibold text-sm mb-1">Want to learn how this works?</p>
          <p className="text-[#94a3b8] text-sm">
            {context || "Master the fundamentals through our structured programs."}
          </p>
        </div>
        <a
          href="https://highencodelearning.com/programs"
          className="inline-flex items-center gap-2 bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#0c1222] px-5 py-2.5 rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
        >
          View Programs
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

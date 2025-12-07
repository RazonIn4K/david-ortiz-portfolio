import { Zap, Rocket, CheckCircle } from "lucide-react"

export function StatsBadges() {
  const badges = [
    { icon: Zap, label: "Avg 20+ Hours Saved/Week", color: "#fbbf24" },
    { icon: Rocket, label: "80% Faster Response Times", color: "#f87171" },
    { icon: CheckCircle, label: "Zero-Touch Lead Verification", color: "#4ade80" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, i) => (
        <div
          key={i}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${badge.color}15`,
            color: badge.color,
            border: `1px solid ${badge.color}30`,
          }}
        >
          <badge.icon className="w-3.5 h-3.5" />
          {badge.label}
        </div>
      ))}
    </div>
  )
}

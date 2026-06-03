"use client"

import { useEffect, useState } from "react"

export function DashboardWidget() {
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive((prev) => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden shadow-2xl shadow-black/20 w-full max-w-md">
      {/* Window Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e293b]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#f87171]"></div>
          <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
          <div className="w-3 h-3 rounded-full bg-[#4ade80]"></div>
        </div>
        <span className="text-[#64748b] text-xs ml-2">Automation Dashboard</span>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="bg-[#0c1222] rounded-lg p-4">
          <div className="text-[#2dd4bf] text-2xl font-bold">120</div>
          <div className="text-[#64748b] text-xs">Leads/Week</div>
        </div>
        <div className="bg-[#0c1222] rounded-lg p-4">
          <div className="text-[#2dd4bf] text-2xl font-bold">5m</div>
          <div className="text-[#64748b] text-xs">Response Time</div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="px-4 pb-4">
        <div className="text-[#64748b] text-[10px] uppercase tracking-wider mb-2">Recent Activity</div>
        <div className="space-y-2">
          {[
            { label: "Lead scored & routed", time: "2m ago", color: "#4ade80" },
            { label: "GPT summary sent", time: "8m ago", color: "#fbbf24" },
            { label: "Notion task created", time: "12m ago", color: "#3b82f6" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[#94a3b8]">{item.label}</span>
              </div>
              <span className="text-[#475569]">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#0c1222] px-4 py-2 flex items-center justify-between">
        <span className="text-[#64748b] text-xs">All systems operational</span>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${isLive ? "bg-[#4ade80] animate-pulse" : "bg-[#475569]"}`}></div>
          <span className={`text-xs ${isLive ? "text-[#4ade80]" : "text-[#475569]"}`}>Live</span>
        </div>
      </div>
    </div>
  )
}

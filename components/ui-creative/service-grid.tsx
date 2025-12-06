"use client"

import { ServicesSection } from "@/components/ServicesSection"

export function ServiceGrid() {
    // Re-use the existing ServicesSection but maybe strip its container if needed.
    // However, ServicesSection has its own layout.
    // Let's create a simple wrapper that renders the existing content or adapt it.
    // The existing ServicesSection has a specific design. To match the new one, we might want to iterate.
    // For now, let's just use the existing one as it provides the content.
  return (
    <div className="rounded-2xl overflow-hidden glass p-4">
       <ServicesSection />
    </div>
  )
}

import type { Metadata } from "next"

import PersonalHomepage from "@/components/personal-homepage"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return <PersonalHomepage />
}

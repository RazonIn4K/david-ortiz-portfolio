import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ThemeShell } from "@/components/theme-shell"
import { getWriteup, getWriteupSlugs } from "@/lib/writeups"
import { WriteupDetailMotion } from "./writeup-detail-motion"

export const dynamicParams = false

export function generateStaticParams() {
  return getWriteupSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const writeup = getWriteup(slug)
  if (!writeup) return { title: "Writeup not found | David Ortiz" }

  return {
    title: `${writeup.title} | CTF Writeup`,
    description: writeup.summary,
    alternates: { canonical: `/writeups/${slug}` },
    openGraph: {
      title: `${writeup.title} | CTF Writeup`,
      description: writeup.summary,
      url: `/writeups/${slug}`,
      type: "article",
    },
  }
}

export default async function WriteupPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const writeup = getWriteup(slug)
  if (!writeup) notFound()

  return (
    <ThemeShell>
      <WriteupDetailMotion writeup={writeup} />
    </ThemeShell>
  )
}

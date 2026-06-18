import fs from "node:fs"
import path from "node:path"

const DIR = path.join(process.cwd(), "content", "writeups")

export type WriteupMeta = {
  slug: string
  title: string
  date: string
  competition: string
  category: string
  difficulty: string
  summary: string
  tags: string[]
}

export type Writeup = WriteupMeta & { content: string }

type FrontmatterValue = string | string[]

function parseFrontmatter(raw: string): {
  data: Record<string, FrontmatterValue>
  content: string
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) return { data: {}, content: raw }

  const [, frontmatter, content] = match
  const data: Record<string, FrontmatterValue> = {}

  for (const line of frontmatter.split(/\r?\n/)) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const rawValue = line.slice(idx + 1).trim()
    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      data[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean)
    } else {
      data[key] = rawValue.replace(/^["']|["']$/g, "")
    }
  }

  return { data, content }
}

function asString(value: FrontmatterValue | undefined, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

export function getWriteupSlugs(): string[] {
  if (!fs.existsSync(DIR)) return []
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
}

export function getWriteup(slug: string): Writeup | null {
  const file = path.join(DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null

  const { data, content } = parseFrontmatter(fs.readFileSync(file, "utf8"))

  return {
    slug,
    title: asString(data.title, slug),
    date: asString(data.date),
    competition: asString(data.competition),
    category: asString(data.category),
    difficulty: asString(data.difficulty),
    summary: asString(data.summary),
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
  }
}

export function getAllWriteups(): WriteupMeta[] {
  return getWriteupSlugs()
    .map((slug) => getWriteup(slug))
    .filter((writeup): writeup is Writeup => writeup !== null)
    .map((writeup) => ({
      slug: writeup.slug,
      title: writeup.title,
      date: writeup.date,
      competition: writeup.competition,
      category: writeup.category,
      difficulty: writeup.difficulty,
      summary: writeup.summary,
      tags: writeup.tags,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

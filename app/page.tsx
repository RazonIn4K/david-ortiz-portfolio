import { HomePage } from "@/components/home-page"
import { getAllWriteups } from "@/lib/writeups"

export default function Page() {
  // The "From the lab" section always shows the three newest writeups, read
  // from content/writeups at build time so the homepage cannot drift.
  const labNotes = getAllWriteups().slice(0, 3)

  return <HomePage labNotes={labNotes} />
}

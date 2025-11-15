import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
        <p>
          Built with Next.js, Tailwind CSS, and a focus on automation-ready performance.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="https://github.com/RazonIn4K" target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
          </Link>
          <Link href="https://www.upwork.com/freelancers/razonin4k" target="_blank" rel="noreferrer" className="hover:text-white">
            Upwork
          </Link>
          <Link href="https://highencodelearning.com" target="_blank" rel="noreferrer" className="hover:text-white">
            High Encode Learning
          </Link>
        </div>
      </div>
    </footer>
  );
}

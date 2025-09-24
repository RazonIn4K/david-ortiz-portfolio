import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-neutral-800/60 bg-neutral-950/60 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/40">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-semibold tracking-tight text-neutral-100">
          David Ortiz
        </Link>
        <nav className="hidden gap-6 text-sm text-neutral-300 sm:flex">
          <Link href="/projects" className="hover:text-white">Projects</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

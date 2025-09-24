export default function Header() {
  return (
    <header className="border-b border-neutral-800/60 bg-neutral-950/60 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/40">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a href="/" className="text-sm font-semibold tracking-tight text-neutral-100">
          David Ortiz
        </a>
        <nav className="hidden gap-6 text-sm text-neutral-300 sm:flex">
          <a href="/" className="hover:text-white">Projects</a>
          <a href="/" className="hover:text-white">About</a>
          <a href="/" className="hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  );
}

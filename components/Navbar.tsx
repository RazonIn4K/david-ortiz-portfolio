'use client';

import Link from 'next/link';
import { useState } from 'react';
import { clsx } from 'clsx';

const navItems = [
  { href: '#services', label: 'AI Services' },
  { href: '#projects', label: 'Projects' },
  { href: '/work-with-me', label: 'Work With Me' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '#contact', label: 'Contact' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          David Ortiz
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-white/80 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <button
            aria-label="Toggle navigation"
            className="rounded border border-white/20 px-3 py-2 text-white"
            onClick={() => setOpen((prev) => !prev)}
          >
            Menu
          </button>
        </div>
      </div>
      <div
        className={clsx(
          'border-t border-white/10 bg-ink/95 px-4 py-4 md:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        <div className="flex flex-col gap-3 text-sm font-medium text-white/80">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

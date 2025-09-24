import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-neutral-300">The page you requested could not be found.</p>
      <Link href="/" className="text-brand-500 hover:underline">Go back home</Link>
    </main>
  );
}

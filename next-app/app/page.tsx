export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <section className="mt-16 text-center">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">David Ortiz — Developer Portfolio</h1>
        <p className="mt-4 text-neutral-300">Next.js App Router scaffold. Tailwind CSS configured. Progressive migration from current static site.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="/"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
          >
            View current site
          </a>
          <a
            href="https://cs-learning.me"
            className="rounded-md border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            cs-learning.me
          </a>
        </div>
      </section>
    </main>
  );
}

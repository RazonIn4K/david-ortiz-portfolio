import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — David Ortiz',
  description: 'Selected projects and case studies',
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="text-neutral-300">
        A curated set of recent work will go here with links and short write-ups.
      </p>
    </main>
  );
}

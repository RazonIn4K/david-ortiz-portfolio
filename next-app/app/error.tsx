'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
      <p className="text-neutral-300">An unexpected error occurred. You can try again.</p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Try again
      </button>
    </main>
  );
}

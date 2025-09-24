export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-800/60 py-8 text-center text-sm text-neutral-400">
      <div className="mx-auto max-w-5xl px-4">
        <p>
          © {new Date().getFullYear()} David Ortiz. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}

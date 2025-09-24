import React from 'react';

type Cta = {
  href: string;
  label: string;
};

type HeroProps = {
  title: string;
  subtitle?: string;
  primary?: Cta;
  secondary?: Cta;
};

export default function Hero({ title, subtitle, primary, secondary }: HeroProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
      <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-neutral-100">{title}</h1>
      {subtitle ? (
        <p className="mt-4 text-neutral-300">{subtitle}</p>
      ) : null}
      {(primary || secondary) && (
        <div className="mt-8 flex items-center justify-center gap-4">
          {primary ? (
            <a
              href={primary.href}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
            >
              {primary.label}
            </a>
          ) : null}
          {secondary ? (
            <a
              href={secondary.href}
              className="rounded-md border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition-colors"
            >
              {secondary.label}
            </a>
          ) : null}
        </div>
      )}
    </section>
  );
}

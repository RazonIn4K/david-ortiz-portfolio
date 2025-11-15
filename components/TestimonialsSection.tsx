import { testimonials } from '@/data/content';

export function TestimonialsSection() {
  return (
    <section className="bg-ink py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Testimonials</p>
          <h2 className="text-3xl font-semibold">Founders &amp; operators on working together</h2>
          <p className="text-sm text-white/60">
            Every quote below ties back to an Upwork or catalog engagement—ask for the matching Project Catalog link when you reach out.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.author} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/80">“{testimonial.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-white">{testimonial.author}</p>
              <p className="text-xs text-white/60">{testimonial.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

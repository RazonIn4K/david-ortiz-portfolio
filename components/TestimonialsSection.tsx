import { testimonials } from '@/data/content';

export function TestimonialsSection() {
  return (
    <section className="bg-navy py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">Testimonials</p>
          <h2 className="text-4xl font-bold lg:text-5xl">What clients say</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
            Every quote below ties back to an Upwork or catalog engagement—ask for the matching Project Catalog link when you reach out.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.author}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <p className="text-sm leading-relaxed text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{testimonial.author}</p>
                <p className="text-xs text-white/60">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

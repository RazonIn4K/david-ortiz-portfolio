import type { Metadata } from "next";
import Link from "next/link";

import { contact } from "@/data/content";
import { paymentLinks } from "@/data/payment-links";

export const metadata: Metadata = {
  title: "Pagos | David Ortiz",
  description: "Enlaces de pago con Stripe para trabajos acordados de paginas web, WhatsApp, Google Business y diseno para negocios locales.",
  robots: {
    index: false,
    follow: false,
  },
};

const cadenceLabel = {
  "one-time": "pago unico",
  monthly: "mensual",
} as const;

export default function PayPage() {
  return (
    <main className="min-h-screen bg-[#fff8ef] px-5 py-10 text-[#241812]">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-[2rem] border border-[#ead9c4] bg-white/85 p-6 shadow-[0_20px_60px_rgba(92,45,16,0.12)] md:p-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#b45309]">Pagos seguros con Stripe</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-[#25150d] md:text-6xl">
            Paga un trabajo ya acordado para tu negocio.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6b584a]">
            Usa estos enlaces solamente despues de hablar conmigo por WhatsApp, Messenger, email o llamada.
            Si no sabes cual escoger, mandame mensaje primero y te digo cual conviene.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8a6d5b]">
            English available. This page is Spanish-first because most local leads are Spanish speakers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/contact/whatsapp?intent=localSite"
              className="rounded-full bg-[#16a34a] px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-900/10"
            >
              Preguntar por WhatsApp
            </a>
            <Link
              href="/demo/pedidos.html"
              className="rounded-full border border-[#d7c3ad] px-5 py-3 text-sm font-black text-[#3f2a1f]"
            >
              Ver demo de pedidos
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {paymentLinks.map((item) => (
            <article key={item.stripePaymentLinkId} className="rounded-[1.5rem] border border-[#ead9c4] bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.03em]">{item.shortName}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#765f50]">{item.description}</p>
                </div>
                <div className="rounded-2xl bg-[#ecfdf5] px-4 py-3 text-right">
                  <p className="text-2xl font-black text-[#166534]">{item.amount}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#15803d]">{cadenceLabel[item.cadence]}</p>
                </div>
              </div>
              <p className="mt-5 rounded-2xl bg-[#fff7ed] p-4 text-sm leading-6 text-[#6b4b35]">
                {item.recommendedUse}
              </p>
              <a
                href={item.url}
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#c2410c] px-5 py-4 text-center text-sm font-black text-white transition hover:bg-[#9a3412]"
              >
                Pagar con Stripe
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-[#ead9c4] bg-white/80 p-5 text-sm leading-7 text-[#6b584a]">
          <p className="font-bold text-[#25150d]">Nota</p>
          <p>
            Los pagos son procesados por Stripe. Guarda tu recibo. Si mandaste un pago por error o cambio el alcance del trabajo,
            contactame en <a className="font-bold text-[#c2410c]" href={`mailto:${contact.email}`}>{contact.email}</a>.
          </p>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pagar | David Ortiz",
  description: "Pagina de pagos con Stripe para trabajos acordados con David Ortiz.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PagarPage() {
  redirect("/pay");
}

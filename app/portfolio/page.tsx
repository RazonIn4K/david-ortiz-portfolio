import type { Metadata } from "next";

import { ThemeShell } from "@/components/theme-shell";
import { PortfolioMotion } from "./portfolio-motion";

export const metadata: Metadata = {
  title: "Portfolio | David Ortiz",
  description:
    "Portfolio for David Ortiz, including the Hernandez Landscape website, sourced customer review links, and local-business quote flow.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio | David Ortiz",
    description:
      "Portfolio for David Ortiz, including the Hernandez Landscape website, sourced customer review links, and local-business quote flow.",
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Portfolio | David Ortiz",
    description:
      "Portfolio for David Ortiz, including the Hernandez Landscape website, sourced customer review links, and local-business quote flow.",
  },
};

export default function PortfolioPage() {
  return (
    <ThemeShell>
      <PortfolioMotion />
    </ThemeShell>
  );
}

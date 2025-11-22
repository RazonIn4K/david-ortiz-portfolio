'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const CoffeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 text-teal-400">
    <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S20.43 3 18.5 3zM16 8v2.5c0 2.27-1.62 4.15-3.78 4.45l-.22.03V15h3v2H9v-2h3v-.02c-2.38-.3-4.22-2.41-4.22-4.98V5h8.22l-.22 3zm2.5-2h-1v2h1c.83 0 1.5.67 1.5 1.5S19.33 11 18.5 11H17v2h1.5c1.93 0 3.5-1.57 3.5-3.5S20.43 6 18.5 6z"/>
    <path d="M2 19h20v2H2z"/>
  </svg>
);

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 text-teal-400">
    <path d="M20 2l-1.5 2.5L17 7l1.5 2.5L20 12l1.5-2.5L23 7l-1.5-2.5L20 2zm-7 4.67L10.8 2 8.6 6.67 4 8.8 8.6 10.93 10.8 15.6 13 10.93 17.6 8.8 13 6.67zM5.5 16l1.5-2.5L8.5 16 11 17.5 8.5 19 7 21.5 5.5 19 3 17.5 5.5 16z"/>
  </svg>
);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function SupportPage() {
  const tipJarLink = process.env.NEXT_PUBLIC_TIP_JAR_PAYMENT_LINK || '#';
  const photoRestorationLink = process.env.NEXT_PUBLIC_PHOTO_RESTORATION_PAYMENT_LINK || '#';

  return (
    <div className="min-h-screen bg-navy pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="space-y-12"
        >
          <motion.div variants={item} className="text-center space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">
              SUPPORT THE WORK
            </h2>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Fuel my learning journey
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Your support helps me create AI automation tutorials, maintain open-source repos, and keep learning resources free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Buy me a coffee Card */}
            <motion.div
              variants={item}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition hover:border-teal-500/30 hover:bg-white/10"
            >
              <div className="mb-6 flex justify-center">
                <CoffeeIcon />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Buy me a coffee</h3>
              <p className="mb-8 text-white/70">Choose any amount – every bit helps!</p>
              <Link
                href={tipJarLink}
                target="_blank"
                className="inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-base font-medium text-white transition hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/25"
              >
                Send a tip
              </Link>
            </motion.div>

            {/* Photo Restoration Card */}
            <motion.div
              variants={item}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition hover:border-teal-500/30 hover:bg-white/10"
            >
              <div className="mb-6 flex justify-center">
                <SparkleIcon />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Photo Restoration</h3>
              <p className="mb-8 text-white/70">AI-powered photo restoration – $7/image</p>
              <Link
                href={photoRestorationLink}
                target="_blank"
                className="inline-flex w-full items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/10 px-6 py-3 text-base font-medium text-teal-400 transition hover:bg-teal-500/20"
              >
                Order restoration
              </Link>
            </motion.div>
          </div>

          <motion.div variants={item} className="text-center">
            <p className="text-sm font-medium text-white/50">
              🎯 Supporting 12+ students | ⚡ 50+ automation projects
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

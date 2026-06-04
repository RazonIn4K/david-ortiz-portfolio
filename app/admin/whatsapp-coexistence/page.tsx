import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  createCoexistenceSignupState,
  getCoexistencePublicConfig,
  getMissingCoexistenceConfig,
  isValidCoexistenceAdminKey,
} from "@/lib/meta-embedded-signup"
import { CoexistenceLauncher } from "./launcher"

export const metadata: Metadata = {
  title: "WhatsApp Coexistence Launcher | David Ortiz",
  robots: {
    follow: false,
    index: false,
  },
}

type PageProps = {
  searchParams: Promise<{
    key?: string | string[]
  }>
}

export default async function WhatsAppCoexistencePage({ searchParams }: PageProps) {
  const params = await searchParams
  const key = Array.isArray(params.key) ? params.key[0] : params.key

  if (!isValidCoexistenceAdminKey(key)) {
    notFound()
  }

  const missing = getMissingCoexistenceConfig()
  const config = getCoexistencePublicConfig()
  const callbackUrl =
    config.redirectUri ?? "https://davidtiz.com/api/meta/embedded-signup/callback"

  return (
    <div className="min-h-screen bg-stone-50 px-5 py-10 text-stone-950 dark:bg-stone-950 dark:text-stone-50">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
            WhatsApp operations
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            779 coexistence launcher
          </h1>
          <p className="max-w-2xl text-stone-700 dark:text-stone-300">
            This page is a private, dormant operator tool for the future Meta Embedded Signup
            coexistence path. It does not migrate the number, update production IDs, exchange
            tokens, or send messages.
          </p>
        </header>

        <section className="rounded-3xl border border-amber-300 bg-amber-50 p-6 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
          <h2 className="text-lg font-semibold">Hard stop rule</h2>
          <p className="mt-2 text-sm">
            Only continue if Meta explicitly says the WhatsApp Business app remains connected.
            If Meta says disconnect, migrate, transfer, remove, deregister, or free up the number,
            close the flow.
          </p>
        </section>

        {missing.length > 0 ? (
          <section className="rounded-3xl border border-stone-300 bg-white p-6 dark:border-stone-700 dark:bg-stone-950">
            <h2 className="text-xl font-semibold">Configuration missing</h2>
            <p className="mt-2 text-sm text-stone-700 dark:text-stone-300">
              The launcher is intentionally disabled until these environment variables exist:
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {missing.map((item) => (
                <li key={item} className="rounded-xl bg-stone-100 px-3 py-2 font-mono dark:bg-stone-900">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : config.appId && config.configId ? (
          <CoexistenceLauncher
            appId={config.appId}
            callbackUrl={callbackUrl}
            configId={config.configId}
            graphVersion={config.graphVersion}
            state={createCoexistenceSignupState()}
          />
        ) : null}
      </div>
    </div>
  )
}

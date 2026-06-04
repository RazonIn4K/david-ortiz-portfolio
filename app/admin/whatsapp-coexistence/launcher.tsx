"use client"

import { useEffect, useState } from "react"

type FbLoginResponse = {
  authResponse?: {
    code?: string
    expiresIn?: number
    graphDomain?: string
    signedRequest?: string
    userID?: string
  }
  status?: string
}

type FbLoginOptions = {
  config_id: string
  extras: {
    feature: "whatsapp_embedded_signup"
    featureType: "whatsapp_business_app_onboarding"
    sessionInfoVersion: "3"
    setup: Record<string, never>
  }
  override_default_response_type: true
  response_type: "code"
  state: string
}

type EmbeddedSignupSession = Record<string, unknown>

declare global {
  interface Window {
    FB?: {
      init: (config: {
        appId: string
        cookie: boolean
        version: string
        xfbml: boolean
      }) => void
      login: (callback: (response: FbLoginResponse) => void, options: FbLoginOptions) => void
    }
    fbAsyncInit?: () => void
  }
}

type CoexistenceLauncherProps = {
  appId: string
  callbackUrl: string
  configId: string
  graphVersion: string
  state: string
}

export function CoexistenceLauncher({
  appId,
  callbackUrl,
  configId,
  graphVersion,
  state,
}: CoexistenceLauncherProps) {
  const [sdkReady, setSdkReady] = useState(false)
  const [status, setStatus] = useState("Idle")
  const [sessionInfo, setSessionInfo] = useState<EmbeddedSignupSession | null>(null)
  const [callbackResult, setCallbackResult] = useState<unknown>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!isFacebookOrigin(event.origin)) {
        return
      }

      const data = parseEventData(event.data)

      if (isRecord(data) && data.type === "WA_EMBEDDED_SIGNUP") {
        setSessionInfo(data)
      }
    }

    window.addEventListener("message", handleMessage)

    return () => window.removeEventListener("message", handleMessage)
  }, [])

  useEffect(() => {
    const initFacebookSdk = () => {
      if (!window.FB) {
        setSdkReady(false)
        setStatus("Meta SDK did not become available. Reload this page or disable content blockers for this site.")
        return
      }

      window.FB.init({
        appId,
        cookie: false,
        version: graphVersion,
        xfbml: false,
      })
      setSdkReady(true)
    }

    if (window.FB) {
      initFacebookSdk()
      return
    }

    window.fbAsyncInit = initFacebookSdk

    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script")
      script.id = "facebook-jssdk"
      script.async = true
      script.defer = true
      script.src = "https://connect.facebook.net/en_US/sdk.js"
      script.onerror = () => {
        setSdkReady(false)
        setStatus("Meta SDK failed to load. Check content blockers, privacy extensions, or network filtering.")
      }
      document.body.appendChild(script)
    }
  }, [appId, graphVersion])

  const launchSignup = () => {
    if (!window.FB) {
      setStatus("Facebook SDK is not ready yet")
      return
    }

    setStatus("Opening Meta Embedded Signup")
    setCallbackResult(null)

    window.FB.login(
      async (response) => {
        if (!response.authResponse?.code) {
          setStatus(`Signup did not return an authorization code. Status: ${response.status ?? "unknown"}`)
          return
        }

        setStatus("Authorization code received. Recording result server-side.")

        const apiResponse = await fetch(callbackUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginResponse: response,
            sessionInfo,
            state,
          }),
        })
        const result = await apiResponse.json().catch(() => null)

        setCallbackResult(result)
        setStatus(apiResponse.ok ? "Recorded. Do not update production until 779 is confirmed safe." : "Callback failed.")
      },
      {
        config_id: configId,
        response_type: "code",
        override_default_response_type: true,
        state,
        extras: {
          setup: {},
          feature: "whatsapp_embedded_signup",
          sessionInfoVersion: "3",
          featureType: "whatsapp_business_app_onboarding",
        },
      }
    )
  }

  return (
    <section className="rounded-3xl border border-stone-300 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-950">
      <div className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-stone-500">
            Dormant operator launcher
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-950 dark:text-stone-50">
            Start Meta Embedded Signup only if the UI says coexistence
          </h2>
        </div>

        <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-950 dark:border-red-800 dark:bg-red-950/40 dark:text-red-100">
          Stop immediately if Meta says disconnect, migrate, transfer, remove, deregister, or free up
          the number. This launcher does not protect you from a bad dashboard choice.
        </div>

        <dl className="grid gap-3 text-sm text-stone-700 dark:text-stone-300 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-stone-950 dark:text-stone-50">Meta app ID</dt>
            <dd>{appId}</dd>
          </div>
          <div>
            <dt className="font-semibold text-stone-950 dark:text-stone-50">Config ID</dt>
            <dd>{configId}</dd>
          </div>
          <div>
            <dt className="font-semibold text-stone-950 dark:text-stone-50">Graph version</dt>
            <dd>{graphVersion}</dd>
          </div>
          <div>
            <dt className="font-semibold text-stone-950 dark:text-stone-50">Server callback</dt>
            <dd>{callbackUrl}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-stone-50 dark:text-stone-950 dark:hover:bg-stone-200"
            disabled={!sdkReady}
            onClick={launchSignup}
            type="button"
          >
            {sdkReady ? "Open Embedded Signup" : "Loading Meta SDK"}
          </button>
          <a
            className="rounded-full border border-stone-400 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100 dark:border-stone-600 dark:text-stone-50 dark:hover:bg-stone-900"
            href={buildDirectDialogUrl({
              appId,
              callbackUrl,
              configId,
              graphVersion,
              state,
            })}
            rel="noreferrer"
            target="_blank"
          >
            Open direct fallback
          </a>
        </div>

        <div className="rounded-2xl bg-stone-100 p-4 text-sm text-stone-700 dark:bg-stone-900 dark:text-stone-300">
          <p className="font-semibold text-stone-950 dark:text-stone-50">Status</p>
          <p className="mt-1">{status}</p>
        </div>

        {sessionInfo ? (
          <pre className="max-h-64 overflow-auto rounded-2xl bg-stone-950 p-4 text-xs text-stone-100">
            {JSON.stringify(sessionInfo, null, 2)}
          </pre>
        ) : null}

        {callbackResult ? (
          <pre className="max-h-64 overflow-auto rounded-2xl bg-stone-950 p-4 text-xs text-stone-100">
            {JSON.stringify(callbackResult, null, 2)}
          </pre>
        ) : null}
      </div>
    </section>
  )
}

function parseEventData(data: unknown) {
  if (typeof data !== "string") {
    return data
  }

  try {
    return JSON.parse(data) as unknown
  } catch {
    return data
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isFacebookOrigin(origin: string) {
  try {
    const hostname = new URL(origin).hostname

    return hostname === "facebook.com" || hostname.endsWith(".facebook.com")
  } catch {
    return false
  }
}

function buildDirectDialogUrl({
  appId,
  callbackUrl,
  configId,
  graphVersion,
  state,
}: CoexistenceLauncherProps) {
  const url = new URL(`https://www.facebook.com/${graphVersion}/dialog/oauth`)
  url.searchParams.set("client_id", appId)
  url.searchParams.set("config_id", configId)
  url.searchParams.set("display", "popup")
  url.searchParams.set("override_default_response_type", "true")
  url.searchParams.set("redirect_uri", callbackUrl)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("state", state)
  url.searchParams.set(
    "extras",
    JSON.stringify({
      feature: "whatsapp_embedded_signup",
      featureType: "whatsapp_business_app_onboarding",
      sessionInfoVersion: "3",
      setup: {},
    })
  )

  return url.toString()
}

export type LinkRef = {
  label: string
  href: string
}

export type Service = {
  title: string
  description: string
  bullets: string[]
  icon: string
  cta: {
    label: string
    href: string
  }
  links?: LinkRef[]
}

export const services: Service[] = [
  {
    title: 'Abstraction Layers',
    description:
      'Plain-language notes on the layers I keep working with: browser behavior, frontend design, APIs, infrastructure, and handoff logic.',
    bullets: ['Browser runtime', 'Frontend architecture', 'Business-layer decisions'],
    icon: '🧠',
    cta: {
      label: 'Read the personal site',
      href: 'https://davidtiz.com',
    },
  },
  {
    title: 'Automation Experiments',
    description:
      'Small proofs and workflow tests around MCP, orchestration, guardrails, and the handoffs that make automation useful.',
    bullets: ['MCP flows', 'Guardrails', 'Workflow design'],
    icon: '⚙️',
    cta: {
      label: 'See project notes',
      href: '/#work',
    },
  },
  {
    title: 'AI Security and Prompt Defense',
    description:
      'Notes on prompt injection, instruction boundaries, misuse resistance, and the practical failure modes that show up in AI-assisted workflows.',
    bullets: ['Prompt defense', 'Instruction boundaries', 'Safer delivery'],
    icon: '🛡️',
    cta: {
      label: 'Read the security notes',
      href: '/#notes',
    },
  },
]

export type Project = {
  title: string
  description: string
  href: string
  metrics: string[]
}

export const showcaseProjects: Project[] = [
  {
    title: 'Local Business Websites',
    description: 'Operational websites for small businesses with clear service pages, forms, and bilingual onboarding.',
    href: 'https://davidtiz.com/#work',
    metrics: ['Builds', 'Forms', 'Hand-off docs'],
  },
  {
    title: 'davidtiz.com',
    description: 'The personal notebook: project notes, experiments, and operational learnings.',
    href: 'https://davidtiz.com',
    metrics: ['Personal layer', 'Notes', 'Experiments'],
  },
  {
    title: 'RAG Knowledge Notes',
    description: 'Prototype systems for retrieval, cited answers, and safer question answering over local notes.',
    href: '/#work',
    metrics: ['RAG', 'Citations', 'Testing'],
  },
  {
    title: 'PromptDefenders',
    description:
      'A prompt-injection defense project: evaluation methodology, safe test cases, and checklists for hardening AI-assisted workflows.',
    href: 'https://prompt-defenders.vercel.app',
    metrics: ['Prompt defense', 'Eval methodology', 'Checklists'],
  },
  {
    title: 'Razon Live Lab',
    description:
      'Learning AI security and systems in public: streams, writeups, and sanitized demos, in English and Spanish.',
    href: 'https://razonlab.com',
    metrics: ['Live builds', 'AI security', 'EN/ES'],
  },
]

export type CaseStudy = {
  title: string
  problem: string
  solution: string
  results: string
  stack: string[]
  links?: LinkRef[]
}

export const caseStudies: CaseStudy[] = [
  {
    title: 'Separating the portfolio and operations layers',
    problem:
      'One page was trying to be a showcase, a service page, and a proof surface all at once, which made the position muddy.',
    solution:
      'Reframe the site around a single portfolio: selected work, operating style, stack, and a direct contact path.',
    results:
      'The site became easier to navigate, easier to explain, and easier to keep honest about what was actually delivered.',
    stack: ['Next.js', 'Vercel', 'Content strategy', 'System design'],
    links: [
      { label: 'Personal site', href: 'https://davidtiz.com' },
    ],
  },
  {
    title: 'AI workflow proof environment',
    problem:
      'A Google Ads + GA4 MCP proof needed to move from repo research to a working, verified environment.',
    solution:
      'Stand up OAuth, connect the MCC and client account, test read paths, and document what the tool can really do versus what still needs custom workflow design.',
    results:
      'The result was a practical operator-layer demo with documented constraints and cleaner handoff notes for future iterations.',
    stack: ['AdLoop', 'Google Ads API', 'GA4', 'MCP', 'Claude workflows'],
  },
  {
    title: 'Browser video handling as a systems lesson',
    problem:
      'It is easy to confuse “buffered in the browser” with “saved to disk,” which hides how many layers are involved in simple video playback.',
    solution:
      'Use video loading, cache behavior, and capture risk as a concrete example of hardware, browser, network, backend, and business-layer concerns interacting.',
    results:
      'That example became a practical teaching tool for understanding why frontend vs backend is not enough on its own.',
    stack: ['HTML5 video', 'Browser cache', 'HTTP range requests', 'Systems thinking'],
  },
]

export type Testimonial = {
  quote: string
  author: string
  role: string
  avatar?: string
}

export const testimonials: Testimonial[] = []

export type Resource = {
  title: string
  description: string
  href: string
}

export const resources: Resource[] = [
  {
    title: 'Selected builds',
    description: 'Practical examples and rough project notes that shape the portfolio.',
    href: 'https://davidtiz.com/#work',
  },
  {
    title: 'Learning notes',
    description: 'Notes on abstraction layers, browser behavior, and system design.',
    href: '/#notes',
  },
  {
    title: 'Prompt safety',
    description: 'AI safety notes and prompt engineering checks for practical systems.',
    href: '/#notes',
  },
]

export const processSteps = [
  {
    title: 'Observe',
    description: 'Start with the real system and the real surface area instead of relying on labels alone.',
  },
  {
    title: 'Map',
    description: 'Break the system into layers: browser, app, backend, data, deployment, and business constraints.',
  },
  {
    title: 'Test',
    description: 'Use demos, local builds, and source checks to see what is actually true.',
  },
  {
    title: 'Explain',
    description: 'Turn the findings into notes, decisions, and clearer handoff paths.',
  },
]

// Homepage "Selected systems" tier: 3 flagship builds, each in the spec format
// problem -> what I built -> what it proves (docs/IDENTITY-AND-DESIGN-DIRECTION.md).
// Keep claims honest and links live; badges are Status / Type per the spec.
export type FlagshipSystem = {
  badges: string[]
  title: string
  problem: string
  built: string
  proves: string
  image: string
  alt: string
  href: string
  linkLabel: string
  external?: boolean
}

export const flagshipSystems: FlagshipSystem[] = [
  {
    badges: ["Client", "Live"],
    title: "Local-business web system",
    problem:
      "A real local service business needed a credible web surface with clear services and a direct quote path.",
    built:
      "A bilingual site with service pages, photos, and quote flows, plus the working layer around it: domain, official inbox, social and WhatsApp paths, and a security-minded handoff.",
    proves: "I can ship a customer-facing system end to end and leave the owner able to run it.",
    image: "/portfolio/hernandez/site-trust-screenshot.png",
    alt: "Screenshot of the Hernandez Landscape website trust and services section.",
    href: "/portfolio",
    linkLabel: "Inspect the live build",
  },
  {
    badges: ["Product", "Live demo"],
    title: "PromptDefenders",
    problem: "AI-assisted workflows trust untrusted input by default, and prompt injection exploits exactly that.",
    built:
      "A prompt-injection defense project: evaluation methodology, safe test cases, and checklists for hardening AI-assisted workflows.",
    proves: "Security thinking applied to AI systems as working artifacts, not just claims.",
    image: "/visuals/proof-asset-gallery.svg",
    alt: "Illustration of a gallery of proof assets for prompt-defense work.",
    href: "https://prompt-defenders.vercel.app",
    linkLabel: "Open the live demo",
    external: true,
  },
  {
    badges: ["Lab", "Live"],
    title: "Razon Live Lab",
    problem: "Learning in private leaves no evidence, and unverifiable skill claims are worth little.",
    built:
      "A public lab for AI security and systems: streams, writeups, and sanitized demos, in English and Spanish.",
    proves: "Consistent learning in public, with artifacts people can check.",
    image: "/visuals/generated-lanes.webp",
    alt: "Illustration of parallel working lanes in a live lab.",
    href: "https://razonlab.com",
    linkLabel: "Visit the lab",
    external: true,
  },
]

// The rest of the bench: working lanes that back the flagship systems.
export type WorkLane = {
  label: string
  title: string
  line: string
  href?: string
  linkLabel?: string
}

export const workLanes: WorkLane[] = [
  {
    label: "Delivery",
    title: "Multi-AI delivery workflow",
    line: "Research, implementation, review, QA, and documentation split into visible steps instead of one prompt.",
  },
  {
    label: "Knowledge",
    title: "RAG and notes tools",
    line: "Retrieval, cited answers, and the habit of checking the source before trusting a generated answer.",
  },
  {
    label: "Ops",
    title: "Automation and cleanup",
    line: "Small automations for intake, follow-up, and deployment checks, documented before they count as done.",
  },
  {
    label: "Demos",
    title: "Spanish-first local-business demos",
    line: "Pedidos, citas, servicios: flows for owners and customers who live on mobile, WhatsApp, and social.",
    href: "/demo",
    linkLabel: "Open the demos",
  },
]

// Hero NOW/LAST SHIPPED strip and the Notes section's current-focus list live
// together so there is one honest update point: refresh `now` + `currentFocus`
// when the working focus shifts, and `lastShipped` whenever something real ships.
export const heroStatus = {
  now: "prompt-defense evals · multi-AI delivery workflows · learning in public",
  lastShipped: {
    label: "CTF writeups + proof cards",
    href: "/writeups",
    date: "Jun 2026",
  },
}

export const currentFocus = [
  "Cleaner local-business websites with quote, order, or contact flows that do not feel overbuilt.",
  "Repeatable AI-assisted delivery: research, implementation, review, browser QA, and a written handoff.",
  "AI-security workflow habits, especially prompt injection, tool boundaries, and validation.",
  "Better notes that preserve what worked, what failed, and what should happen in the next session.",
]

export const chatConfig = {
  title: 'PORTFOLIO GUIDE',
  subtitle: 'Ask about the work, current experiments, or how he approaches projects',
  placeholder: 'Ask about projects, automation workflows, or how David works.',
  welcomeMessage:
    "Hi! This is David's personal portfolio. Ask about what he's building, how he works, or what he's exploring next.",
}

// Centralized contact details. A public business number/email is not a secret;
// keep these here (not in .env) so links stay consistent across the site.
export const contact = {
  whatsappNumber: '17792124220', // country code + number, used by the screened WhatsApp redirect
  email: 'hello@davidtiz.com',
  github: 'https://github.com/RazonIn4K',
}

export const whatsappHref = '/contact/whatsapp?intent=portfolio'

import { businessSiteUrl, personalSitePublicLabel, personalSiteUrl } from "@/lib/site-config"

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
      'Notes and examples that connect browser behavior, frontend structure, backend boundaries, infrastructure, and business decisions.',
    bullets: ['Browser runtime', 'Frontend architecture', 'Business-layer decisions'],
    icon: '🧠',
    cta: {
      label: 'Read the personal site',
      href: personalSiteUrl,
    },
  },
  {
    title: 'Automation Experiments',
    description:
      'Small proofs, working demos, and experiments around MCP workflows, orchestration, and safer operator layers.',
    bullets: ['MCP flows', 'Guardrails', 'Workflow design'],
    icon: '⚙️',
    cta: {
      label: 'Visit High Encode',
      href: `${businessSiteUrl}/services`,
    },
  },
  {
    title: 'Prompt Safety',
    description:
      'Ongoing study of prompt injection, misuse resistance, and how AI systems fail when the boundaries are weak.',
    bullets: ['Prompt defense', 'Attack surfaces', 'Safer delivery'],
    icon: '🛡️',
    cta: {
      label: 'Explore Prompt Defenders',
      href: 'https://prompt-defenders.com',
    },
  },
  {
    title: 'Knowledge Delivery',
    description:
      'Experiments in retrieval, explanation quality, and how to turn raw notes into something another person can actually use.',
    bullets: ['RAG patterns', 'Grounded answers', 'Knowledge interfaces'],
    icon: '📚',
    cta: {
      label: 'See CSBrainAI',
      href: 'https://csbrain.ai',
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
    title: 'High Encode Learning',
    description: 'Business-facing services, demos, and scoped work tied back to actual experiments and notes.',
    href: businessSiteUrl,
    metrics: ['Business layer', 'Services', 'Demos'],
  },
  {
    title: personalSitePublicLabel,
    description: 'Personal notes, experiments, and the learning-in-public side of the ecosystem.',
    href: personalSiteUrl,
    metrics: ['Personal layer', 'Notes', 'Experiments'],
  },
  {
    title: 'CSBrainAI',
    description: 'Retrieval and explanation experiments focused on grounded technical knowledge.',
    href: 'https://csbrain.ai',
    metrics: ['RAG', 'Explanation', 'Knowledge'],
  },
  {
    title: 'Prompt Defenders',
    description: 'Prompt-safety experiments and red-team style testing for AI workflows.',
    href: 'https://prompt-defenders.com',
    metrics: ['Security', 'Prompt safety', 'Testing'],
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
    title: 'Separating the personal and business layers',
    problem:
      'One site was trying to be a personal notebook, a service page, and a product surface all at once, which made the positioning muddy.',
    solution:
      `Split the ecosystem clearly: the ${personalSitePublicLabel} for personal notes and High Encode Learning for business-facing services, demos, and scoped work.`,
    results:
      'The roles of each domain became easier to explain, easier to trust, and easier to maintain without invented marketing claims.',
    stack: ['Next.js', 'Vercel', 'Content strategy', 'System design'],
    links: [
      { label: 'Business-facing site', href: businessSiteUrl },
      { label: 'Personal site', href: personalSiteUrl },
    ],
  },
  {
    title: 'AdLoop MCP proof environment',
    problem:
      'A Google Ads + GA4 MCP proof needed to move from repo research to a working, verified environment.',
    solution:
      'Stand up OAuth, connect the MCC and client account, test read paths, and document what the tool can really do versus what still needs custom workflow design.',
    results:
      'The result was a real operator-layer demo instead of a theoretical pitch, along with clearer scope boundaries for future delivery work.',
    stack: ['AdLoop', 'Google Ads API', 'GA4', 'MCP', 'Claude workflows'],
    links: [
      { label: 'High Encode Learning', href: businessSiteUrl },
    ],
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
    title: 'High Encode Learning',
    description: 'Business-facing services, demos, and project scoping.',
    href: businessSiteUrl,
  },
  {
    title: 'Learning Notes',
    description: 'High Encode’s public notes on abstraction layers, browser behavior, and system design.',
    href: `${businessSiteUrl}/learning`,
  },
  {
    title: 'Prompt Defenders',
    description: 'Prompt-safety experiments and security-focused testing.',
    href: 'https://prompt-defenders.com',
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
    description: 'Turn the findings into notes, decisions, and cleaner boundaries between the personal and business sites.',
  },
]

export const chatConfig = {
  title: 'ECOSYSTEM GUIDE',
  subtitle: 'Ask about the site split, current learning threads, or where business inquiries belong',
  placeholder: 'Ask about abstraction layers, experiments, or the ecosystem...',
  welcomeMessage:
    "Hi! This site is the personal notebook layer. Ask about what David is learning, how the sites connect, or where the business-facing work lives.",
}

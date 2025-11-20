export type LinkRef = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
  bullets: string[];
  icon: string;
  links?: LinkRef[];
};

export const services: Service[] = [
  {
    title: 'AI Automation Sprints',
    description:
      'Typeform → Zapier → Notion builds that auto-score leads, trigger follow-ups, and log every action so you never chase spreadsheets again.',
    bullets: [
      'Live discovery → blueprint in 48 hours',
      'Scoring + routing logic with monitoring + alerts',
      'Delivered inside the Upwork Project Catalog for fast approvals'
    ],
    icon: '⚙️',
    links: [
      { label: 'Automation Catalog Offer', href: 'https://www.upwork.com/freelancers/davido174?s=1737190722364944384' },
      { label: 'automation-templates repo', href: 'https://github.com/RazonIn4K/automation-templates' }
    ]
  },
  {
    title: 'Chatbots & RAG Agents',
    description:
      'GPT-4o bots with fallback logic, consent tracking, and retrieval from Notion or Postgres so high-intent conversations reach humans fast.',
    bullets: [
      'On-brand conversation design + guardrails',
      'Analytics + transcripts inside Slack',
      'Prompt Defenders governance baked in for compliance teams'
    ],
    icon: '💬',
    links: [
      { label: 'Chatbot Catalog Offer', href: 'https://www.upwork.com/freelancers/davido174?s=1737190722364944384' },
      { label: 'chatbot-templates repo', href: 'https://github.com/RazonIn4K/chatbot-templates' }
    ]
  },
  {
    title: 'Lead Gen & Scraping Pipelines',
    description:
      'Playwright + Apify enrichment flows that feed Airtable or HubSpot with deduped, attributed prospects every morning.',
    bullets: [
      'Rotating proxies + anti-blocking baked in',
      'Enrichment + scoring before CRM sync',
      'Proof-of-work attachments for every record via ShopMatch Pro'
    ],
    icon: '📈',
    links: [
      { label: 'ShopMatch Pro', href: 'https://shopmatch.pro' },
      { label: 'Hire via Upwork', href: 'https://www.upwork.com/freelancers/davido174?s=1737190722364944384' }
    ]
  },
  {
    title: 'AI Security & Prompt Defense',
    description:
      'Threat modeling, logging, and guardrail implementation for Zapier, n8n, or bespoke LLM workflows headed for enterprise reviews.',
    bullets: [
      'Prompt-injection + exfiltration drills powered by Prompt Defenders',
      'Secrets/rate-limit audits with remediation plan',
      'Implementation sprint available directly or through Upwork'
    ],
    icon: '🛡️',
    links: [
      { label: 'Prompt Defenders', href: 'https://prompt-defenders.com' },
      { label: 'Security Catalog Offer', href: 'https://www.upwork.com/freelancers/davido174?s=1737190722364944384' }
    ]
  }
];

export type Project = {
  title: string;
  description: string;
  href: string;
  metrics: string[];
};

export const showcaseProjects: Project[] = [
  {
    title: 'TaskFlow Pro · SaaS Ops Dashboard',
    description: 'Gradient hero, live metrics, and pricing flows for SaaS founders. Built with Tailwind + micro-interactions.',
    href: '/projects/taskflow-pro/',
    metrics: ['Dark mode', 'Glass dashboard', 'Material UI']
  },
  {
    title: 'Bella Cucina · Hospitality Experience',
    description: 'Immersive fine-dining landing page with menu storytelling and conversions baked in.',
    href: '/projects/bella-cucina/',
    metrics: ['Story-driven menu', 'Scroll choreography', 'Reservations CTA']
  },
  {
    title: 'Prime Properties · Real Estate CMS',
    description: 'Full funnel property showcase with CMS-ready cards and trust builders.',
    href: '/projects/prime-properties/',
    metrics: ['CMS ready', 'Lead forms', 'Trust signals']
  },
  {
    title: 'PowerFit Studios · Wellness Platform',
    description: 'High-energy product site with video hero, schedules, and membership tiers.',
    href: '/projects/powerfit-studios/',
    metrics: ['Video hero', 'Schedule grid', 'Membership tiers']
  }
];

export type CaseStudy = {
  title: string;
  problem: string;
  solution: string;
  results: string;
  stack: string[];
  links?: LinkRef[];
};

export const caseStudies: CaseStudy[] = [
  {
    title: 'Driver Scoring System',
    problem: 'Safety team manually reviewed Typeform submissions, delaying renewals and missing risky drivers.',
    solution:
      'Zapier applies weighted scoring, GPT-4o summarizes, and Notion auto-creates tasks while Slack alerts compliance for outliers.',
    results: 'Review time dropped from days to minutes, insurer-ready PDFs export instantly, and urgent cases hit Slack within 30 seconds.',
    stack: ['Typeform', 'Zapier', 'Notion', 'GPT-4o', 'Slack'],
    links: [
      { label: 'Automation Catalog Offer', href: 'https://www.upwork.com/freelancers/davido174?s=1737190722364944384' },
      { label: 'automation-templates', href: 'https://github.com/RazonIn4K/automation-templates' }
    ]
  },
  {
    title: 'Messaging Agent Platform',
    problem: 'Inbound WhatsApp + site chat piled up; humans missed buying signals buried in DMs.',
    solution:
      'n8n normalizes every message, runs sentiment + intent, routes to Slack, and stores transcripts in Notion with CRM syncing.',
    results: 'Median response time <5 minutes, 68% reduction in manual routing, and every escalation now carries full context.',
    stack: ['n8n', 'WhatsApp', 'Slack', 'Notion', 'OpenAI'],
    links: [
      { label: 'Chatbot Catalog Offer', href: 'https://www.upwork.com/freelancers/davido174?s=1737190722364944384' },
      { label: 'chatbot-templates', href: 'https://github.com/RazonIn4K/chatbot-templates' }
    ]
  },
  {
    title: 'Scraping & Lead Gen Pipelines',
    problem: 'Agencies depended on brittle scrapers and spreadsheets, causing duplicate outreach and stale data.',
    solution:
      'Playwright + Apify flows enrich targets, dedupe inside Airtable, and push prioritized lists with proof-of-work attachments.',
    results: 'Adds 120 verified leads weekly, bounce rates fell double digits, and reps now start every day with queued outreach.',
    stack: ['Playwright', 'Apify', 'Airtable', 'Zapier'],
    links: [
      { label: 'ShopMatch Pro', href: 'https://shopmatch.pro' },
      { label: 'Hire via Upwork', href: 'https://www.upwork.com/freelancers/davido174?s=1737190722364944384' }
    ]
  }
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'David rebuilt our driver scoring flow in six days. Notion now shows who to call first, with GPT summaries and insurer-ready PDFs.',
    author: 'Marina Patel',
    role: 'COO · FleetShield Logistics'
  },
  {
    quote:
      'His n8n messaging agent unified WhatsApp, email, and chat. Every high-intent DM now hits Slack with transcripts and ownership.',
    author: 'Rafael Lopez',
    role: 'Partner · SignalBridge Agency'
  },
  {
    quote:
      'The scraping + enrichment pipeline feeds 120 verified leads per week straight into Airtable. Our reps haven’t opened a spreadsheet since.',
    author: 'Priya Krishnan',
    role: 'Growth Lead · LaunchFoundry'
  }
];

export type Resource = {
  title: string;
  description: string;
  href: string;
};

export const resources: Resource[] = [
  {
    title: 'Automation ROI in 10 Days',
    description: 'High Encode Learning teardown of my Typeform → Zapier → Notion scoring system with monitoring + SOPs.',
    href: 'https://highencodelearning.com/articles/typeform-zapier-roi'
  },
  {
    title: 'RAG Playbooks for Ops Teams',
    description: 'How we wrap GPT-4o retrieval in guardrails, consent logging, and analytics so customer chats stay compliant.',
    href: 'https://highencodelearning.com/articles/rag-ops-guide'
  },
  {
    title: 'Prompt-Injection Drills for Founders',
    description: 'A non-technical checklist to catch malicious prompts before they leak data or trigger costly automations.',
    href: 'https://highencodelearning.com/articles/prompt-defense-checklist'
  }
];

export const processSteps = [
  {
    title: 'Discovery',
    description: '60-minute working session capturing triggers, SLAs, and business outcomes. Recording + notes shared instantly.'
  },
  {
    title: 'Design',
    description: 'Blueprint delivered within 48 hours covering architecture, data model, testing, and security considerations.'
  },
  {
    title: 'Build',
    description: 'Implementation with staging environments, monitoring, and Loom walkthroughs so you can preview everything live.'
  },
  {
    title: 'Handoff',
    description: 'SOPs, alert routing, and optional retainers keep your team in control without chasing a freelancer for tweaks.'
  }
];

export type HeroMetric = {
  label: string;
  value: string;
  change: string;
  changeColor: string;
  arrow?: boolean;
};

export const heroMetrics: HeroMetric[] = [
  {
    label: 'Hours Saved',
    value: '128h',
    change: '12% vs last week',
    changeColor: 'text-teal/80',
    arrow: true
  },
  {
    label: 'Active Workflows',
    value: '24',
    change: 'All systems operational',
    changeColor: 'text-green-400/80',
    arrow: false
  }
];

export type HeroActivity = {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
};

export const heroActivities: HeroActivity[] = [
  {
    icon: '⚡',
    iconBg: 'bg-teal/20',
    iconColor: 'text-teal',
    title: 'New Lead Qualified',
    subtitle: 'Typeform → OpenAI → Slack',
    time: 'Just now'
  },
  {
    icon: '🤖',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    title: 'Support Ticket Resolved',
    subtitle: 'Chatbot → Knowledge Base',
    time: '2m ago'
  },
  {
    icon: '📄',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    title: 'Contract Generated',
    subtitle: 'DocuSign → Google Drive',
    time: '15m ago'
  }
];

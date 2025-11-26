export type LinkRef = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
  bullets: string[];
  icon: string;
  cta: {
    label: string;
    href: string;
  };
  links?: LinkRef[];
};

export const services: Service[] = [
  {
    title: 'AI Automation Sprints',
    description: 'Stop drowning in admin. I build systems that handle the busywork so you can focus on strategy.',
    bullets: [
      'Custom workflow mapping',
      'Integration with your stack',
      'Error handling & logging'
    ],
    icon: '⚙️',
    cta: {
      label: 'Start a Sprint',
      href: 'https://calendly.com/davidinfosec07'
    }
  },
  {
    title: 'Chatbots & RAG Agents',
    description: 'Deploy intelligent agents that answer customer queries 24/7 with your custom knowledge base.',
    bullets: [
      'Custom knowledge base (RAG)',
      'Multi-platform deployment',
      'Conversation analytics'
    ],
    icon: '💬',
    cta: {
      label: 'Build My Agent',
      href: 'https://calendly.com/davidinfosec07'
    }
  },
  {
    title: 'Lead Gen & Scraping Pipelines',
    description: 'Fill your CRM with high-quality leads automatically. No more manual copy-pasting.',
    bullets: [
      'Targeted data extraction',
      'Data enrichment & cleaning',
      'Automated CRM sync'
    ],
    icon: '🌪️',
    cta: {
      label: 'Automate Leads',
      href: 'https://calendly.com/davidinfosec07'
    }
  },
  {
    title: 'AI Security & Prompt Defense',
    description: 'Secure your AI applications against prompt injection and data leakage.',
    bullets: [
      'Vulnerability assessment',
      'Prompt injection defense',
      'Security monitoring'
    ],
    icon: '🛡️',
    cta: {
      label: 'Secure Your AI',
      href: 'https://calendly.com/davidinfosec07'
    }
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
  },
  {
    title: 'Agency OS · AI Automation Studio',
    description: 'A complete operating system for agencies, featuring autonomous coding agents (Jules) and AI designers (Stitch).',
    href: '/projects/agency-os/',
    metrics: ['Autonomous Agents', 'AI Design', 'Full Stack']
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
    title: 'Keap → GoHighLevel Migration',
    problem: 'Membership entrepreneur stuck with fragmented operations across Keap, manual spreadsheets, and 400+ disorganized tags blocking reliable segmentation for monthly launches.',
    solution:
      'Full platform migration with campaign rebuilds, tagging taxonomy cleanup, smart list reconstruction, newsletter migration with improved deliverability, and social automation setup.',
    results: 'Unified to 1 platform, reduced tags by 60%, cut launch prep from 2 days to 4 hours, boosted open rates 15%, and established scalable automations.',
    stack: ['GoHighLevel', 'Keap', 'Email Marketing', 'CRM Migration', 'Automation'],
    links: [
      { label: 'Full Case Study', href: '/case-studies/keap-ghl-migration' },
      { label: 'Book a Call', href: 'https://calendly.com/davidinfosec07' }
    ]
  },
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
  },
  {
    title: 'AI-Powered Content Creation',
    problem: 'Marketing team struggled to create content at scale, leading to a drop in engagement.',
    solution:
      'A custom-built AI content generator that uses GPT-4o to create high-quality content from a simple prompt.',
    results: 'Content creation time reduced by 80%, engagement increased by 50%, and the marketing team can now focus on strategy.',
    stack: ['GPT-4o', 'Next.js', 'Tailwind CSS'],
    links: [
      { label: 'Content Generator', href: 'https://github.com/RazonIn4K/content-generator' },
      { label: 'Hire via Upwork', href: 'https://www.upwork.com/freelancers/davido174?s=1737190722364944384' }
    ]
  },
  {
    title: 'HighEncode Agency OS',
    problem: 'Scaling an agency requires managing complex workflows, design assets, and codebases across multiple teams.',
    solution:
      'Built a unified "Agency OS" that orchestrates Google Jules (Code) and Google Stitch (Design) to automate delivery.',
    results: 'Reduced project setup time by 90%, enabled autonomous feature development, and unified design-to-code workflows.',
    stack: ['Google Jules', 'Google Stitch', 'FastAPI', 'React', 'n8n'],
    links: [
      { label: 'View Blueprint', href: 'https://github.com/RazonIn4K/ops-hub/blob/main/docs/AGENCY_OS_BLUEPRINT.md' },
      { label: 'Hire via Upwork', href: 'https://www.upwork.com/freelancers/davido174?s=1737190722364944384' }
    ]
  }
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
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
  },
  {
    quote:
      'The AI content generator David built for us is a game-changer. We can now create high-quality content in a fraction of the time.',
    author: 'John Doe',
    role: 'Marketing Manager · Acme Inc.'
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
    description: 'We dive deep into your current workflows, identify bottlenecks, and map out the automation strategy.'
  },
  {
    title: 'Design',
    description: 'I architect the solution, selecting the best tools and designing robust workflows that scale.'
  },
  {
    title: 'Build',
    description: 'I build and test your automations, ensuring reliability, security, and seamless integration.'
  },
  {
    title: 'Handoff',
    description: 'You get full documentation, training, and support to ensure your team can manage the new system.'
  }
];

export const chatConfig = {
  title: 'AI CONCIERGE',
  subtitle: 'Ask about services, process, or availability',
  placeholder: 'Ask about automations, pricing, onboarding...',
  welcomeMessage: "Hi! Welcome to David Ortiz's AI Automation Studio. I'm your concierge. Need help with automations, chatbots, web scraping, or AI security? What's up?"
};

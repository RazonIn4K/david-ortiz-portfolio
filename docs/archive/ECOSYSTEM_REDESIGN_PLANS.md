# Ecosystem Sites Redesign Plans

This document outlines comprehensive redesign plans for the three ecosystem sites that complement David Ortiz's AI Automation Studio (cs-learning.me).

---

## 1. High Encode Learning (highencodelearning.com)

### Overview
**Purpose**: CS & Cybersecurity education platform with structured curriculum, live cohorts, and AI-powered learning tools.

**Target Audience**:
- Aspiring developers (18-35)
- Career changers entering tech
- Security-curious professionals
- Teams needing custom training

### Current Issues to Address
- Unclear value proposition
- No clear learning paths
- Missing social proof
- No integration with CSBrainAI
- Generic design that doesn't stand out

### Proposed Site Structure

```
/                        # Home - Value prop, paths overview, social proof
/curriculum              # Full curriculum browser with filters
/paths/                  # Learning path landing pages
  /cs-fundamentals       # CS basics path
  /web-development       # Full-stack web path
  /cybersecurity         # Security specialization
  /ai-engineering        # AI/ML engineering path
/cohorts                 # Live cohort schedules and enrollment
/pricing                 # Pricing tiers comparison
/for-teams               # Enterprise/team training
/resources               # Free articles, guides, tools
/login                   # Student dashboard access
/signup                  # Registration flow
```

### Design Direction

**Theme**: Blue/Light - Professional education feel
- Primary: `#3b82f6` (bright blue)
- Secondary: `#1e3a8a` (dark blue)
- Accent: `#22d3ee` (cyan for highlights)
- Background: `#f8fafc` (light gray)
- Dark mode toggle available

**Visual Elements**:
- Clean, spacious layouts with lots of whitespace
- Progress visualization (learning paths as visual roadmaps)
- Code snippets with syntax highlighting
- Achievement badges and certificates preview
- Student success stories with photos
- Instructor profiles with credentials

### Key Pages Design

#### Home Page Sections
1. **Hero**: "Master CS & Security — Your Way"
   - Animated typing effect showing different career outcomes
   - Primary CTA: "Start Free" / Secondary: "View Curriculum"
   - Trust badges: Student count, completion rate, job placement %

2. **Learning Paths Preview**
   - 4 visual cards showing each path
   - Estimated time to complete
   - Skills you'll gain
   - Career outcomes

3. **How It Works**
   - Step-by-step visual (Self-paced → Projects → Cohort → Career)
   - CSBrainAI integration highlight

4. **Pricing Comparison**
   - Three tiers: Starter (free), Pro ($49/mo), Team (custom)
   - Feature comparison matrix
   - Money-back guarantee badge

5. **Success Stories**
   - Carousel of student testimonials with before/after
   - Companies where students now work (logos)

6. **CSBrainAI Integration**
   - Demo of AI tutor in action
   - "Your 24/7 learning companion" messaging

7. **CTA Section**
   - "Start Learning Today — First Module Free"
   - Email capture for free curriculum preview

#### Curriculum Page
- Filterable by: Path, Difficulty, Duration, Topic
- Each module shows: Title, description, duration, prerequisites
- Progress indicators for logged-in users
- "Powered by CSBrainAI" badge on AI-assisted modules

#### Pricing Page
- Side-by-side tier comparison
- FAQ accordion
- "Most Popular" badge on Pro tier
- Team tier with "Contact for Quote" CTA

### Tech Stack Recommendation
- **Framework**: Next.js 16 (App Router)
- **Auth**: NextAuth.js with magic link + OAuth
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Payments**: Stripe (subscriptions + one-time)
- **LMS Features**: Custom or integrate with Teachable API
- **AI Integration**: OpenRouter for CSBrainAI features
- **Analytics**: PostHog or Vercel Analytics

### Unique Features to Implement
1. **Learning Path Visualizer**: Interactive roadmap showing module dependencies
2. **CSBrainAI Chat**: Embedded AI tutor on every lesson page
3. **Code Playground**: Browser-based coding environment for practice
4. **Progress Dashboard**: Visual progress tracking with streaks
5. **Certificate Generator**: Shareable completion certificates
6. **Cohort Calendar**: Live session scheduling with timezone support

---

## 2. CSBrainAI (csbrainai.com)

### Overview
**Purpose**: AI learning companion for CS concepts — personalized explanations, concept breakdowns, and practice problems.

**Target Audience**:
- High Encode Learning students
- Self-taught developers
- CS students needing tutoring
- Anyone stuck on technical concepts

### Current Issues to Address
- Not clear what it does immediately
- No free tier to try
- Missing connection to High Encode Learning
- No differentiation from ChatGPT

### Proposed Site Structure

```
/                        # Home - Demo, features, pricing
/chat                    # Main chat interface (logged in)
/topics                  # Browse by CS topic
  /algorithms            # Algorithm explanations
  /data-structures       # Data structure deep dives
  /networking            # Networking concepts
  /security              # Security fundamentals
  /databases             # Database concepts
/playground              # Interactive code + AI explanation
/pricing                 # Free vs Pro comparison
/api                     # API access for developers
/login                   # Authentication
/signup                  # Registration
```

### Design Direction

**Theme**: Purple/Dark - AI-forward, futuristic
- Primary: `#a78bfa` (purple)
- Secondary: `#7c3aed` (violet)
- Accent: `#22d3ee` (cyan for AI elements)
- Background: `#0f0a1a` (deep purple-black)
- Glow effects on AI interactions

**Visual Elements**:
- Neural network patterns in background
- Pulsing "thinking" animations
- Code syntax highlighting
- Concept visualization diagrams (auto-generated)
- "Brain" mascot/icon throughout
- Matrix-style decorative elements

### Key Pages Design

#### Home Page Sections
1. **Hero**: "Your AI Study Buddy for CS"
   - Live demo: Type a concept, see AI explain it
   - "Try it free — no signup required"
   - Animated brain visualization

2. **How It Works**
   - Ask anything → Get personalized explanation → Practice with problems
   - Show example conversation

3. **Topics Coverage**
   - Visual topic cloud or grid
   - Click to see sample explanations
   - Depth indicators (beginner → advanced)

4. **Vs ChatGPT**
   - Side-by-side comparison
   - CSBrainAI advantages: CS-focused, curriculum-aligned, practice problems, progress tracking

5. **Integration with High Encode**
   - "Part of the High Encode ecosystem"
   - Seamless learning path integration

6. **Pricing**
   - Free: 10 questions/day, basic explanations
   - Pro ($9/mo): Unlimited, code execution, practice problems, progress tracking
   - Included with High Encode Pro subscription

7. **Testimonials**
   - Student quotes about "aha moments"
   - Specific concept breakthroughs

#### Chat Interface
- Full-screen chat with dark theme
- Topic selector sidebar
- Code block rendering with copy button
- "Generate practice problem" button
- Conversation history
- Concept bookmarking
- Share explanation feature

#### Topics Browser
- Visual cards for each topic area
- Popular questions in each topic
- Difficulty indicators
- "Start learning" CTA per topic

### Tech Stack Recommendation
- **Framework**: Next.js 16 (App Router)
- **Auth**: NextAuth.js (share auth with High Encode)
- **AI Backend**: OpenRouter (Claude for explanations)
- **Database**: Supabase (conversation history, user progress)
- **Code Execution**: Judge0 or Piston API
- **Real-time**: Vercel AI SDK for streaming responses

### Unique Features to Implement
1. **Concept Visualizer**: Auto-generate diagrams for data structures
2. **Socratic Mode**: AI asks guiding questions instead of direct answers
3. **Practice Problem Generator**: AI creates problems based on conversation
4. **Explanation Styles**: Toggle between "ELI5", "Technical", "With Code"
5. **Learning Path Integration**: Syncs progress with High Encode
6. **Flashcard Generator**: Turn conversations into study cards

---

## 3. Prompt Defenders (promptdefenders.com)

### Overview
**Purpose**: Tool for testing AI systems against prompt injection attacks and security vulnerabilities.

**Target Audience**:
- AI/LLM developers
- Security researchers
- Red team professionals
- Companies deploying AI chatbots
- CTF competitors

### Current Issues to Address
- Not clear what "prompt injection" means to newcomers
- No free tier to try the tool
- Missing educational content
- No community/leaderboard element

### Proposed Site Structure

```
/                        # Home - What is prompt injection, tool demo
/scanner                 # Main vulnerability scanner (logged in)
/playground              # Free prompt injection playground
/learn                   # Educational content
  /what-is-pi            # Intro to prompt injection
  /attack-types          # Catalog of attack types
  /defenses              # How to defend
  /case-studies          # Real-world examples
/leaderboard             # CTF-style challenge rankings
/challenges              # Practice challenges
/api                     # API access for CI/CD integration
/pricing                 # Free vs Pro comparison
/login                   # Authentication
/signup                  # Registration
```

### Design Direction

**Theme**: Red/Dark - Security-focused, hacker aesthetic
- Primary: `#ef4444` (red)
- Secondary: `#991b1b` (dark red)
- Accent: `#22d3ee` (cyan for safe/passed indicators)
- Background: `#0a0a0a` (pure black)
- Green for "safe" indicators, red for "vulnerable"

**Visual Elements**:
- Terminal-style interfaces
- Scan progress bars with security icons
- Attack type icons/illustrations
- Shield/lock iconography
- Code blocks with attack highlighting
- Warning/alert UI patterns

### Key Pages Design

#### Home Page Sections
1. **Hero**: "Is Your AI Vulnerable?"
   - Live demo: Paste a system prompt, see vulnerability scan
   - "Test your AI for free"
   - Animated "scanning" effect

2. **What is Prompt Injection?**
   - Simple visual explanation
   - Real-world attack examples
   - Why it matters (data leaks, reputation, costs)

3. **Attack Types We Detect**
   - Visual grid of attack categories
   - Click for details on each
   - Severity indicators

4. **How It Works**
   - Upload prompt/API → Automated attack simulation → Get report
   - Integration options (API, GitHub Action, CLI)

5. **Leaderboard Preview**
   - Top defenders this month
   - Challenge completion badges
   - "Join the community" CTA

6. **Pricing**
   - Free: 5 scans/month, playground access
   - Pro ($29/mo): Unlimited scans, API access, CI/CD integration
   - Enterprise: Custom, dedicated support, SLAs

7. **Trusted By**
   - Logos of companies/projects using it
   - Security certifications/compliance badges

#### Scanner Interface
- Paste system prompt or connect API
- Select attack vectors to test
- Real-time scan progress
- Detailed report with:
  - Vulnerability severity scores
  - Specific attack examples that worked
  - Remediation recommendations
  - Code snippets for fixes

#### Playground
- Interactive prompt injection sandbox
- Pre-built vulnerable AI to practice on
- Attack library to try
- Hints/solutions toggle
- Score tracking

#### Learn Section
- Article-style content
- Code examples
- Interactive demos embedded
- Quiz at end of each section
- Certificate for completion

#### Challenges/Leaderboard
- CTF-style challenges
- Difficulty tiers (Easy → Expert)
- Time-limited competitions
- Badges and achievements
- Public leaderboard with usernames

### Tech Stack Recommendation
- **Framework**: Next.js 16 (App Router)
- **Auth**: NextAuth.js
- **Database**: Supabase (scan history, user progress, leaderboard)
- **AI Testing**: Custom attack library + OpenRouter for target simulation
- **Queue**: Upstash Redis for scan job queuing
- **Reporting**: PDF generation for enterprise reports

### Unique Features to Implement
1. **One-Click Scan**: Paste prompt, get instant vulnerability report
2. **Attack Library**: 50+ documented attack vectors
3. **GitHub Action**: "prompt-defenders/scan" for CI/CD
4. **Defense Recommendations**: AI-generated fixes for each vulnerability
5. **Leaderboard System**: Points, badges, monthly competitions
6. **API Fuzzer**: Automated testing against deployed AI APIs
7. **Compliance Reports**: SOC2/GDPR-focused security reports

---

## Shared Infrastructure

### Cross-Site Authentication
- Implement shared auth across all three sites
- Single sign-on experience
- Unified user profile

### Shared Design System
- Extend current ds-* components to support all three themes
- Add new components: Card, Modal, Table, Tabs, Code Block
- Shared animation utilities

### Shared Backend Services
- User management service
- Billing/subscription service (Stripe)
- Analytics pipeline

### URL Structure
- Main: cs-learning.me
- Education: highencodelearning.com
- AI Tutor: csbrainai.com
- Security: promptdefenders.com

---

## Implementation Priority

### Phase 1 (Weeks 1-2): Foundation
- [ ] Set up monorepo structure (Turborepo)
- [ ] Implement shared auth system
- [ ] Extend design system for all themes
- [ ] Create shared component library

### Phase 2 (Weeks 3-4): CSBrainAI
- [ ] Build chat interface
- [ ] Implement AI backend with OpenRouter
- [ ] Create topic browser
- [ ] Add code execution playground
- [ ] Launch with free tier

### Phase 3 (Weeks 5-7): High Encode Learning
- [ ] Build curriculum browser
- [ ] Implement learning paths
- [ ] Create student dashboard
- [ ] Integrate CSBrainAI
- [ ] Set up Stripe subscriptions
- [ ] Launch with free tier

### Phase 4 (Weeks 8-10): Prompt Defenders
- [ ] Build scanner interface
- [ ] Implement attack library
- [ ] Create playground
- [ ] Build leaderboard system
- [ ] Add learn section
- [ ] Launch with free tier

### Phase 5 (Ongoing): Polish & Growth
- [ ] SEO optimization for all sites
- [ ] Content marketing (blog posts, videos)
- [ ] Community building
- [ ] Feature iterations based on feedback

---

## Success Metrics

### High Encode Learning
- Monthly active students
- Course completion rate
- Cohort enrollment rate
- Student NPS score

### CSBrainAI
- Daily active users
- Questions asked per user
- Pro conversion rate
- User retention (7-day, 30-day)

### Prompt Defenders
- Scans performed
- Vulnerabilities detected
- Pro/Enterprise conversions
- Leaderboard engagement

---

*Document created: January 2026*
*Last updated: January 17, 2026*

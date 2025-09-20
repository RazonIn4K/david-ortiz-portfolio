# David Ortiz - Portfolio Website

A professional portfolio website showcasing cloud support engineering and database optimization expertise. Built with modern web technologies and optimized for performance, accessibility, and SEO.

## 🚀 Features

- **AI Chat Assistant**: OpenRouter-powered chat with strict session limits (3 prompts/user)
- **Advanced Animation System**: Cross-browser compatible starfield background with 210+ tech icons
- **Performance Monitoring**: Real-time FPS monitoring with adaptive quality adjustment
- **WebGL Particle System**: Hardware-accelerated particles with Canvas 2D fallback
- **Interactive Elements**: Advanced cursor trail, magnetic field effects, and smooth transitions
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark/Light Theme**: Toggle between themes with session persistence
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation support
- **Performance Optimized**: Lighthouse scores 90+ across all categories
- **SEO Ready**: Open Graph meta tags, structured data, and optimized content
- **Analytics Integration**: Google Analytics 4 with event tracking
- **Contact Form**: Formspree integration with client-side validation
- **Project Embeds**: Beautiful.ai presentation embeds with fallback links
- **Icons8 Integration**: Professional skill icons loaded from CDN

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Animation**: WebGL with Canvas 2D fallback, CSS transitions
- **AI Integration**: OpenRouter API with Llama 3.1 model
- **Icons**: Icons8.com CDN for professional skill icons
- **Browser Compatibility**: Feature detection, vendor prefixes, graceful degradation
- **Performance**: Hardware acceleration, adaptive quality systems
- **Session Management**: LocalStorage with 24-hour cooldown periods
- **Rate Limiting**: 30-second intervals between AI queries
- **Token Management**: 100-token limit per query with automatic termination
- **Hosting**: GitHub Pages with Vercel deployment support
- **Analytics**: Google Analytics 4
- **Forms**: Formspree
- **Embeds**: Beautiful.ai
- **Domain**: Custom domain with HTTPS

## 📁 Project Structure

```
/
├── index.html          # Main page with AI chat and all sections
├── styles.css          # Responsive CSS with AI chat interface
├── script.js           # AI chat system, animations, and interactions
├── config.js          # API keys and configuration (OpenRouter, Google Maps)
├── assets/             # Images and media files
│   ├── david-ortiz-avatar.svg  # Profile image
│   └── og-image.png    # Open Graph social sharing image
├── 404.html           # Custom error page for GitHub Pages
├── robots.txt         # SEO crawling instructions
├── sitemap.xml        # Site structure for search engines
├── vercel.json        # Vercel deployment configuration
├── manifest.json      # PWA manifest
├── ARCHITECTURE.md    # Technical architecture documentation
├── DEPLOYMENT.md      # Deployment guide
└── README.md          # This file
```

## 🎨 Design Highlights

### Color Scheme
- **Dark Theme** (default): Deep blue background with light text
- **Light Theme**: Clean white background with dark text
- **Accent Color**: Professional blue for CTAs and highlights

### Typography
- **Font Family**: Segoe UI system font stack
- **Responsive Sizing**: Fluid typography that scales with viewport
- **Hierarchy**: Clear visual hierarchy with proper heading structure

### Layout
- **Mobile-First**: Designed for mobile then enhanced for larger screens
- **Grid Systems**: CSS Grid for skills and projects sections
- **Sticky Navigation**: Fixed header for easy section navigation

### AI Chat Interface
- **Session Management**: 3 prompts per user with 24-hour cooldown
- **Rate Limiting**: 30-second intervals between queries
- **Token Control**: 100-token limit per query with automatic termination
- **Content Filtering**: Only responds to creator-related questions
- **Interaction Logging**: All conversations logged for moderation
- **Responsive Design**: Adapts to all screen sizes

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## ♿ Accessibility Features

- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast ratios (WCAG 2.1 AA)
- Screen reader announcements
- Focus indicators
- Skip navigation links

## ⚡ Performance Optimizations

- Hardware-accelerated WebGL rendering with Canvas 2D fallback
- Real-time performance monitoring with adaptive quality adjustment
- Critical CSS inlined
- Lazy loading for images and embeds
- Optimized asset sizes (<50KB per icon)
- Minified CSS and JavaScript
- Resource hints and preloading
- Web font optimization

## 🎮 Interactive Features

### Animation System
- **Starfield Background**: 210+ animated tech icons with random opacity for twinkling effect
- **WebGL Particles**: Hardware-accelerated particle system with automatic fallback
- **Cursor Trail**: Advanced mouse tracking with smooth trail effects (desktop only)
- **Magnetic Field**: Interactive elements that respond to cursor proximity

### Keyboard Controls (Debug Mode)
- **R**: Toggle rainbow mode for starfield icons
- **T**: Toggle cursor trail visibility
- **M**: Toggle magnetic field effects

### Browser Compatibility
- Automatic feature detection and graceful degradation
- WebGL → Canvas 2D fallback for older browsers
- Touch device optimization with reduced animations
- Internet Explorer support with simplified effects

## 🔧 Setup Instructions

### 1. Repository Setup
1. Create a new repository named `RazonIn4K.github.io`
2. Clone this repository or upload files
3. Enable GitHub Pages in repository settings

### 2. Custom Domain Configuration
1. Add your domain to the CNAME file
2. Configure DNS with your domain provider:
   ```
   Type    Host    Value
   A       @       185.199.108.153
   A       @       185.199.109.153
   A       @       185.199.110.153
   A       @       185.199.111.153
   CNAME   www     RazonIn4K.github.io
   ```
3. Enable "Enforce HTTPS" in repository settings

### 3. Analytics Setup
1. Create a Google Analytics 4 property
2. Replace `GA_MEASUREMENT_ID` in index.html with your tracking ID

### 4. Contact Form Setup
1. Create a Formspree account
2. Replace `YOUR_FORM_ID` in index.html with your Formspree form ID

### 5. Environment Setup (Required for AI Chat)
1. **Create `.env` file** in the root directory:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your API keys:
   ```env
   # OpenRouter AI Configuration
   OPENROUTER_API_KEY=your-openrouter-api-key-here
   OPENROUTER_PRIMARY_MODEL=x-ai/grok-4-fast:free
   OPENROUTER_FALLBACK_MODEL=z-ai/glm-4.5-air:free

   # MongoDB Configuration (for chat logging)
   MONGODB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/
   MONGODB_USERNAME=your-username
   MONGODB_DATABASE=personal_website

   # Optional: Customize session limits
   AI_CHAT_SESSION_LIMIT=3
   AI_CHAT_TOKEN_LIMIT=100
   AI_CHAT_COOLDOWN_HOURS=24
   AI_CHAT_RATE_LIMIT_SECONDS=30
   ```

**AI Chat Features:**
- ✅ **3 prompts per session per user** with 24-hour cooldown
- ✅ **100 tokens max per query** (≈75 words)
- ✅ **30-second rate limiting** between queries
- ✅ **Dual model support**: Primary `x-ai/grok-4-fast:free`, fallback `z-ai/glm-4.5-air:free`
- ✅ **Only responds to creator-related questions**
- ✅ **Logs all interactions** for moderation (localStorage + MongoDB ready)
- ✅ **Session management** with localStorage persistence
- ✅ **Content filtering** with keyword validation
- ✅ **Automatic termination** on limit violations

### 6. Content Customization

#### Update Personal Information
- Replace "David Ortiz" with your name throughout the files
- Update email, LinkedIn, and Calendly links in the contact section
- Modify the bio and project descriptions

#### Add Project Content
- Replace placeholder Beautiful.ai embed URLs with your actual presentation links
- Update GitHub repository links
- Modify project descriptions and metrics

#### Skill Icons
- Icons are loaded from Icons8.com CDN
- Update icon URLs in index.html if changing technologies
- Use iOS style icons for consistent appearance
- All icons are optimized and load from reliable CDN

#### Custom Branding
- Add your favicon.ico to the assets directory
- Create an og-image.png (1200x630px) for social sharing
- Update meta descriptions and titles

## 🚀 Deployment

The site is configured for automatic deployment through GitHub Pages:

1. Push changes to the main branch
2. GitHub Pages will automatically build and deploy
3. Site will be available at your custom domain (or username.github.io)

## 📊 Analytics Events

The site tracks the following events for analytics:
- Page views and section views
- Theme toggle usage
- Navigation clicks
- Form submissions
- CTA button clicks
- Embed errors and loading times

## 🔒 Security Features

- Content Security Policy (CSP) headers
- HTTPS enforcement
- Secure external resource loading
- Form spam protection via Formspree
- No sensitive data exposure

## 🧪 Testing

### Performance Testing
- Use Lighthouse for performance audits
- Target 90+ scores across all categories
- Test Core Web Vitals (LCP <2.5s, INP <200ms, CLS <0.1)

### Accessibility Testing
- Use axe-core or WAVE for automated testing
- Test keyboard navigation manually
- Verify screen reader compatibility
- Check color contrast ratios

### Cross-Browser Testing
- Chrome, Firefox, Safari, Edge (latest versions)
- Internet Explorer 11 with graceful degradation
- iOS Safari and Chrome Mobile
- Test on various screen sizes
- Verify WebGL fallback to Canvas 2D on older devices

## 📝 Content Guidelines

### Project Descriptions
- Include quantifiable metrics (e.g., "87% performance improvement")
- Focus on technical achievements and business impact
- Mention specific technologies and methodologies used

### Skills Section
- Include 10-15 most relevant technical skills
- Use recognizable icons from trusted sources
- Group by categories (cloud, databases, tools, etc.)

## 🤝 Contributing

This is a personal portfolio template. Feel free to:
- Fork and adapt for your own use
- Submit issues for bugs or improvements
- Suggest new features via pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions about implementation or customization:
- Create an issue in this repository
- Check the documentation comments in the code
- Review ARCHITECTURE.md for technical details
- Check DEPLOYMENT.md for hosting guidance

---

**Built with modern web standards and optimized for GitHub Pages deployment.**
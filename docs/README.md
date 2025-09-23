# David Ortiz - Portfolio Website

A professional portfolio website showcasing cloud support engineering and database optimization expertise. Built with modern web technologies and optimized for performance, accessibility, and SEO.

## 🔄 Recent Updates (September 22, 2025)

- ✅ **Comprehensive Security Audit**: Zero vulnerabilities found, strong security posture confirmed
- ✅ **Fixed consent-banner.js path**: Resolved 404 error for proper GDPR compliance
- ✅ **Reorganized Project Structure**: Moved scripts to organized directories
- ✅ **UI Testing with Playwright**: Automated testing suite implemented
- ✅ **MongoDB Indexes Verified**: Optimal database performance confirmed
- ✅ **Documentation Updated**: Security audit and validation reports added

## 🚀 Features

- **MongoDB Analytics**: Real-time user behavior tracking with MongoDB Atlas backend
- **Vercel Analytics**: Official Vercel Analytics for web analytics and visitor tracking
- **Speed Insights**: Vercel Speed Insights for Web Vitals and performance monitoring
- **GDPR Cookie Consent**: Advanced consent management with localStorage persistence and analytics control
- **Enhanced AI Chat System**: MongoDB-integrated chat with rate limiting, session management, and offline support
- **Advanced Saturation Control**: Animation-level specific saturation controls with WCAG accessibility safeguards
- **Intelligent Automation Showcase**: Static display of MongoDB-backed automation playbooks
- **Advanced Animation System**: Cross-browser compatible starfield background with 210+ tech icons
- **Performance Monitoring**: Real-time FPS monitoring with adaptive quality adjustment
- **WebGL Particle System**: Hardware-accelerated particles with Canvas 2D fallback
- **Interactive Elements**: Advanced cursor trail, magnetic field effects, and smooth transitions
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation support and reduced motion support
- **Performance Optimized**: Lighthouse scores 90+ across all categories
- **SEO Ready**: Open Graph meta tags, structured data, and optimized content
- **Contact Form**: MongoDB-backed submission handling with spam detection
- **Project Embeds**: Beautiful.ai presentation embeds with fallback links
- **Icons8 Integration**: Professional skill icons with theme-aware visibility
- **Map Integration**: Google Maps with SVG fallback for location display

## 🛠 Tech Stack

### **Core Frontend**
- **HTML5**: Semantic markup with ARIA accessibility support
- **CSS3**: Modern CSS with custom properties, Grid, Flexbox, and cross-browser vendor prefixes
- **JavaScript (ES6+)**: Modular architecture with class-based components and progressive enhancement
- **WebGL**: Hardware-accelerated graphics with automatic Canvas 2D fallback

### **Backend & Database**
- **MongoDB Atlas**: Cloud database with optimized indexes and TTL policies
- **Node.js**: Serverless functions for API endpoints
- **Vercel Functions**: Edge computing with automatic scaling

### **Development Tools**
- **Stylelint**: CSS linting with standard configuration
- **Terser**: JavaScript minification and optimization
- **Build System**: Custom Node.js build scripts with minification

### **Animation & Graphics**
- **WebGL**: Hardware-accelerated particle systems
- **CSS Animations**: Smooth transitions with animation-level controls
- **Saturation Control**: WCAG-compliant visual effects with accessibility safeguards

### **Analytics & Monitoring**
- **MongoDB Analytics**: Custom event tracking with offline support
- **Vercel Analytics**: Official visitor tracking and page analytics
- **Vercel Speed Insights**: Core Web Vitals and performance monitoring

### **Third-Party Services**
- **Icons8.com**: Professional icon CDN with theme-aware styling
- **Formspree**: Contact form backend with spam protection
- **Beautiful.ai**: Project presentation embeds
- **Google Maps API**: Location visualization with SVG fallback

### **Security & Performance**
- **Content Security Policy**: XSS protection with strict CSP headers
- **Rate Limiting**: Multi-tier protection (Analytics: 60/min, Contact: 5/hour, Chat: 10/min)
- **Input Validation**: Comprehensive sanitization and spam detection
- **GDPR Compliance**: Cookie consent management with user preference storage

### **Deployment & Hosting**
- **Vercel**: Edge deployment with automatic HTTPS
- **GitHub**: Version control and automated deployments
- **Custom Domain**: Professional domain with SSL certificates

## 📁 Project Structure

```
/
├── index.html          # Main page with automation showcase and contact form
├── vercel.json         # Vercel deployment configuration
├── manifest.json       # PWA manifest for mobile app-like experience
├── 404.html           # Custom error page with professional styling
├── robots.txt         # SEO configuration for search engines
├── sitemap.xml        # Site structure for search engine indexing
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── DATABASE_STRUCTURE.md # MongoDB database schema and structure documentation
├── PRODUCTION_DEPLOYMENT_GUIDE.md # Production deployment and verification guide
├── VALIDATION_REPORT.md # Comprehensive project validation and quality report
│
├── scripts/          # Build and development tools
│   └── build-minify.js      # JavaScript minification and optimization
│
├── src/               # Source code organized by type
│   ├── js/           # Client-side JavaScript
│   │   ├── script.js           # Core animations, theme management, and saturation controls
│   │   ├── enhanced-chat-system.js # MongoDB-integrated AI chat with rate limiting
│   │   ├── consent-banner.js   # GDPR-compliant cookie consent with analytics control
│   │   ├── analytics.js        # Vercel Analytics integration (CDN-friendly)
│   │   ├── analytics-tracker.js # Advanced analytics tracking with offline support
│   │   ├── speed-insights.js   # Vercel Speed Insights for performance monitoring
│   │   ├── progressive-enhancement.js # Class enhancement patterns and utilities
│   │   └── lazy-loader.js      # Optimized resource loading and performance
│   │
│   ├── css/          # Stylesheets
│   │   └── styles.css          # Responsive CSS with theme-aware styling
│   │
│   ├── services/     # Configuration and services
│   │   └── config.js           # Configuration with environment variable support
│   │
│   └── utils/        # Utility scripts and tools
│       └── scripts/  # Database, testing, and optimization utilities
│           ├── setup-mongodb-indexes.js # Database optimization and setup
│           ├── test-integrations.js     # Comprehensive testing suite
│           ├── performance-optimizer.js # Performance optimization and monitoring
│           └── production-verification.js # Production deployment verification
│
├── assets/            # Static assets and images
│   ├── david-ortiz-avatar.svg    # Profile image
│   ├── chicago-map.svg           # Location map fallback
│   └── og-image.png              # Open Graph social sharing image
├── api/              # Serverless function endpoints (MongoDB integration)
│   ├── analytics.js      # Analytics data collection endpoint with rate limiting
│   ├── contact.js        # Contact form submission handling with spam detection
│   ├── chat.js          # AI chat API endpoint with session management
│   ├── lightweight-storage.js # Lightweight chat logging with fallback support
│   └── (MongoDB integration embedded in individual endpoints)
├── docs/             # Documentation and guides
│   ├── ARCHITECTURE.md   # Technical architecture overview
│   ├── DEPLOYMENT.md     # Deployment and hosting guide
│   ├── GEMINI.md        # Gemini AI integration documentation
│   └── MONGODB_INTEGRATION.md # MongoDB setup and usage guide
├── SECURITY_AUDIT.md # Comprehensive security assessment report
└── README.md         # This comprehensive documentation
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

### MongoDB Integration
- **Real-time Analytics**: User behavior tracking with batching and offline support
- **Contact Management**: Form submissions stored with spam detection and validation
- **Performance Monitoring**: Speed Insights integration with MongoDB storage
- **Rate Limiting**: Multi-tier protection (60/min analytics, 5/hour contact, 10/min chat)
- **Security Features**: Input sanitization, PII detection, TTL auto-cleanup
- **Progressive Enhancement**: Graceful fallbacks for all database features

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
3. Note: Form has comprehensive validation and spam detection built-in

### 5. Environment Setup (Required for MongoDB Integration)
1. **Create `.env` file** in the root directory:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your credentials:
   ```env
   # MongoDB Atlas Configuration
   MONGODB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/
   MONGODB_DATABASE=personal_website_cs-learning
   MONGODB_USERNAME=your-username

   # Google Maps API Key
   GOOGLE_MAPS_API_KEY=your-google-maps-api-key

   ```

### 6. Database Setup
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup MongoDB collections and indexes**:
   ```bash
   node scripts/setup-mongodb-indexes.js setup
   ```

3. **Test integration**:
   ```bash
   node scripts/test-integrations.js
   ```

**MongoDB Features:**
- ✅ **Real-time analytics** with batching and offline support
- ✅ **Contact form management** with spam detection
- ✅ **Performance monitoring** with Speed Insights integration
- ✅ **Rate limiting** across all endpoints
- ✅ **Automatic cleanup** with TTL indexes
- ✅ **Progressive enhancement** with graceful fallbacks

**Database Collections:**
- **`chat_logs`**: AI conversation logging (90-day TTL)
- **`analytics_events`**: User behavior tracking (1-year TTL)
- **`contact_submissions`**: Contact form submissions (2-year TTL)
- **Database**: `personal_website_cs-learning`

### 7. Analytics & Performance Monitoring

The site features a comprehensive triple-analytics setup for maximum insight:

**🔄 MongoDB Analytics** (Custom)
- Real-time user behavior tracking with offline support
- Batched event collection with localStorage fallback
- Custom dashboards via MongoDB Atlas views
- Rate limited: 60 requests/minute per IP
- GDPR-compliant with user consent controls

**📊 Vercel Analytics** (Official)
- Visitor tracking and page view analytics
- No build process required - static-friendly CDN loading
- Automatically detects domain configuration
- Console verification: `✅ Vercel Analytics loaded successfully`
- Respects cookie consent preferences

**⚡ Speed Insights** (Web Vitals)
- Core Web Vitals monitoring (LCP, FID, CLS)
- Performance regression detection
- Real User Monitoring (RUM) data
- Console verification: `✅ Speed Insights loaded successfully`

### 8. API Endpoints & Rate Limiting

**Available Endpoints:**
```
/api/analytics      - Event tracking (POST) - 60 req/min per IP
/api/contact        - Form submissions (POST) - 5 req/hour per IP
/api/chat           - AI chat interactions (POST) - 10 req/min per user
/api/lightweight-storage - Chat logging (POST) - 10 req/min per user
```

**API Response Format:**
```json
{
  "success": true,
  "message": "Data processed successfully",
  "data": {
    "id": "unique-identifier",
    "timestamp": "2025-09-22T...",
    "rateLimit": {
      "remaining": 8,
      "resetTime": 1695398400000
    }
  }
}
```

**Error Handling:**
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "Please wait before sending another request",
  "retryAfter": 60
}
```

**Implementation Details:**
- All services load via secure CDN with CSP compliance
- Graceful degradation if analytics services are blocked
- GDPR consent integration for all tracking services
- Session management with localStorage persistence
- Content filtering with keyword validation
- Automatic rate limit reset and user notification

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

### **API Security & Rate Limiting**
- **Contact Form**: 5 submissions/hour per IP with spam detection
- **AI Chat System**: 10 requests/minute per user with session tracking
- **Analytics Collection**: 60 requests/minute per IP with data validation
- **Input Validation**: Comprehensive sanitization on all forms and API endpoints
- **Spam Detection**: Multi-layer protection with keyword filtering, link analysis, and pattern detection

### **Data Protection & Privacy**
- **GDPR Compliance**: Cookie consent management with user preference storage
- **PII Detection**: Automatic detection and redaction of sensitive information
- **TTL Policies**: Automatic data cleanup (Chat: 90 days, Analytics: 1 year, Contact: 2 years)
- **Environment Variables**: Secure configuration management for sensitive keys
- **MongoDB Security**: Encrypted connections with Atlas, optimized indexes

### **Application Security**
- **Content Security Policy**: Strict CSP headers preventing XSS attacks
- **CORS Configuration**: Properly configured cross-origin resource sharing
- **HTTPS Enforcement**: Automatic SSL/TLS via Vercel deployment
- **Input Sanitization**: Server-side validation and sanitization for all user inputs
- **Error Handling**: Secure error responses that don't leak sensitive information
- **Zero Vulnerabilities**: Confirmed through npm audit and security scanning

## 🧪 Testing

### Automated Testing Suite
- **Playwright Integration**: UI testing with browser automation
- **Form Validation**: Contact form submission testing
- **API Endpoint Testing**: All endpoints verified for security
- **Network Analysis**: Request monitoring and performance tracking
- **Console Monitoring**: Error detection and debugging

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
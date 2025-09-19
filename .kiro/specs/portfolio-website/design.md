# Design Document

## Overview

The portfolio website will be a single-page application (SPA) built with vanilla HTML, CSS, and JavaScript to ensure fast loading times and broad compatibility. The design follows a mobile-first approach with progressive enhancement for larger screens. The site will leverage modern web standards while maintaining accessibility and performance best practices.

## Architecture

### Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Hosting**: GitHub Pages with custom domain
- **Analytics**: Google Analytics 4 (GA4)
- **Forms**: Formspree for contact form handling
- **Embeds**: Beautiful.ai iframe integration
- **Icons**: Optimized SVG/PNG assets (<50KB each)

### Site Structure

```
/
├── index.html          # Main page with all sections
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── assets/             # Images, icons, and media
│   ├── icons/          # Skill icons (SVG/PNG)
│   ├── og-image.png    # Open Graph social sharing image
│   └── favicon.ico     # Site favicon
├── CNAME              # Custom domain configuration
├── robots.txt         # SEO crawling instructions
├── sitemap.xml        # Site structure for search engines
└── 404.html           # Custom error page for GitHub Pages
```

## Components and Interfaces

### 1. Navigation Header

- **Purpose**: Provides site navigation and theme toggle
- **Components**:
  - Logo/name (clickable, returns to top)
  - Navigation menu (Home, About, Skills, Projects, Contact)
  - Theme toggle button (dark/light mode)
- **Behavior**: Sticky positioning, smooth scroll to sections
- **Accessibility**: ARIA labels, keyboard navigation support

### 2. Hero Section

- **Purpose**: First impression with clear value proposition
- **Components**:
  - Primary heading with name
  - Tagline describing role and value
  - Call-to-action button linking to projects
- **Design**: Full-width, centered content, strong visual hierarchy
- **Performance**: Above-the-fold optimization for Core Web Vitals

### 3. About Section

- **Purpose**: Personal introduction and background
- **Components**:
  - 150-word bio paragraph
  - Optional profile image
  - Key achievements and metrics
- **Content Strategy**: Focus on quantifiable results and student tool usage

### 4. Skills & Tools Grid

- **Purpose**: Visual showcase of technical capabilities
- **Components**:
  - 10-15 skill cards with icons and labels
  - Responsive grid layout (1-5 columns based on screen size)
  - Hover effects for interactivity
- **Icon Strategy**: Free SVG icons from reliable sources, optimized for web

### 5. Projects Showcase

- **Purpose**: Demonstrate practical experience and results
- **Components**:
  - 3-5 project cards with consistent layout
  - Project title, description, and metrics
  - Beautiful.ai iframe embeds where applicable
  - GitHub repository links
- **Layout**: Card-based design with responsive grid

### 6. Contact Section

- **Purpose**: Multiple contact methods for potential employers
- **Components**:
  - Formspree-powered contact form
  - Alternative contact links (email, LinkedIn, Calendly)
  - Form validation and user feedback
- **Security**: Client-side validation, server-side handling via Formspree

### 7. Footer

- **Purpose**: Site credits and additional links
- **Components**:
  - Copyright notice
  - GitHub Pages hosting credit
  - Additional social links if needed

## Data Models

### Theme Configuration

```javascript
const themeConfig = {
  dark: {
    '--bg-color': '#0b1220',
    '--text-color': '#e7ecf3',
    '--accent-color': '#1e3a8a',
    '--card-bg': '#121a2c'
  },
  light: {
    '--bg-color': '#f7f9fc',
    '--text-color': '#0b1220',
    '--accent-color': '#1e3a8a',
    '--card-bg': '#ffffff'
  }
}

// Theme persistence: Use sessionStorage per requirements, 
// with option to upgrade to localStorage for better UX
```

### Project Data Structure

```javascript
const projects = [
  {
    title: "Database Optimization Case",
    description: "Improved query latency by 87% via indexing/normalization",
    metrics: "Reduced query time from 10s to 1.3s",
    technologies: ["SQL", "Python", "PostgreSQL"],
    embedUrl: "https://www.beautiful.ai/player/-DECK-ID-",
    fallbackLink: "https://www.beautiful.ai/view/-DECK-ID-",
    repoUrl: "https://github.com/username/db-optimization"
  }
]
```

### Skills Data Structure

```javascript
const skills = [
  {
    name: "GitHub",
    iconUrl: "assets/icons/github.svg",
    category: "development"
  },
  {
    name: "GCP",
    iconUrl: "assets/icons/gcp.svg",
    category: "cloud"
  }
]
```

## Error Handling

### Form Validation

- **Client-side**: Real-time validation for email format and required fields
- **Server-side**: Formspree handles spam protection and delivery
- **User Feedback**: Clear error messages and success confirmations
- **Fallback**: Alternative contact methods if form fails

### Embed Failures

- **Beautiful.ai iframes**: Graceful degradation with fallback links
- **Icon loading**: Alt text and placeholder styling for failed images
- **Analytics**: Non-blocking implementation to prevent site breakage

### Browser Compatibility

- **Progressive Enhancement**: Core functionality works without JavaScript
- **CSS Fallbacks**: Graceful degradation for unsupported features
- **Polyfills**: Minimal use, prefer native browser features

## Testing Strategy

### Performance Testing

- **Core Web Vitals**: Target LCP <2.5s, INP <200ms, CLS <0.1
- **Lighthouse Audits**: Aim for 90+ scores across all categories
- **Real-World Testing**: Use WebPageTest and PageSpeed Insights for validation
- **Network Conditions**: Test on 3G and slow 4G connections
- **Image Optimization**: Ensure all assets are properly compressed

### Accessibility Testing

- **WCAG 2.1 AA Compliance**: Color contrast, keyboard navigation, screen readers
- **Automated Testing**: Use axe-core or similar tools for validation
- **Manual Testing**: Keyboard-only navigation, screen reader testing
- **Focus Management**: Visible focus indicators for all interactive elements

### Cross-Browser Testing

- **Primary Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Testing**: iOS Safari, Chrome Mobile, Samsung Internet
- **Legacy Support**: CSS variables have universal support in 2025, but include fallbacks for edge cases
- **Feature Detection**: Use progressive enhancement for newer features

### Responsive Design Testing

- **Breakpoints**: 320px (mobile), 768px (tablet), 1024px+ (desktop)
- **Device Testing**: Real device testing on various screen sizes
- **Orientation**: Both portrait and landscape modes

## SEO and Social Optimization

### Meta Tags Strategy

```html
<title>[Name] - Cloud Support Engineer & Database Specialist</title>
<meta name="description" content="Professional portfolio showcasing cloud and database projects with quantifiable results.">
<meta property="og:title" content="[Name] - Cloud Support Portfolio">
<meta property="og:description" content="Cloud Support Engineer & Database Specialist portfolio">
<meta property="og:image" content="https://domain.com/assets/og-image.png">
<meta property="og:url" content="https://domain.com">
```

### Structured Data

- **JSON-LD**: Person schema for enhanced search results
- **Breadcrumbs**: Navigation structure for search engines
- **Contact Information**: Structured data for contact details

### Performance Optimization

- **Critical CSS**: Inline above-the-fold styles
- **Resource Hints**: Preload important assets
- **Image Optimization**: WebP format with fallbacks
- **Minification**: Compress CSS and JavaScript for production

## Deployment Architecture

### GitHub Pages Configuration

- **Repository**: `username.github.io` for user pages
- **Branch**: Deploy from `main` branch root directory
- **Custom Domain**: CNAME file with apex domain
- **HTTPS**: Enforce HTTPS in repository settings

### DNS Configuration (Name.com)

```
Type    Host    Value
A       @       185.199.108.153
A       @       185.199.109.153  
A       @       185.199.110.153
A       @       185.199.111.153
AAAA    @       2606:50c0:8000::153
AAAA    @       2606:50c0:8001::153
AAAA    @       2606:50c0:8002::153
AAAA    @       2606:50c0:8003::153
CNAME   www     username.github.io
```

### Security Considerations

- **HTTPS Enforcement**: Automatic SSL certificate via GitHub Pages
- **Content Security Policy**: Implement CSP via meta tag in HTML head:

  ```html
  <meta http-equiv="Content-Security-Policy" 
        content="default-src 'self'; 
                 script-src 'self' https://www.googletagmanager.com https://formspree.io; 
                 frame-src https://www.beautiful.ai; 
                 img-src 'self' data: https:; 
                 style-src 'self' 'unsafe-inline';">
  ```

- **Form Security**: Formspree handles spam protection and validation
- **External Resources**: Use trusted CDNs and validate all external embeds

## Integration Specifications

### Google Analytics 4

- **Implementation**: Global site tag (gtag.js)
- **Events**: Track CTA clicks, form submissions, project views
- **Privacy**: Respect user preferences and GDPR compliance

### Formspree Integration

- **Endpoint**: `https://formspree.io/f/{form_id}`
- **Validation**: Client-side validation with server-side processing
- **Notifications**: Email notifications for form submissions

### Beautiful.ai Embeds

- **Implementation**: Responsive iframe with loading="lazy"
- **Fallback**: Direct links if embed fails to load
- **Performance**: Lazy loading to improve initial page load

This design provides a solid foundation for implementing all requirements while maintaining performance, accessibility, and user experience standards.

# Deployment Guide for Portfolio Website

This guide walks you through deploying your portfolio website to GitHub Pages with a custom domain.

## 🚀 Quick Deployment Checklist

### Pre-Deployment
- [ ] Replace all placeholder content with your actual information
- [ ] Add skill icons to `assets/icons/` directory
- [ ] Update Google Analytics ID in `index.html`
- [ ] Configure Formspree form ID in `index.html`
- [ ] Update CNAME file with your domain
- [ ] Test website locally (open index.html in browser)

### GitHub Repository Setup
- [ ] Create repository named `RazonIn4K.github.io` (replace with your GitHub username)
- [ ] Upload all website files to the repository
- [ ] Ensure main branch contains all files in root directory
- [ ] Add appropriate repository description

### GitHub Pages Configuration
- [ ] Go to repository Settings → Pages
- [ ] Set Source to "Deploy from a branch"
- [ ] Select "main" branch and "/ (root)" folder
- [ ] Enable "Enforce HTTPS"
- [ ] Wait for initial deployment (5-10 minutes)

### Custom Domain Setup (Optional)
- [ ] Purchase domain from Name.com or preferred registrar
- [ ] Configure DNS records (see DNS Configuration section)
- [ ] Update CNAME file with your domain
- [ ] Verify domain in GitHub Pages settings
- [ ] Wait for SSL certificate generation (up to 24 hours)

## 📝 Detailed Instructions

### 1. Content Customization

#### Personal Information
```html
<!-- Update in index.html -->
<title>Your Name - Cloud Support Engineer & Database Specialist</title>
<h1 class="hero-title">Your Name</h1>
<p class="hero-tagline">Your Professional Title</p>
```

#### Contact Information
```html
<!-- Update contact links -->
<a href="mailto:your.email@example.com">your.email@example.com</a>
<a href="https://www.linkedin.com/in/david-ortiz-210190205/">LinkedIn Profile</a>
<a href="https://calendly.com/yourprofile">Schedule a Meeting</a>
```

#### Analytics Setup
```html
<!-- Replace GA_MEASUREMENT_ID with your Google Analytics 4 ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Form Setup
```html
<!-- Replace YOUR_FORM_ID with your Formspree form ID -->
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### 2. GitHub Repository Creation

1. **Create Repository**
   - Go to GitHub.com and click "New repository"
   - Name it `RazonIn4K.github.io` (use your actual GitHub username)
   - Make it public
   - Don't initialize with README (you already have one)

2. **Upload Files**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio website commit"
   git branch -M main
   git remote add origin https://github.com/RazonIn4K/RazonIn4K.github.io.git
   git push -u origin main
   ```

### 3. GitHub Pages Setup

1. **Enable GitHub Pages**
   - Navigate to your repository on GitHub
   - Go to Settings → Pages (in left sidebar)
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

2. **Enable HTTPS**
   - Check "Enforce HTTPS" checkbox
   - This may take a few minutes to become available

3. **Verify Deployment**
   - Your site will be available at `https://RazonIn4K.github.io`
   - Initial deployment can take 5-10 minutes
   - Check the Actions tab for deployment status

### 4. DNS Configuration

#### For Name.com (or similar registrar)

**A Records (for apex domain)**
```
Type: A
Host: @
Value: 185.199.108.153

Type: A
Host: @
Value: 185.199.109.153

Type: A
Host: @
Value: 185.199.110.153

Type: A
Host: @
Value: 185.199.111.153
```

**AAAA Records (IPv6 support)**
```
Type: AAAA
Host: @
Value: 2606:50c0:8000::153

Type: AAAA
Host: @
Value: 2606:50c0:8001::153

Type: AAAA
Host: @
Value: 2606:50c0:8002::153

Type: AAAA
Host: @
Value: 2606:50c0:8003::153
```

**CNAME Record (for www subdomain)**
```
Type: CNAME
Host: www
Value: RazonIn4K.github.io
```

### 5. SSL Certificate

- GitHub automatically provides SSL certificates for custom domains
- Certificate generation can take up to 24 hours
- Monitor the Pages settings for certificate status
- Once active, your site will be available at `https://yourdomain.com`

## 🔧 Troubleshooting

### Common Issues

**Site not loading after deployment**
- Check if deployment action completed successfully in Actions tab
- Verify all files are in the root directory of main branch
- Ensure index.html is in the root (not in a subfolder)

**Custom domain not working**
- Verify DNS records are correctly configured
- Check if CNAME file contains the correct domain
- Wait for DNS propagation (can take up to 48 hours)
- Use tools like DNS Checker to verify propagation

**SSL certificate not generated**
- Ensure domain is verified in GitHub Pages settings
- Check that DNS records point to GitHub's IPs
- Wait up to 24 hours for certificate generation
- Contact GitHub Support if issues persist

**Form not working**
- Verify Formspree form ID is correct
- Ensure form action URL is properly formatted
- Test form submission manually
- Check Formspree dashboard for submission logs

### Testing Your Deployment

1. **Functionality Test**
   - Test theme toggle
   - Verify smooth scrolling navigation
   - Submit contact form
   - Check all external links open in new tabs

2. **Performance Test**
   - Run Lighthouse audit (aim for 90+ scores)
   - Test on multiple devices and browsers
   - Verify Core Web Vitals metrics

3. **Accessibility Test**
   - Test keyboard navigation
   - Check with screen reader
   - Verify color contrast ratios
   - Validate HTML structure

## 📊 Analytics Setup

### Google Analytics 4

1. **Create GA4 Property**
   - Go to analytics.google.com
   - Create new property for your domain
   - Get measurement ID (starts with G-)

2. **Update Website**
   - Replace `GA_MEASUREMENT_ID` in index.html
   - Test tracking using GA4 real-time reports

3. **Configure Goals**
   - Set up conversions for form submissions
   - Track CTA button clicks
   - Monitor theme toggle usage

### Form Analytics

The website tracks these form events:
- `form_submit` - Successful form submissions
- `form_validation_error` - Form validation failures
- `cta_click` - Call-to-action button clicks

## 🔄 Ongoing Maintenance

### Content Updates
- Update project descriptions regularly
- Add new skills and technologies
- Refresh metrics and achievements
- Update contact information as needed

### Performance Monitoring
- Run monthly Lighthouse audits
- Monitor Core Web Vitals in Search Console
- Check for broken links and embeds
- Update dependencies and security headers

### SEO Optimization
- Submit sitemap to Google Search Console
- Monitor search rankings and traffic
- Update meta descriptions for better CTR
- Add new structured data as appropriate

## 📱 Mobile Testing

Test your website on various devices:
- iPhone (Safari and Chrome)
- Android (Chrome and Samsung Internet)
- iPad (Safari)
- Various screen sizes using browser dev tools

## 🆘 Getting Help

### Resources
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Formspree Documentation](https://help.formspree.io/)
- [Google Analytics Setup](https://support.google.com/analytics/answer/9304153)

### Support Channels
- GitHub Community Forum
- Formspree Support
- Google Analytics Help Center
- Web development communities (Stack Overflow, Reddit)

---

**Deployment completed successfully? Your professional portfolio is now live! 🎉**
# Troubleshooting Guide

## 📋 Table of Contents
1. [Common Issues](#common-issues)
2. [Development Issues](#development-issues)
3. [Deployment Issues](#deployment-issues)
4. [Performance Issues](#performance-issues)
5. [Browser Compatibility Issues](#browser-compatibility-issues)
6. [Cookie Consent Issues](#cookie-consent-issues)
7. [Chat System Issues](#chat-system-issues)
8. [Analytics Issues](#analytics-issues)

---

## 🚨 Common Issues

### **Cookie Consent Banner Not Showing**

**Symptoms:**
- Cookie banner doesn't appear on first visit
- Analytics not respecting consent choices

**Possible Causes:**
1. JavaScript errors preventing ConsentManager initialization
2. localStorage already has consent data
3. CSS styles not loading properly

**Solutions:**
```javascript
// Check browser console for errors
console.log('ConsentManager available:', typeof window.consentManager);

// Clear consent data for testing
localStorage.removeItem('cs-learning-consent');
location.reload();

// Check if CSS classes are applied
document.querySelector('.consent-banner');
```

**Prevention:**
- Always test in incognito mode for first-time user experience
- Monitor browser console for JavaScript errors
- Verify CSS files are loading correctly

---

### **Chat System Not Working**

**Symptoms:**
- Chat messages not sending
- Rate limit errors appearing immediately
- No response from AI service

**Possible Causes:**
1. API endpoint configuration issues
2. Rate limiting triggered
3. MongoDB connection problems
4. OpenRouter API key issues

**Solutions:**
```javascript
// Check chat system status
console.log('Enhanced Chat available:', typeof window.enhancedChat);

// Check rate limiting status
const stats = window.enhancedChat?.getStats();
console.log('Chat stats:', stats);

// Test API connectivity
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'test' })
})
.then(response => console.log('API Response:', response.status))
.catch(error => console.error('API Error:', error));
```

**Rate Limit Reset:**
- Wait 1 minute for rate limit window to reset
- Check localStorage for pending messages
- Contact admin if persistent issues occur

---

### **Animation Performance Issues**

**Symptoms:**
- Low FPS (below 30)
- Jerky animations
- Browser freezing during interactions

**Possible Causes:**
1. Hardware limitations
2. Too many animations running simultaneously
3. Memory leaks in animation loops
4. WebGL not supported

**Solutions:**
```javascript
// Check performance stats
const monitor = window.performanceMonitor;
console.log('Current FPS:', monitor?.getCurrentFPS());
console.log('Quality level:', monitor?.getCurrentQuality());

// Switch to lower animation preset
const animationController = window.advancedAnimationController;
animationController?.applyPreset('minimal');

// Check WebGL support
const canvas = document.createElement('canvas');
const webglSupported = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
console.log('WebGL supported:', webglSupported);
```

**Performance Optimization:**
1. Switch to "Minimal" animation preset
2. Close other browser tabs
3. Update graphics drivers
4. Use Chrome/Firefox for better WebGL support

---

## 🛠️ Development Issues

### **Build Process Failing**

**Symptoms:**
- `npm run build` fails with errors
- Minification errors in console
- Missing dependencies

**Common Solutions:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version (requires Node 16+)
node --version

# Run build with verbose output
node scripts/build-minify.js --verbose

# Check for syntax errors
npm run lint
```

**Troubleshooting Steps:**
1. Verify all dependencies are installed
2. Check for JavaScript syntax errors
3. Ensure proper file permissions
4. Review build script configuration

---

### **Local Development Server Issues**

**Symptoms:**
- `npm run dev` fails to start
- Port already in use errors
- Files not updating on changes

**Solutions:**
```bash
# Check if port 9000 is in use
lsof -i :9000

# Kill process using port 9000
kill -9 $(lsof -t -i:9000)

# Use alternative port
python3 dev-server.py 8080

# Check file permissions
ls -la dev-server.py
chmod +x dev-server.py
```

**Alternative Development Setup:**
```bash
# Use basic HTTP server
npm run dev-basic

# Or use Python directly
python3 -m http.server 8000
```

---

### **CSS Linting Errors**

**Symptoms:**
- `npm run lint` reports errors
- CSS not applying correctly
- Build warnings

**Common Fixes:**
```bash
# Auto-fix common issues
npm run lint-fix

# Check specific file
npx stylelint src/css/styles.css

# View detailed error information
npx stylelint src/css/styles.css --formatter verbose
```

**Common CSS Issues:**
- Missing vendor prefixes
- Invalid property values
- Duplicate selectors
- Unused CSS rules

---

## 🚀 Deployment Issues

### **Vercel Deployment Failing**

**Symptoms:**
- Build fails on Vercel
- Function timeout errors
- Environment variables not working

**Common Solutions:**
```bash
# Check Vercel configuration
cat vercel.json

# Test build locally
npm run build

# Check environment variables
vercel env ls

# View deployment logs
vercel logs [deployment-url]
```

**Environment Variable Setup:**
1. Add variables in Vercel dashboard
2. Verify variable names match `.env.example`
3. Check for special characters in values
4. Redeploy after adding variables

---

### **API Endpoint Errors**

**Symptoms:**
- 404 errors for `/api/*` endpoints
- Function execution timeouts
- CORS errors

**Debugging Steps:**
```javascript
// Test API endpoint locally
fetch('/api/analytics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ event: 'test' })
})
.then(response => {
  console.log('Status:', response.status);
  return response.json();
})
.then(data => console.log('Response:', data))
.catch(error => console.error('Error:', error));
```

**Common Fixes:**
1. Check `vercel.json` function configuration
2. Verify API file exists in `/api` directory
3. Check function timeout limits
4. Review error logs in Vercel dashboard

---

## ⚡ Performance Issues

### **Lighthouse Score Degradation**

**Symptoms:**
- Performance score below 90
- High Cumulative Layout Shift (CLS)
- Poor First Contentful Paint (FCP)

**Optimization Steps:**
```bash
# Run performance audit
npm run performance-audit

# Check specific metrics
lighthouse http://localhost:9000 --only-categories=performance --output=json
```

**Common Performance Fixes:**
1. **Images**: Optimize and lazy load images
2. **CSS**: Minimize and inline critical CSS
3. **JavaScript**: Remove unused code and minimize
4. **Fonts**: Use font-display: swap

---

### **Memory Leaks**

**Symptoms:**
- Browser memory usage increases over time
- Page becomes unresponsive
- Animation stuttering after extended use

**Detection and Fixes:**
```javascript
// Monitor memory usage
console.log(performance.memory);

// Check for event listener leaks
function checkEventListeners() {
  const elements = document.querySelectorAll('*');
  let count = 0;
  elements.forEach(el => {
    if (el._listeners) count++;
  });
  console.log('Elements with listeners:', count);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  // Remove event listeners
  // Clear intervals/timeouts
  // Dispose of WebGL contexts
});
```

---

## 🌐 Browser Compatibility Issues

### **Internet Explorer Support**

**Symptoms:**
- Animations not working in IE
- JavaScript errors in console
- Layout broken

**IE-Specific Solutions:**
```css
/* IE-specific styles */
@media screen and (-ms-high-contrast: active) {
  .starfield-icon { filter: none !important; }
  .cursor-trail-point { display: none; }
  .gradient-bg { background: #1a1a2e; }
}
```

**JavaScript Polyfills:**
```javascript
// Check for IE and apply fallbacks
if (navigator.userAgent.indexOf('MSIE') !== -1 ||
    navigator.userAgent.indexOf('Trident') !== -1) {
  // Disable advanced features
  window.ieMode = true;
  // Apply simplified styles
  document.body.classList.add('ie-mode');
}
```

---

### **Safari-Specific Issues**

**Symptoms:**
- WebGL not working properly
- CSS animations stuttering
- Touch events not responding

**Safari Solutions:**
```css
/* Safari-specific fixes */
@supports (-webkit-backdrop-filter: blur(10px)) {
  .glass-effect {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
}
```

```javascript
// Safari detection and fixes
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  // Apply Safari-specific optimizations
  document.body.classList.add('safari-browser');
}
```

---

## 🍪 Cookie Consent Issues

### **Consent Not Persisting**

**Symptoms:**
- Banner appears on every page load
- Analytics consent not being saved
- User preferences reset

**Debugging Steps:**
```javascript
// Check consent data
const consent = localStorage.getItem('cs-learning-consent');
console.log('Stored consent:', JSON.parse(consent));

// Verify consent manager
console.log('Consent manager instance:', window.consentManager);

// Test consent saving
window.consentManager.saveConsent({
  necessary: true,
  analytics: true,
  thirdParty: false
});
```

**Common Fixes:**
1. Check localStorage quota limits
2. Verify domain consistency
3. Clear browser cache and test again
4. Check for JavaScript errors preventing saves

---

### **Analytics Not Respecting Consent**

**Symptoms:**
- Analytics tracking when consent denied
- Third-party services loading without permission

**Solutions:**
```javascript
// Check analytics status
console.log('Analytics enabled:', window.analyticsEnabled);
console.log('Third-party enabled:', window.thirdPartyEnabled);

// Manually apply consent
if (window.consentManager) {
  window.consentManager.applyConsent();
}

// Verify tracker status
if (window.analyticsTracker) {
  console.log('Tracker status:', window.analyticsTracker.isEnabled());
}
```

---

## 💬 Chat System Issues

### **Rate Limiting Problems**

**Symptoms:**
- "Please wait before sending another message" appears immediately
- Rate limit counter not resetting
- Unable to send any messages

**Debugging:**
```javascript
// Check rate limit status
const chat = window.enhancedChat;
console.log('Rate limit status:', {
  requestCount: chat.requestCount,
  lastRequestTime: chat.lastRequestTime,
  windowTime: chat.rateLimitWindow
});

// Reset rate limit (development only)
chat.requestCount = 0;
chat.lastRequestTime = 0;
```

**Solutions:**
1. Wait for the rate limit window to reset (1 minute)
2. Check system clock accuracy
3. Clear localStorage chat data if corrupted
4. Contact admin for rate limit adjustment

---

### **MongoDB Connection Issues**

**Symptoms:**
- Chat messages not being logged
- Fallback to localStorage constantly
- API endpoint returning 500 errors

**Debugging Steps:**
```javascript
// Test MongoDB endpoint
fetch('/api/lightweight-storage', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'test',
    response: 'test response',
    sessionId: 'test-session'
  })
})
.then(response => console.log('MongoDB test:', response.status))
.catch(error => console.error('MongoDB error:', error));
```

**Common Fixes:**
1. Check environment variables are set correctly
2. Verify MongoDB Atlas connection string
3. Ensure database and collection names are correct
4. Check network connectivity to MongoDB Atlas

---

## 📊 Analytics Issues

### **Vercel Analytics Not Loading**

**Symptoms:**
- No analytics data in Vercel dashboard
- Console errors about analytics scripts
- `va.vercel-scripts.com` blocked

**Solutions:**
```javascript
// Check if analytics loaded
console.log('Vercel Analytics:', window.va);

// Check for script loading errors
window.addEventListener('error', (e) => {
  if (e.target.src && e.target.src.includes('vercel-scripts')) {
    console.error('Vercel Analytics failed to load:', e);
  }
});

// Manually verify analytics
if (window.va && typeof window.va.track === 'function') {
  window.va.track('test_event');
  console.log('Analytics test event sent');
}
```

**Common Fixes:**
1. Check if domain is configured in Vercel
2. Verify Content Security Policy allows Vercel scripts
3. Check for ad blockers blocking analytics
4. Ensure project is deployed with correct configuration

---

### **Speed Insights Not Working**

**Symptoms:**
- No Core Web Vitals data
- Speed Insights script errors
- Missing performance metrics

**Debugging:**
```javascript
// Check Speed Insights status
console.log('Speed Insights loaded:', !!window.vitals);

// Check Web Vitals manually
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## 🔧 Debugging Tools

### **Browser Console Commands**

```javascript
// Get system status
function getSystemStatus() {
  return {
    theme: document.documentElement.getAttribute('data-theme'),
    animationLevel: document.documentElement.getAttribute('data-animation-level'),
    consent: JSON.parse(localStorage.getItem('cs-learning-consent') || 'null'),
    performance: window.performanceMonitor?.getStats(),
    chat: window.enhancedChat?.getStats(),
    webgl: !!(document.createElement('canvas').getContext('webgl')),
    features: {
      localStorage: typeof Storage !== 'undefined',
      intersectionObserver: 'IntersectionObserver' in window,
      requestAnimationFrame: 'requestAnimationFrame' in window
    }
  };
}

// Run system diagnostics
console.log('System Status:', getSystemStatus());
```

### **Performance Monitoring**

```javascript
// Monitor FPS in real-time
function startFPSMonitor() {
  let frames = 0;
  let lastTime = performance.now();

  function countFrames() {
    frames++;
    const currentTime = performance.now();

    if (currentTime >= lastTime + 1000) {
      console.log(`FPS: ${Math.round(frames * 1000 / (currentTime - lastTime))}`);
      frames = 0;
      lastTime = currentTime;
    }

    requestAnimationFrame(countFrames);
  }

  countFrames();
}

// Start monitoring
startFPSMonitor();
```

---

## 📞 Getting Help

### **Before Reporting Issues**
1. Check browser console for errors
2. Try in incognito/private mode
3. Test in different browsers
4. Clear cache and localStorage
5. Check network connectivity

### **Information to Include**
- Browser version and OS
- Console error messages
- Steps to reproduce
- Expected vs actual behavior
- System status from debugging tools

### **Contact Methods**
- GitHub Issues: Create detailed issue report
- Documentation: Check existing docs first
- Community: Search for similar issues

---

*This troubleshooting guide covers the most common issues and their solutions. For persistent problems not covered here, please create a detailed issue report with system diagnostics.*
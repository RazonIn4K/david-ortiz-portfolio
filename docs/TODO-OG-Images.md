# TODO: Open Graph Image Generation

## Background

This portfolio is currently a **static HTML/CSS/JS site** with Vercel Serverless Functions, not a Next.js application. As such, automatic Open Graph (OG) image generation using `next/og` is not available.

## What is OG Image Generation?

Open Graph images are the preview images shown when sharing links on social media platforms (Twitter, Facebook, LinkedIn, etc.).

**Example**: When you share `https://cs-learning.me` on LinkedIn, a preview card with an image, title, and description appears.

## Current Implementation

### Static OG Image (Manual)

The site currently uses a static OG image defined in `index.html`:

```html
<!-- Open Graph meta tags -->
<meta property="og:image" content="https://cs-learning.me/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

**Limitations**:
- ❌ Same image for all pages/projects
- ❌ Manual creation required
- ❌ No dynamic text/data
- ❌ Requires design tools (Figma, Photoshop)

## Future Enhancement Options

### Option 1: Migrate to Next.js

**Pros**:
- Built-in `next/og` for dynamic OG images
- Edge runtime for fast generation
- TypeScript support
- SSR/SSG capabilities

**Cons**:
- Major refactor required
- Increased complexity
- Overkill for a portfolio site

**Implementation**:
```javascript
// app/api/og/route.jsx (Next.js App Router)
import { ImageResponse } from 'next/og';

export async function GET(request) {
  return new ImageResponse(
    (
      <div style={{ /* styles */ }}>
        <h1>David Ortiz</h1>
        <p>Cloud Support Engineer</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

### Option 2: Serverless Function with @vercel/og

**Pros**:
- No migration needed
- Keep current static architecture
- Dynamic OG images per route

**Cons**:
- Adds complexity
- Requires Edge Function (paid tier for high usage)

**Implementation**:
```javascript
// api/og.js (Vercel Serverless Function)
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'David Ortiz Portfolio';

  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        fontSize: 60,
        color: 'white',
        background: 'linear-gradient(to bottom right, #1e3a8a, #3b82f6)',
        width: '100%',
        height: '100%',
        padding: '50px 200px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

**Usage**:
```html
<meta property="og:image" content="https://cs-learning.me/api/og?title=About%20Me">
```

### Option 3: External Service (Bannerbear, Cloudinary)

**Pros**:
- No code changes
- Professional templates
- Simple API

**Cons**:
- Third-party dependency (violates L5 tool limit if counted)
- Ongoing cost
- Less control

### Option 4: Keep Static Images (Recommended for Now)

**Pros**:
- Simple
- No maintenance
- No external dependencies
- Already works

**Cons**:
- Manual updates
- Not dynamic

**Implementation**:
1. Create OG images in Figma/Canva
2. Export as 1200x630 PNG
3. Place in `/assets/og-image.png`
4. Reference in HTML meta tags

## Recommendation

**For this portfolio**: **Option 4 (Static)** is sufficient.

**Rationale**:
- Portfolio has few pages (home, projects, about)
- Content changes infrequently
- Static images are more performant (no generation overhead)
- Aligns with privacy-first approach (no extra services)

**If dynamic OG images become essential**: Use **Option 2 (Vercel Serverless)** to avoid full Next.js migration.

## Implementation Checklist (If Implementing Option 2)

- [ ] Install `@vercel/og`: `npm install @vercel/og`
- [ ] Create `/api/og.js` with ImageResponse
- [ ] Test locally: `npm run dev` and visit `/api/og`
- [ ] Update meta tags in HTML to use dynamic route
- [ ] Test on social media platforms (Twitter Card Validator, Facebook Debugger)
- [ ] Monitor Edge Function usage (Vercel dashboard)
- [ ] Document in README

## Resources

- [Vercel OG Image Generation](https://vercel.com/docs/functions/edge-functions/og-image-generation)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

**Status**: TODO / Future Enhancement
**Priority**: Low (static images sufficient for now)
**Complexity**: Medium (if implementing Option 2)

# TODO: Dynamic OG Images for Next.js Migration

## Current State

The portfolio currently uses a **static SVG** OG (Open Graph) image located at:
- `/assets/og-image.svg`

This static image is referenced in:
- `index.html` (line 41: `<meta property="og:image" content="/assets/og-image.png">`)
- `index.html` (line 56: `<meta name="twitter:image" content="/assets/og-image.png">`)

**Note:** The HTML references `.png` but we're serving `.svg`. For maximum compatibility:
1. Either update HTML to reference `.svg`
2. Or convert the SVG to PNG (1200×630px) using a build step

## Future Next.js Migration Plan

When migrating to Next.js, implement **dynamic OG image generation** using one of these approaches:

### Option 1: Next.js App Router + @vercel/og (Recommended)

```js
// app/api/og/route.tsx
import { ImageResponse } from '@vercel/og';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'David Ortiz';
  const metric = searchParams.get('metric') || '87% Performance';

  return new ImageResponse(
    (
      <div style={{
        background: '#0b1220',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '100px',
      }}>
        <h1 style={{ fontSize: 64, color: '#e7ecf3' }}>{title}</h1>
        <p style={{ fontSize: 36, color: '#a1a8b3' }}>Cloud Support Engineer</p>
        <p style={{ fontSize: 48, color: '#4F46E5' }}>{metric}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

### Option 2: Satori + Sharp (Build-time Generation)

For static generation at build time:

```bash
npm install satori sharp
```

```js
// scripts/generate-og-images.js
import satori from 'satori';
import sharp from 'sharp';
import fs from 'fs';

async function generateOGImage(title, metric) {
  const svg = await satori(
    // JSX template here
  );

  const png = await sharp(Buffer.from(svg))
    .png()
    .toFile(`public/og/${title}.png`);
}
```

### Option 3: Cloudinary or Imgix (External Service)

Use a third-party service for dynamic image generation:

```js
// lib/og-image.js
export function getOGImageUrl(params) {
  const base = 'https://res.cloudinary.com/YOUR_CLOUD/image/upload';
  const transformations = [
    'w_1200',
    'h_630',
    'c_fill',
    // Add text overlays
  ];

  return `${base}/${transformations.join(',')}/${params.template}.png`;
}
```

## Implementation Checklist for Next.js Migration

- [ ] Choose OG image generation approach (Option 1, 2, or 3)
- [ ] Install required dependencies (`@vercel/og` or `satori` + `sharp`)
- [ ] Create OG image API route or build script
- [ ] Design OG image templates for:
  - [ ] Homepage
  - [ ] Project pages (if individual projects get their own routes)
  - [ ] Blog posts (if adding blog functionality)
  - [ ] Custom 404/500 error pages
- [ ] Update `next.config.mjs` to handle OG images
- [ ] Add OG image metadata to each page:
  ```js
  export const metadata = {
    openGraph: {
      images: [{ url: '/api/og?title=Page+Title' }],
    },
  };
  ```
- [ ] Test OG images with:
  - [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Add fallback static image for when dynamic generation fails
- [ ] Document OG image URL patterns in project README

## Benefits of Dynamic OG Images

1. **Personalization:** Each page can have unique, relevant preview images
2. **SEO:** Better social media engagement leads to improved search rankings
3. **Branding:** Consistent, professional appearance across all shared links
4. **Analytics:** Track which content gets shared most
5. **A/B Testing:** Experiment with different preview designs

## Resources

- [Vercel OG Image Generation](https://vercel.com/docs/functions/edge-functions/og-image-generation)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Satori Documentation](https://github.com/vercel/satori)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

## Current Workaround (Static Site)

Until Next.js migration:
1. Use the static SVG at `/assets/og-image.svg`
2. Consider converting to PNG for better compatibility:
   ```bash
   # Using Inkscape (if installed)
   inkscape assets/og-image.svg --export-filename=assets/og-image.png --export-width=1200 --export-height=630

   # Or using ImageMagick
   convert -background none -resize 1200x630 assets/og-image.svg assets/og-image.png
   ```
3. Update meta tags to reference the PNG version

## Priority

**Priority:** Medium (P2)
**Estimated Effort:** 2-4 hours for basic implementation
**Blocking:** No - current static image is acceptable for MVP

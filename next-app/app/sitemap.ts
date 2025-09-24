import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://david-ortiz-portfolio-flax.vercel.app';
  const now = new Date();
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Future routes to add as pages/components land
    // { url: `${base}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // { url: `${base}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    // { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];
}

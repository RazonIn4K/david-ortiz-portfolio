import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'David Ortiz — Developer Portfolio',
    short_name: 'DO Portfolio',
    description: 'Modern, fast portfolio with Next.js App Router and Tailwind CSS',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0f1a',
    theme_color: '#0a0f1a',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }
    ],
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  typescript: {
    // Type errors fail the build. Previously `true`, which hid the CONTACT_PATH
    // ReferenceError fixed in this PR. `tsc --noEmit` is clean as of this change.
    ignoreBuildErrors: false,
  },
  // next/image optimization is ON (Vercel optimizes on demand). /portfolio's
  // large screenshots were previously shipped raw because of unoptimized: true.
  // SVGs in <Image> are auto-served unoptimized by Next, which is what we want.
  async rewrites() {
    return [
      // Clean URL for the static local-business demo hub in public/demo/.
      // Sub-pages (pedidos/servicios/citas) keep their .html paths, which the
      // hub's own nav already uses.
      {
        source: '/demo',
        destination: '/demo/index.html',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Baseline hardening. No CSP yet: the site uses inline styles
          // heavily (dtz tokens via style={}), so a strict CSP needs nonces
          // and its own change.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig

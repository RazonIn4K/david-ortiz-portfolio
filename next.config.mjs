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
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion']
  },
  async rewrites() {
    return [
      {
        source: '/projects/:slug',
        destination: '/projects/:slug/index.html'
      }
    ];
  }
};

export default nextConfig;

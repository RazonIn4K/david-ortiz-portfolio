/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  typescript: {
    // Type errors fail the build. Previously `true`, which hid the CONTACT_PATH
    // ReferenceError fixed in this PR. `tsc --noEmit` is clean as of this change.
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

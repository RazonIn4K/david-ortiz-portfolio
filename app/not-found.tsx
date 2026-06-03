import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060a14] px-4">
      <div className="glass rounded-2xl p-8 max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center">
          <span className="text-4xl font-bold gradient-text">404</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          Page not found
        </h1>

        <p className="text-white/60 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-[#2dd4bf] to-[#22d3ee] text-[#060a14] font-semibold rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:ring-offset-2 focus:ring-offset-[#060a14]"
          >
            Go home
          </Link>

          <Link
            href="/#focus"
            className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#060a14]"
          >
            View focus areas
          </Link>
        </div>

        <p className="mt-8 text-white/40 text-sm">
          Looking for something specific?{" "}
          <Link href="/#contact" className="text-[#2dd4bf] hover:underline">
            Get in touch
          </Link>
        </p>
      </div>
    </div>
  )
}

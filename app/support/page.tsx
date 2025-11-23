'use client';

import React from 'react';

export default function SupportPage() {
  // URLs for payment links
  const PHOTO_RESTORATION_URL = process.env.NEXT_PUBLIC_PHOTO_RESTORATION_PAYMENT_LINK || '#';
  const TIP_JAR_URL = process.env.NEXT_PUBLIC_TIP_JAR_PAYMENT_LINK || '#';

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-24 pb-20">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-[#13b9a5] font-bold tracking-wider uppercase mb-3 text-sm">
          SUPPORT THE WORK
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Fuel my learning journey
        </h1>
        <p className="text-lg text-white/60 leading-relaxed">
          Your support helps me create AI automation tutorials, maintain open-source repos, and keep learning resources free.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Buy Me a Coffee Card */}
        <div className="relative flex flex-col p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit border border-white/10">
             {/* Coffee Icon - Material Design 'local_cafe' */}
             <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#13b9a5">
                <path d="M160-120v-80h480v-200h160q33 0 56.5-23.5T880-480v-200q0-33-23.5-56.5T800-760H160q-33 0-56.5 23.5T80-680v400q0 33 23.5 56.5T160-200h-40v80h40Zm640-360h-80v-200h80v200Zm-640 0v-200h480v200H160Z"/>
             </svg>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">Buy me a coffee</h3>
          <p className="text-white/60 mb-8 flex-grow">
            Choose any amount – every bit helps!
          </p>

          <a
            href={TIP_JAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#13b9a5] text-[#0a1929] font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity text-center"
          >
            Send a tip
          </a>
        </div>

        {/* Photo Restoration Card */}
        <div className="relative flex flex-col p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit border border-white/10">
            {/* Sparkle Icon - Material Design 'auto_awesome' */}
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#13b9a5">
                <path d="m363-201-47-101-101-47 101-47 47-101 47 101 101 47-101 47-47 101Zm357-162-31-68-68-31 68-31 31-68 31 68 68 31-68 31-31 68Zm-150-213-47-101-101-47 101-47 47-101 47 101 101 47-101 47-47 101Z"/>
            </svg>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">Photo Restoration</h3>
          <p className="text-white/60 mb-8 flex-grow">
            AI-powered photo restoration – $7/image
          </p>

          <a
            href={PHOTO_RESTORATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#13b9a5] text-[#0a1929] font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity text-center"
          >
            Order restoration
          </a>
        </div>
      </div>

      {/* Social Proof */}
      <div className="mt-12 text-center">
        <p className="text-white/40 font-medium">
          🎯 Supporting 12+ students | ⚡ 50+ automation projects
        </p>
      </div>
    </div>
  );
}

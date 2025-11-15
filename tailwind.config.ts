import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        slate: '#1E293B',
        accent: '#4F46E5',
        teal: '#2DD4BF'
      },
      backgroundImage: {
        'grid-light': 'radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.2) 1px, transparent 0)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;

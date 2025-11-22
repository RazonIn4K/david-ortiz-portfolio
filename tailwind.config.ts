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
        ink: '#0a1929',
        slate: '#1E293B',
        accent: '#4F46E5',
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488'
        },
        cyan: {
<<<<<<< HEAD
          400: '#22d3ee'
=======
          400: '#22d3ee',
          300: '#67e8f9'
>>>>>>> origin/main
        },
        navy: {
          DEFAULT: '#0a1929',
          dark: '#061220'
        }
      },
      backgroundImage: {
        'grid-light': 'radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.2) 1px, transparent 0)',
<<<<<<< HEAD
        'gradient-teal': 'linear-gradient(to right, #2dd4bf, #22d3ee)'
=======
        'gradient-teal': 'linear-gradient(to right, #2dd4bf, #22d3ee)',
        'gradient-cyan': 'linear-gradient(to right, #67e8f9, #14b8a6)'
>>>>>>> origin/main
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;

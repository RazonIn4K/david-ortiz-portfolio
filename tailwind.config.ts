import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Existing colors
        ink: '#0a1929', // Restored
        slate: '#1E293B',

        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488'
        },
        cyan: {
          400: '#22d3ee',
          300: '#67e8f9'
        },
        navy: {
          DEFAULT: '#0a1929',
          dark: '#061220'
        },
        "navy-dark": '#061220' // Explicit definition for bg-navy-dark if not covered by navy-dark
      },
      backgroundImage: {
        'grid-light': 'radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.2) 1px, transparent 0)',
        'gradient-teal': 'linear-gradient(to right, #2dd4bf, #22d3ee)',
        'gradient-cyan': 'linear-gradient(to right, #67e8f9, #14b8a6)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;

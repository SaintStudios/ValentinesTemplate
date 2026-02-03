import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          espresso: '#4A3B32',
          'espresso-light': '#6B5A4D',
          'espresso-dark': '#2D231E',
          cream: '#F5F0E6',
          'cream-dark': '#E8E0D4',
          'cream-light': '#FAF8F4',
          mocha: '#8C7B70',
          'mocha-light': '#A99B91',
          'mocha-dark': '#6E6058',
          paper: '#FFFCF7',
          'paper-dark': '#F5F0E6',
          gold: '#C5A065',
          'gold-light': '#D4B87A',
          'gold-dark': '#A8864F',
        },
        gray: {
          50: '#FAF9F7',
          100: '#F5F3EF',
          200: '#E8E4DD',
          300: '#D4CFC5',
          400: '#A39B8E',
          500: '#8C7B70',
          600: '#6E6058',
          700: '#4A3B32',
          800: '#2D231E',
          900: '#1A1512',
        },
      },
      fontFamily: {
        serif: ['var(--font-instrument)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'h1': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'h2': ['2.25rem', { lineHeight: '1.2' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
        'h4': ['1.125rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '6px',
        'lg': '12px',
        'full': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(74, 59, 50, 0.05)',
        'medium': '0 8px 30px -4px rgba(74, 59, 50, 0.08)',
        'strong': '0 16px 40px -8px rgba(74, 59, 50, 0.1)',
        'card': '0 2px 8px rgba(74, 59, 50, 0.04)',
        'floating': '0 20px 50px -10px rgba(74, 59, 50, 0.12)',
        'glow': '0 0 20px rgba(197, 160, 101, 0.4)',
        'glow-lg': '0 0 30px rgba(197, 160, 101, 0.5)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
};

export default config;


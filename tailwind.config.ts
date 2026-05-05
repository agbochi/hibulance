import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#008751', dark: '#006B3C', light: '#1a9e63' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      keyframes: {
        blobOne: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':    { transform: 'translate(30px,-50px) scale(1.1)' },
          '66%':    { transform: 'translate(-20px,20px) scale(0.9)' },
        },
        blobTwo: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':    { transform: 'translate(-40px,30px) scale(0.9)' },
          '66%':    { transform: 'translate(20px,-30px) scale(1.1)' },
        },
        floatY: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(2.8)', opacity: '0' },
        },
        sirenGreen: {
          '0%,49%,100%': { backgroundColor: '#008751', boxShadow: '0 0 14px #008751' },
          '50%,99%':     { backgroundColor: 'rgba(0,135,81,0.1)', boxShadow: 'none' },
        },
        sirenBlue: {
          '0%,49%,100%': { backgroundColor: 'rgba(59,130,246,0.15)', boxShadow: 'none' },
          '50%,99%':     { backgroundColor: '#3b82f6', boxShadow: '0 0 14px #3b82f6' },
        },
        progressFill: {
          from: { width: '0%' },
          to:   { width: '65%' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scrollBounce: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(8px)' },
        },
        ambMove: {
          '0%':   { left: '18%', top: '72%' },
          '50%':  { left: '38%', top: '52%' },
          '100%': { left: '48%', top: '44%' },
        },
      },
      animation: {
        'blob-1':       'blobOne 10s ease-in-out infinite',
        'blob-2':       'blobTwo 13s ease-in-out infinite',
        'float':        'floatY 3.2s ease-in-out infinite',
        'pulse-ring':   'pulseRing 2s ease-out infinite',
        'siren-green':  'sirenGreen 1s ease-in-out infinite',
        'siren-blue':   'sirenBlue 1s ease-in-out infinite',
        'progress':     'progressFill 2s ease forwards',
        'slide-up':     'slideUp 0.55s ease forwards',
        'fade-in':      'fadeIn 0.4s ease forwards',
        'scroll-bounce':'scrollBounce 1.4s ease-in-out infinite',
        'amb-move':     'ambMove 4s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
export default config

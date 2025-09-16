/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: ['var(--font-fredoka)', 'Arial', 'Helvetica', 'sans-serif'],
        heading: ['var(--font-fredoka)', 'Arial', 'Helvetica', 'sans-serif'],
      },
      animation: {
        'border-path': 'border-path 2s linear infinite',
      },
      keyframes: {
        'border-path': {
          '0%': { 'stroke-dashoffset': '0' },
          '100%': { 'stroke-dashoffset': '-100' },
        },
      },
    },
  },
  plugins: [],
}

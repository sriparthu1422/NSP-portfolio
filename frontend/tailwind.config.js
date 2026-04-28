/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '375px',
      },
      colors: {
        primary: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
        accent: {
          orange: '#f97316',
          gradient: 'linear-gradient(to right, #f97316, #fb923c)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography using clamp()
        'hero': ['clamp(2.5rem, 6vw + 1rem, 4.5rem)', { lineHeight: '1.1', fontWeight: '900' }],
        'heading': ['clamp(1.5rem, 3vw + 0.5rem, 2rem)', { lineHeight: '1.3', fontWeight: '700' }],
        'subheading': ['clamp(1.125rem, 2vw + 0.25rem, 1.5rem)', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        neutral: {
          950: '#101216',
          900: '#15171D',
          850: '#1B1E26',
          800: '#232732',
          750: '#2C313E',
          700: '#383E4E',
        },
        finance: {
          dark: '#101216',
          card: '#15171D',
          border: '#232732',
          accent: '#E6E9F0',
          green: '#3EA876',
          red: '#E05263',
          amber: '#E09F3E'
        }
      }
    },
  },
  plugins: [],
}

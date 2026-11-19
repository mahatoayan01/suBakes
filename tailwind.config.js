/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        crust: {
          50: '#fdfbf7',
          100: '#f8f4eb',
          200: '#f0e7d5',
          300: '#e3d2b4',
          400: '#d2b68d',
          500: '#be9866',
          600: '#aa8150',
          700: '#8c6740',
          800: '#715437',
          900: '#5c4530',
        },
        charcoal: {
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        basil: {
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(194, 65, 12, 0.12)',
        'warm-lg': '0 10px 30px -4px rgba(194, 65, 12, 0.2)',
      }
    },
  },
  plugins: [],
}

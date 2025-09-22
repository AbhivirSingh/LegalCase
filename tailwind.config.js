/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8ff',
          100: '#e9f0ff',
          200: '#cfe0ff',
          300: '#a7c3ff',
          400: '#6f9dff',
          500: '#3a6cff',
          600: '#264df2',
          700: '#1e3bcb',
          800: '#1b34a3',
          900: '#192f82'
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '2rem',
          lg: '2rem',
          xl: '3rem',
          '2xl': '4rem',
        }
      },
      boxShadow: {
        'brand': '0 10px 30px -10px rgba(58, 108, 255, 0.35)'
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

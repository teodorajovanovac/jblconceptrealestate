import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'primary-white': 'var(--primary-white)',
        'primary-blue': 'var(--primary-blue)',
        'primary-gold': 'var(--primary-gold)',
        'secondary-blue': 'var(--secundary-blue)',
        'secondary-light-green': 'var(--secundary-light-green)',
        'secondary-dark-green': 'var(--secundary-dark-green)',
        'secondary-black': 'var(--secundary-black)',
        'menu-hover': 'var(--hover-color-1)',
        'menu-hover-dark': 'var(--hover-color-2)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
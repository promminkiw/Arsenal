/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      'primary': '#ec1313',
      'gold': '#D4AF37',
      'background-light': '#fcf8f8',
      'background-dark': '#1b0d0d',
      'white': '#ffffff',
      'black': '#000000',
      'transparent': 'transparent',
      'current': 'currentColor',
      'gray': {
        '400': '#9a4c4c',
      },
    },
    fontFamily: {
      'display': ['Lexend', 'sans-serif'],
    },
    borderRadius: {
      'DEFAULT': '0.25rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      'full': '9999px',
    },
  },
  plugins: [],
};

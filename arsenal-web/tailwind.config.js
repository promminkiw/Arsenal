/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ec1313',
        gold: '#D4AF37',
        'background-light': '#fcf8f8',
        'background-dark': '#1b0d0d',
        gray: {
          400: '#9a4c4c',
        },
      },
      fontFamily: {
        display: ['Lexend', 'sans-serif'],
      },
      borderRadius: {
        // เพิ่มของคุณโดยไม่ทับของเดิม
        lg: '0.5rem',
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
};

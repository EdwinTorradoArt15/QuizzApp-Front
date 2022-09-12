/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        14: '14px',
      },
      colors: {
        'bright-blue': '#3A53EE',
        'white': '#FFFFFF',
        'very-gray': '#00000080',
        'green-cyan': '#388659',
        'rosa-rojo': '#ba181b'
      },
    },
  },
  plugins: [],
}

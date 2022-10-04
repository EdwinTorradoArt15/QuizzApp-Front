/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        14: '14px',
      },
      dropShadow: {
        '3xl': '5px 5px 10px rgba(0, 0, 0, 0.25)'
      },
      colors: {
        'bright-blue': '#3A53EE',
        'white': '#FFFFFF',
        'very-gray': '#00000080',
        'lime-green': '#06D6A0',
        'rosa-rojo': '#ba181b',
        'light-yellow': '#FFD166'
      },
    },
  },
  plugins: [],
}

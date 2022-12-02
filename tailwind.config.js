const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'movilM': '360px',
        'movilN': '380px',
        'movilL': '425px',
        'tableta': '768px',
        'portatil': '1024px',
        'portatilL': '1440px',
        'monitor': '2560px'
      },
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
      minWidth: {
        44: '11rem',
      },
      maxWidth: {
        '9xl': '96rem',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/forms'),
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
}

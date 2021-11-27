const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter'],
    },
    extend: {
      colors: {
        background: '#151719',
        text: {
          primary: colors.white,
          secondary: '#9CA9B3',
        },
      },
      animation: {
        'reveal-from-bottom': 'reveal-from-bottom 0.3s ease-in',
        'reveal-from-bottom-delayed': 'reveal-from-bottom 0.35s ease-in',
      },
      keyframes: {
        'reveal-from-bottom': {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '50%': { opacity: '0.25' },
          '99%': {
            opacity: '0.75',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

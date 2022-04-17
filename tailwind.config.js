const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      sans: ['Poppins'],
    },
    extend: {
      colors: {
        background: '#151719',
        medici: {
          primary: colors.white,
          purple: {
            DEFAULT: '#6618E4',
          },
        },
      },
    },
  },
  plugins: [],
}

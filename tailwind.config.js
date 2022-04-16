const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter'],
    },
    extend: {
      colors: {
        background: '#151719',
        text: {
          primary: colors.white,
          secondary: '#6618E4',
        },
      },
    },
  },
  plugins: [],
}

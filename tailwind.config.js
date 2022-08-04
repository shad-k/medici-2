const colors = require('tailwindcss/colors');

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
            dark: '#952EE6',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

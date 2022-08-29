/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#F1C2C0',
        'secondary': '#6fdcbf',
        'typography-primary': '#4A4A4A',
        'typography-secondary':'#676767',
        'typography-tertiary': '#9B9B9B',
        'footer-gray': '#676767',
      },
      fontFamily: {
        Roboto: ['Roboto', "san-serif"],
       },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

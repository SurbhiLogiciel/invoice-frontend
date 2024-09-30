/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderColor: ['focus', 'hover'],
      ringColor: ['focus'],
      ringWidth: ['focus'],
    },
  },
  plugins: [],
};

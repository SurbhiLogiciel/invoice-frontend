/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,tsx}', './index.css'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        draft: 'rgb(var(--color-draft) / <alpha-value>)',
        purple: 'rgb(var(--color-purple) / <alpha-value>)'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
    plugins: [],
  },
};
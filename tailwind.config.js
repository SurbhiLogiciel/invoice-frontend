/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,tsx}', './index.css'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        gray: 'rgb(var(--color-gray) / <alpha-value>)',
        draft: 'rgb(var(--color-draft) / <alpha-value>)',
        purple: 'rgb(var(--color-purple) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        bgGreen: 'rgb(var(--color-bgGreen) / <alpha-value>)'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
    plugins: [],
  },
};
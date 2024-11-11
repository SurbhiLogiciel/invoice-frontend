/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,tsx}', './index.css'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        lightGray: 'rgb(var(--color-lightGray) / <alpha-value>)',
        gray: 'rgb(var(--color-gray) / <alpha-value>)',
        violet: 'rgb(var(--color-violet) / <alpha-value>)',
        lightPurple: 'rgb(var(--color-lightPurple) / <alpha-value>)',
        purple: 'rgb(var(--color-purple) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        green: 'rgb(var(--color-green) / <alpha-value>)',
        violet: 'rgb(var(--color-violet) / <alpha-value>)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus', 'hover'],
      ringColor: ['focus'],
      ringWidth: ['focus'],
    },
    plugins: [],
  },
};

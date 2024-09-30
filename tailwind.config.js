/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,tsx}",'./index.css'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
  },
  plugins: [],
}
}

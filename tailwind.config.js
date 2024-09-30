/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'input-border': 'var(--input-border-color)',
        'input-bg': 'var(--input-background-color)',
        'input-bg-hover': 'var(--input-background-color-hover)',
        'input-border-focus': 'var(--input-border-color-focus)',
        'input-text': 'var(--input-text-color)',
        'input-icon': 'var(--input-icon-color)',
        'input-label': 'var(--input-label-color)',
      },
    },
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

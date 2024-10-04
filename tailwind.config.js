/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        'input-sm': '65px',
        'input-md': '185px',
        'input-lg': '386px',
      },
      height: {
        'input-height': '50px',
      },
      colors: {
        'input-border': 'rgb(var(--input-border-color) / <alpha-value>)',
        'input-bg': 'rgb(var(--input-background-color) / <alpha-value>)',
        'input-bg-hover':
          'rgb(var(--input-background-color-hover) / <alpha-value>)',
        'input-border-focus':
          'rgb(var(--input-border-color-focus) / <alpha-value>)',
        'input-text': 'rgb(var(--input-text-color) / <alpha-value>)',
        'input-icon': 'rgb(var(--input-icon-color) / <alpha-value>)',
        'input-label': 'rgb(var(--input-label-color) / <alpha-value>)',
        'dropdown-bg': 'rgb(var(--dropdown-background-color) / <alpha-value>)',
        'dropdown-text': 'rgb(var(--dropdown-text-color) / <alpha-value>)',
        'dropdown-hover-bg':
          'rgb(var(--input-dropdown-hover-bg) / <alpha-value>)',
        'dropdown-hover-text':
          'rgb(var(--input-dropdown-hover-text) / <alpha-value>)',
      },
      fontSize: {
        'input-label-text': '14px',
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

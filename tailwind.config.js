/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        'input-otp-height': '50px',
      },
      width: {
        'input-otp-width': '50px',
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        gray: 'rgb(var(--color-gray) / <alpha-value>)',
        draft: 'rgb(var(--color-draft) / <alpha-value>)',
        purple: 'rgb(var(--color-purple) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        green: 'rgb(var(--color-green) / <alpha-value>)',

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

        'secondary-input-bg': 'rgb(var(--secondary-input-bg) / <alpha-value>)',
        'secondary-input-text':
          'rgb(var(--secondary-input-text) / <alpha-value>)',
        'secondary-input-border':
          'rgb(var(--secondary-input-border) / <alpha-value>)',
      },
      fontSize: {
        'input-label-text': ['14px', '24px'],
        'input-text': ['18px', '24px'],
        'input-dropdown-text': ['14px', '24px'],
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

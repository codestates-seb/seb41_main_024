/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#63A8DA',
        grey: '#475569',
        red: '#FF0000',
        white: '#FFFFFF',
      },
      screens: {
        'screen-maxw672': { raw: '(max-width: 672px)' },
        'screen-minw672': { raw: '(min-width: 672px)' },
        'screen-maxw530': { raw: '(max-width: 530px)' },
        'screen-maxw430': { raw: '(max-width: 430px)' },
      },
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
  },
  plugins: [],
};

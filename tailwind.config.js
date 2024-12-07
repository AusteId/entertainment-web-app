/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      dark: '#10141E',
      darkBlue: '#161D2F',
      lightBlue: '#5A698F',
      red: '#FC4747',
      white: '#FFFFFF',
    },
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        hl: '2rem',
        hm: '1.5rem',
        hs: '1.125rem',
        bm: '0.938rem',
        bs: '0.813',
      },
      fontWeight: {
        ligth: '300',
        medium: '400',
      },
    },
  },
  plugins: [],
};

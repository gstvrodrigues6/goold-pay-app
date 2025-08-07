/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./presentation/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat-Regular', 'sans-serif'],
      },
      colors: {
        primary: '#D9032C',
        'primary-dark': '#A3001F',
        
        secondary: '#FFFBFC',
        'secondary-dark': '#FFEEF2',

        border: '#D7D7D7',

        gray1: '#7D7D7D',
        gray2: '#767676',
        gray3: '#D5D5D5',
        gray4: '#D7D7D7',
        gray5: '#A0A0A0',
        
        green1: '#00CC5E',

        red1: '#EA0000',
        red2: '#FFE1E1'
      }
    },
  },
  plugins: [],
}

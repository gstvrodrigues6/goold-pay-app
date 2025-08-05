/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat-Regular', 'sans-serif'],
      },
      colors: {
        primary: '#FE790D',
        secondary: '#FFF0E9',
        border: '#D7D7D7',

        gray1: '#7D7D7D',
        gray2: '#191D1E',
        gray3: '#787486',
        gray4: '#FAF9F9',
        
        green1: '#00CC5E',

        red1: '#EA0000',
        red2: '#FFE1E1'
      }
    },
  },
  plugins: [],
}

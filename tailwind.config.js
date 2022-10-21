/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    backgroundImage: {
      'gradient-text': 'linear-gradient(to right, rgb(34 197 94), rgb(253 224 71), rgb(34 211 238), rgb(249 168 212))'
    }
  },
  plugins: []
}

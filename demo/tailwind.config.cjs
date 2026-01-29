const darkwind = require('../src/index.js').default

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [
    darkwind(),
  ],
}

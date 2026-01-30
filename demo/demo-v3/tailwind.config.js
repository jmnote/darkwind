const darkwind = require('../../src/index.js')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  darkMode: 'class',
  plugins: [
    darkwind({
      tailwindVersion: 3,
    }),
  ],
}

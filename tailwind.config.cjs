/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'wolverine': "url('./src/assets/wolverine.png')",
        'worldcup': "url('./src/assets/world-cup.png')"
      }
    },
  },
  plugins: [],
}

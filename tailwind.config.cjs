/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'anderson': ['Anderson Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,jsx,ts,tsx",
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS, JSX, TS, TSX files in the src folder
    './public/index.html', 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


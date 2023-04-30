/** @type {import('tailwindcss').Config} */
module.exports = {
  important: "#extension-root",
  content: ["./content-script/**/*.{js,ts,jsx,tsx}", "sty.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
       gradient:{
        "0%": { backgroundPosition: "0% 50%" },
"100%": { backgroundPosition: "100% 50%" },
       }
      },
      animation: {
       gradient : "gradient 6s linear infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
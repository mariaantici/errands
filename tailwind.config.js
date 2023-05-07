/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'pacifico': ['Pacifico', 'cursive'],
      },
      screens: {
        'xxs': '420px',
        'xs': '490px',
        'divider': '600px',
        'sm': '640px',
        'md': '951px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [require("rippleui")],
  rippleui: {
    themes: [
      {
        themeName: "light",
        colorScheme: "light",
        colors: {
          success: "#16a34a",
        },
      },
      {
        themeName: "dark",
        colorScheme: "dark",
        colors: {
          success: "#16a34a",
        },
      },
    ],
  },
}

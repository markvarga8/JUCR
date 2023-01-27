const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        jucr: {
          primary: "#0F212B",
          secondary: "#0acffe",
          accent: "#13184b",
          "gray-light": "#b2bac1",
          gray: "#8585a2",
          "gray-dark": "#333333",
          info: "#0acffe",
          success: "#51A351",
          warning: "#ffa835",
          error: "#ff4949",
        },
      },
    },
  },
  plugins: [],
};

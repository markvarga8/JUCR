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
          secondary: "#E84361",
          accent: "#13184b",
          "gray-light": "#b2bac1",
          gray: "#8585a2",
          "gray-dark": "#333333",
          success: "#51A351",
          warning: "#ffa835",
          error: "#ff4949",
        },
      },
      boxShadow: {
        menu: "inset 0px 5px 10px 0px #E84361",
        "menu-lg": "inset 0px 10px 20px 2px #E84361",
      },
    },
  },
  plugins: [],
};

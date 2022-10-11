const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ami-blue": "#4169e1",
      },
    },
    fontSize: {
      ...defaultTheme.fontSize,
      sm: "0.9rem",
      "4xl": "2.5rem",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

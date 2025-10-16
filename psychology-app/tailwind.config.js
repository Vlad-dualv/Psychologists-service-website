/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,css}"],
  theme: {
    extend: {
      colors: {
        "brand-grey": "rgba(138, 138, 137, 1)",
        "brand-white": "rgba(243, 243, 243, 1)",
        "brand-green": "#54BE96",
        "brand-green-hover": "#36A379",
        "brand-yellow": "#FFC531",
        "brand-purple": "#4535AF",
        "brand-orange": "#FBC75E",
      },
    },
  },
  plugins: [],
};

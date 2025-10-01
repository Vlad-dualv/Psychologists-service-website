/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        "brand-white": "#FBFBFB",
        "brand-green": "#54BE96",
        "brand-green-hover": "#36A379",
        "brand-yellow": "#FFC531",
        
      }
    },
  },
  plugins: [],
};

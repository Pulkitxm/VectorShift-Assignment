/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-color-1": "#bc7dff",
      },
      backgroundImage: {
        "gradient-radial": "linear-gradient(249deg, rgb(9, 133, 223) 0%, rgb(67, 11, 138) 83.1421%)",
      },
    },
  },
  plugins: [],
};

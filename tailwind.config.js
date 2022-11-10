/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      containers: {
        '3xs': '12rem',
        '2xs': '16rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
};

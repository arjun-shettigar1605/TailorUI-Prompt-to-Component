// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // <-- Update this line for JS/JSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

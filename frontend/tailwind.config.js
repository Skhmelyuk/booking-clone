
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        booking: {
          blue: "#003B95",
          light: "#006CE4",
          dark: "#002766",
          background: "#F5F5F5",
          text: "#262626",
        },
      },
    },
  },
  plugins: [],
};

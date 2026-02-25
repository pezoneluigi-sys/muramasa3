/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            sage: {
                50: "#f4f7f5",
                100: "#e9f0ea",
                200: "#d3e1d5",
                300: "#b5cbb7",
                400: "#9ebba1",
                500: "#86a889", // Sage Green base
                600: "#6b8a6e",
                700: "#5d7a60",
                800: "#4a614d",
                900: "#3d5240",
            },
            wood: {
                100: "#f0e6dd",
                200: "#e0d0c2",
                300: "#cbbba9",
                400: "#a98b73",
                500: "#8b5e3c",
                600: "#6f4b30",
                700: "#5d3f28",
                800: "#4a3b32", // Dark Wood
                900: "#2e241e",
            },
            cream: "#f9f7f2", // Off-white
            paper: "#ffffff",
        },
        fontFamily: {
            sans: ["Outfit", "sans-serif"],
            serif: ["Playfair Display", "serif"],
        },
        backgroundImage: {
            'wood-texture': "linear-gradient(rgba(46, 36, 30, 0.9), rgba(46, 36, 30, 0.9)), url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
            'washi-paper': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
        }
    },
  },
  plugins: [],
}
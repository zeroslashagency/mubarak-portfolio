/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        neutral: {
          50: "#fbfbf9", 100: "#f7f7f5", 150: "#eeeeeb", 200: "#e2e2e0", 250: "#c6c6c5",
          300: "#b9b9b7", 350: "#adadab", 400: "#a0a09e", 450: "#929290", 500: "#848482",
          550: "#777774", 600: "#696966", 650: "#5e5e5a", 700: "#50504c", 750: "#454541",
          800: "#353531", 850: "#272723", 900: "#1c1c17",
        },
        green: { 50: "#e8f2ed", 300: "#62aa89", 500: "#15804f", 700: "#0f5b38" },
      },
      borderRadius: { lg: "8px", md: "6px", sm: "4px", xl: "20px" },
      maxWidth: { page: "1136px" },
    },
  },
};

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Custom colors for dark mode
        dark: {
          900: "#111827", // Dark background
          800: "#1F2937", // Dark card background
          700: "#374151", // Dark borders
        },
      },
    },
  },
  plugins: [],
};
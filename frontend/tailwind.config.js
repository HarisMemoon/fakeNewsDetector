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
          'dark-900': '#0f172a',
          'dark-800': '#1e293b',
          'dark-700': '#334155',
          'dark-600': '#475569',
          'indigo-50': '#eef2ff',
        },
      },
    },
  },
  plugins: [],
};
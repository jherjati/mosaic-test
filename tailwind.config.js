module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/mosaic/src/**/*.{ts,tsx}",
  ],
  presets: [require("./node_modules/mosaic/tailwind.config.js")],
  theme: {
    extend: {},
  },
  plugins: [],
};

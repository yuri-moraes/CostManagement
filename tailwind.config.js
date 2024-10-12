/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,ts}",
    "./index.html", // Certifique-se de apontar corretamente para seus arquivos HTML
    "!./node_modules/**",  // Exclui o diretório node_modules
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 
  ["./src/containers/intro.js",
   "./src/App.js",
   "./src/containers/top-tab.js",
   "./src/ParentElement.jsx",
   "./src/containers/Modal.js",
   "src/alternatives/pagination.jsx",
   "src/alternatives/alternatives_table.jsx",
   "./src/**/*.{js,jsx,ts,tsx}",
   "./src/finalresult.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

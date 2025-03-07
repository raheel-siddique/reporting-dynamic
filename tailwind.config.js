/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths based on your project structure
     "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#e1e1e1',
        'custom-green': '#23AE24',
        'black': '#1E1E1E',
      },
      backgroundImage: {
        'custom-gradient-green': 'linear-gradient(180deg, #23AE24 0%, #179318 100%)',
        'custom-gradient-red': 'linear-gradient(180deg, #D82323 0%, #C11717 100%)',
      },
  
      
    },
  },
  plugins: [],
};

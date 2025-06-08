module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ai-blue': '#1A73E8',         // Google Blue exact
        'ai-gray-dark': '#202124',    // Dark background color
        'ai-gray-light': '#f1f3f4',   // Light gray backgrounds
        'ai-gray-medium': '#5f6368',  // Medium gray text
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

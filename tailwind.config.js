module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }
    },
  },
  variants: {
    extend: {},
  },
  content: ['./src/client/**/*.{js,jsx,ts,tsx}'],
};
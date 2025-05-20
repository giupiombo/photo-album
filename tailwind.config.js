/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pinkColor: '#ff69b4',
        lightBgPrimary: '#ffffff',
        lightBgSecondary: '#e9ecef',
        lightText: '#1e293b',
        darkBgPrimary: '#1e1e2e',
        darkBgSecondary: '#3f3f5e',
        darkText: '#ededed',
      },
    },
  },
  plugins: [],
};

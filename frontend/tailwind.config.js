/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#36393F',
        'secondary-bg': '#2F3136',
        'tertiary-bg': '#202225',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B9BBBE',
        'text-muted': '#72767D',
        'accent-blue': '#7289DA',
        'accent-green': '#43B581',
        'accent-red': '#F04747',
        'accent-yellow': '#FAA61A',
        'border-light': '#4F545C',
        'border-dark': '#202225',
        'input-border': '#3A3C42',
        'hover-bg': '#3C3F44',
        'active-bg': '#4A4D53',
        'selection-bg': '#5865F2',
        'modal-bg': '#36393F',
        'input-bg': '#2F3136',
        'overlay': '#000000A6',
      }
    },
    fontFamily:{
      fira:["fira code"]
    }
  },
  plugins: [],
}


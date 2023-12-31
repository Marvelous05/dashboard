/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation : {
        "spin-slow" : "spin 6s linear infinite",
        "spin-delay" : "spin 6s linear infinite -3s",
      },
    },
  },
  plugins: [],
}

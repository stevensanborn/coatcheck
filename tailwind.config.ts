import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B', // neon coral/red
          hover: '#FF4949',   // brighter neon red
        },
        secondary: {
          DEFAULT: '#4FFFB0', // neon mint/green
          light: '#00FF9D',   // brighter neon green
        },
        neutral: {
          DEFAULT: '#FFFFFF', // pure white
          dark: '#A6A6A6',   // light gray
          border: '#E6E6E6', // very light gray
        }
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;

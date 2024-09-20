/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "btn-blue": "#1D9BF0",
        "gray-hover": "#181818",
        "red-like": "#F91880",
        "red-like-hover": "#200914",
        "repost-green": "#00BA7C",
        "repost-hover": "#071A14",
        "blue-hover": "#0D2739",
        "blue-bookmark": "#1A8BD6",
        "second-gray": "#e7e9ea",
      },
    },
  },
  plugins: [],
};

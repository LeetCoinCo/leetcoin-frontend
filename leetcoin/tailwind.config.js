/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: process.env.NODE_ENV ? "jit" : undefined,
  //Purge ensures that pages and components are tree-shaked so that unused styles are not present in production builds.
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: "#1a0e07",
          900: "#24130a",
          800: "#32190b",
          700: "#4b2e1e",
          600: "#5f3f2e",
          500: "#725a41",
        },
        cream: {
          50: "#fdf9f3",
          100: "#faf6f0",
          200: "#f1ede7",
          300: "#e6e2dc",
          400: "#d4c3bc",
          500: "#bf957f",
        },
        butter: {
          300: "#fff8d6",
          400: "#fff3b0",
          500: "#f4cb84",
          600: "#e1aa53",
        },
        toast: {
          300: "#ffdcbd",
          400: "#eabda6",
          500: "#d9b99b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-sm": "0 0 12px rgba(255, 243, 176, 0.15)",
        "glow-md": "0 0 24px rgba(255, 243, 176, 0.2)",
        "glow-lg": "0 0 40px rgba(255, 243, 176, 0.25)",
        "card": "0 10px 25px -5px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(255, 255, 255, 0.15)",
        "card-hover": "0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 243, 176, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;

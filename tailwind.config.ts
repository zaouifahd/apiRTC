import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#F4EBDD",
        desert: "#C7782E",
        palm: "#0F6B4A",
        night: "#151313"
      },
      boxShadow: {
        glow: "0 20px 80px rgba(199, 120, 46, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
